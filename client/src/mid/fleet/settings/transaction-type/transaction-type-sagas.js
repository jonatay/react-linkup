import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { transactionTypeActions, transactionTypeList } from './index';
import { authActions } from '../../../common/auth/index';

function* loadAllTransactionTypes() {
  const transactionTypes = yield call([
    transactionTypeList,
    transactionTypeList.list
  ]);
  yield put(
    transactionTypeActions.loadTransactionTypesFulfilled(transactionTypes)
  );
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    transactionTypeList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    transactionTypeList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    transactionTypeList.token = payload.idToken;
  }
}

function* watchLoadTransactionTypes() {
  yield takeEvery(
    transactionTypeActions.LOAD_TRANSACTION_TYPES,
    loadAllTransactionTypes
  );
}

export const transactionTypeSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadTransactionTypes)
];
