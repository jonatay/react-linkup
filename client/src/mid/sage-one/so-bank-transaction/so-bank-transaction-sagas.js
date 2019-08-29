import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { soBankTransactionActions } from './so-bank-transaction-actions'
import { soBankTransactionList } from './so-bank-transaction-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllSoBankTransactions() {
  const soBankTransactions = yield call([
    soBankTransactionList,
    soBankTransactionList.list
  ]);
  yield put(
    soBankTransactionActions.loadSoBankTransactionsFulfilled(soBankTransactions)
  );
}
function* createSoBankTransaction({ payload: { soBankTransaction } }) {
  let result = yield call([soBankTransactionList, soBankTransactionList.insert], {
    soBankTransaction
  });
  yield put(
    soBankTransactionActions.createSoBankTransactionFulfilled(
      result.soBankTransaction
    )
  );
}

function* updateSoBankTransaction({ payload: { id, changes } }) {
  let result = yield call(
    [soBankTransactionList, soBankTransactionList.update],
    id,
    { changes }
  );
  yield put(
    soBankTransactionActions.updateSoBankTransactionFulfilled(
      result.soBankTransaction
    )
  );
}

function* removeSoBankTransaction({ payload: { soBankTransaction } }) {
  let result = yield call(
    [soBankTransactionList, soBankTransactionList.remove],
    soBankTransaction.id
  );
  if (result.status === 'deleted') {
    yield put(
      soBankTransactionActions.removeSoBankTransactionFulfilled(soBankTransaction)
    );
  } else {
    yield put(soBankTransactionActions.removeSoBankTransactionFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    soBankTransactionList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    soBankTransactionList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    soBankTransactionList.token = payload.idToken;
  }
}

function* watchLoadSoBankTransactions() {
  yield takeEvery(
    soBankTransactionActions.LOAD_SO_BANK_TRANSACTIONS,
    loadAllSoBankTransactions
  );
}

function* watchCreateSoBankTransaction() {
  yield takeEvery(
    soBankTransactionActions.CREATE_SO_BANK_TRANSACTION,
    createSoBankTransaction
  );
}

function* watchUpdateSoBankTransaction() {
  yield takeEvery(
    soBankTransactionActions.UPDATE_SO_BANK_TRANSACTION,
    updateSoBankTransaction
  );
}

function* watchRemoveSoBankTransaction() {
  yield takeEvery(
    soBankTransactionActions.REMOVE_SO_BANK_TRANSACTION,
    removeSoBankTransaction
  );
}

export const soBankTransactionSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadSoBankTransactions),
  fork(watchUpdateSoBankTransaction),
  fork(watchCreateSoBankTransaction),
  fork(watchRemoveSoBankTransaction)
];
