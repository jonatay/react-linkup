import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from '../../common/auth/index';
import { fleetTransactionActions } from './fleet-transaction-actions';
import { fleetTransactionList } from './fleet-transaction-list';
// import { LOCATION_CHANGE } from 'react-router-redux';
// const jsondiffpatch = require('jsondiffpatch').createFromEmpDetailsParams();

function* loadAllFleetTransactions({ payload }) {
  const fleetTransactions = yield call(
    [fleetTransactionList, fleetTransactionList.list],
    payload.listParams
  );
  yield put(
    fleetTransactionActions.loadFleetTransactionsFulfilled(fleetTransactions)
  );
}

function* updateFleetTransaction({ payload }) {
  const changes = payload.changes; // jsondiffpatch.diff(payload.fleetTransaction, payload.changes);
  let result = yield call(
    [fleetTransactionList, fleetTransactionList.update],
    payload.fleetTransaction.id,
    { changes }
  );
  yield put(
    fleetTransactionActions.updateFleetTransactionFulfilled(
      result.fleetTransaction
    )
  );
}

function* toggleFleetTransactionIsActive({ payload }) {
  let result = yield call(
    [fleetTransactionList, fleetTransactionList.remove],
    payload.fleetTransaction.id
  );
  yield put(
    fleetTransactionActions.toggleFleetTransactionIsActiveFulfilled(
      result.fleetTransaction
    )
  );
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    fleetTransactionList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    fleetTransactionList.token = null;
  }
}
//
// function* watchLocationChange() {
//   while (true) {
//     let { payload } = yield take(LOCATION_CHANGE);
//     if (payload.pathname.indexOf('fleet/transactions') === 1) {
//       yield put(fleetTransactionActions.loadFleetTransactions());
//     }
//   }
// }

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    fleetTransactionList.token = payload.idToken;
  }
}

function* watchLoadFleetTransactions() {
  yield takeEvery(
    fleetTransactionActions.LOAD_FLEET_TRANSACTIONS,
    loadAllFleetTransactions
  );
}

function* watchToggleFleetTransactionIsActive() {
  yield takeEvery(
    fleetTransactionActions.TOGGLE_FLEET_TRANSACTION_IS_ACTIVE,
    toggleFleetTransactionIsActive
  );
}

function* watchUpdateFleetTransaction() {
  yield takeEvery(
    fleetTransactionActions.UPDATE_FLEET_TRANSACTION,
    updateFleetTransaction
  );
}

//=====================================
//  FLEET_TRANSACTION SAGAS
//-------------------------------------

export const fleetTransactionSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadFleetTransactions),
  // fork(watchLocationChange),
  fork(watchToggleFleetTransactionIsActive),
  fork(watchUpdateFleetTransaction)
];
