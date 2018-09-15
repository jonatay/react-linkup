import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { sageBankActions, sageBankList } from './index';
import { authActions } from '../../common/auth/index';

function* loadSageBanks() {
  const { sageBanks } = yield call([sageBankList, sageBankList.list]);
  yield put(sageBankActions.loadSageBanksFulfilled(sageBanks));
}

function* importSageBanks() {
  const { sageBanks } = yield call([sageBankList, sageBankList.import]);
  yield put(sageBankActions.importSageBanksFulfilled(sageBanks));
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    sageBankList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    sageBankList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    sageBankList.token = payload.idToken;
  }
}

function* watchLoadSageBanks() {
  yield takeEvery(sageBankActions.LOAD_SAGE_BANKS, loadSageBanks);
}

function* watchImportSageBanks() {
  yield takeEvery(sageBankActions.IMPORT_SAGE_BANKS, importSageBanks);
}

export const sageBankSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadSageBanks),
  fork(watchImportSageBanks)
];
