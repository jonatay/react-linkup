import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { sageAccountActions, sageAccountList } from './';
import { authActions } from '../../common/auth';

function* loadSageAccounts() {
  const { sageAccounts } = yield call([sageAccountList, sageAccountList.list]);
  yield put(sageAccountActions.loadSageAccountsFulfilled(sageAccounts));
}

function* importSageAccounts() {
  const { sageAccounts } = yield call([
    sageAccountList,
    sageAccountList.import
  ]);
  yield put(sageAccountActions.importSageAccountsFulfilled(sageAccounts));
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    sageAccountList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    sageAccountList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    sageAccountList.token = payload.idToken;
  }
}

function* watchLoadSageAccounts() {
  yield takeEvery(sageAccountActions.LOAD_SAGE_ACCOUNTS, loadSageAccounts);
}

function* watchImportSageAccounts() {
  yield takeEvery(sageAccountActions.IMPORT_SAGE_ACCOUNTS, importSageAccounts);
}

export const sageAccountSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadSageAccounts),
  fork(watchImportSageAccounts)
];
