import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { sageBBranchActions, sageBBranchList } from './index';
import { authActions } from '../../common/auth/index';

function* loadSageBBranches() {
  const { sageBBranches } = yield call([sageBBranchList, sageBBranchList.list]);
  yield put(sageBBranchActions.loadSageBBranchesFulfilled(sageBBranches));
}

function* importSageBBranches() {
  const { sageBBranches } = yield call([sageBBranchList, sageBBranchList.import]);
  yield put(sageBBranchActions.importSageBBranchesFulfilled(sageBBranches));
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    sageBBranchList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    sageBBranchList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    sageBBranchList.token = payload.idToken;
  }
}

function* watchLoadSageBBranches() {
  yield takeEvery(sageBBranchActions.LOAD_SAGE_BBRANCHES, loadSageBBranches);
}

function* watchImportSageBBranches() {
  yield takeEvery(sageBBranchActions.IMPORT_SAGE_BBRANCHES, importSageBBranches);
}

export const sageBBranchSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadSageBBranches),
  fork(watchImportSageBBranches)
];
