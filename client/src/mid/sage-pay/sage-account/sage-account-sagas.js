import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { sageAccountActions, sageAccountList } from './index';
import { authActions } from '../../common/auth/index';
import { sageBankActions, sageBBranchActions } from '../.';

function* loadSageAccounts() {
  yield put(sageBankActions.loadSageBanks());
  yield put(sageBBranchActions.loadSageBBranches());
  const { sageAccounts } = yield call([sageAccountList, sageAccountList.list]);
  yield put(sageAccountActions.loadSageAccountsFulfilled(sageAccounts));
}

function* loadSageEmpAccounts() {
  yield put(sageBankActions.loadSageBanks());
  yield put(sageBBranchActions.loadSageBBranches());
  const { sageAccounts } = yield call([
    sageAccountList,
    sageAccountList.listEmp
  ]);
  yield put(sageAccountActions.loadSageAccountsFulfilled(sageAccounts));
}

function* importBestAccounts({ payload: { bestCreditors } }) {
  const { sageAccounts } = yield call(
    [sageAccountList, sageAccountList.importBest],
    { bestCreditors }
  );
  yield put(sageAccountActions.importBestAccountsFulfilled(sageAccounts));
}

function* importCubitAccounts() {
  const { sageAccounts } = yield call([
    sageAccountList,
    sageAccountList.importCubit
  ]);
  yield put(sageAccountActions.importCubitAccountsFulfilled(sageAccounts));
}

function* validateSageAccount({ payload: { id } }) {
  const { sageAccount, validationResult } = yield call(
    [sageAccountList, sageAccountList.validateSageAccount],
    id
  );
  yield put(
    sageAccountActions.validateSageAccountFulfilled(
      sageAccount,
      validationResult
    )
  );
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

function* watchLoadSageEmpAccounts() {
  yield takeEvery(
    sageAccountActions.LOAD_SAGE_EMP_ACCOUNTS,
    loadSageEmpAccounts
  );
}

function* watchImportBestAccounts() {
  yield takeEvery(sageAccountActions.IMPORT_BEST_ACCOUNTS, importBestAccounts);
}

function* watchImportCubitAccounts() {
  yield takeEvery(
    sageAccountActions.IMPORT_CUBIT_ACCOUNTS,
    importCubitAccounts
  );
}

function* watchValidateSageAccount() {
  yield takeEvery(
    sageAccountActions.VALIDATE_SAGE_ACCOUNT,
    validateSageAccount
  );
}

export const sageAccountSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadSageAccounts),
  fork(watchLoadSageEmpAccounts),
  fork(watchImportBestAccounts),
  fork(watchImportCubitAccounts),
  fork(watchValidateSageAccount)
];
