import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { transactionTypeCostCentreList, tranTypeCcActions } from './';
import { authActions } from '../../../common/auth';

function* loadAllTransactionTypeCostCentres() {
  const transactionTypeCostCentres = yield call([
    transactionTypeCostCentreList,
    transactionTypeCostCentreList.list
  ]);
  yield put(
    tranTypeCcActions.loadTransactionTypeCostCentresFulfilled(transactionTypeCostCentres)
  );
}
function* createTransactionTypeCostCentre({ payload: { transactionTypeCostCentre } }) {
  let result = yield call([transactionTypeCostCentreList, transactionTypeCostCentreList.insert], {
    transactionTypeCostCentre
  });
  yield put(
    tranTypeCcActions.createTransactionTypeCostCentreFulfilled(
      result.transactionTypeCostCentre
    )
  );
}

function* updateTransactionTypeCostCentre({ payload: { id, changes } }) {
  let result = yield call(
    [transactionTypeCostCentreList, transactionTypeCostCentreList.update],
    id,
    { changes }
  );
  yield put(
    tranTypeCcActions.updateTransactionTypeCostCentreFulfilled(
      result.transactionTypeCostCentre
    )
  );
}

function* removeTransactionTypeCostCentre({ payload: { transactionTypeCostCentre } }) {
  let result = yield call(
    [transactionTypeCostCentreList, transactionTypeCostCentreList.remove],
    transactionTypeCostCentre.id
  );
  if (result.status === 'deleted') {
    yield put(
      tranTypeCcActions.removeTransactionTypeCostCentreFulfilled(transactionTypeCostCentre)
    );
  } else {
    yield put(tranTypeCcActions.removeTransactionTypeCostCentreFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    transactionTypeCostCentreList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    transactionTypeCostCentreList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    transactionTypeCostCentreList.token = payload.idToken;
  }
}

function* watchLoadTransactionTypeCostCentres() {
  yield takeEvery(
    tranTypeCcActions.LOAD_TRANSACTION_TYPE_COST_CENTRES,
    loadAllTransactionTypeCostCentres
  );
}

function* watchCreateTransactionTypeCostCentre() {
  yield takeEvery(
    tranTypeCcActions.CREATE_TRANSACTION_TYPE_COST_CENTRE,
    createTransactionTypeCostCentre
  );
}

function* watchUpdateTransactionTypeCostCentre() {
  yield takeEvery(
    tranTypeCcActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE,
    updateTransactionTypeCostCentre
  );
}

function* watchRemoveTransactionTypeCostCentre() {
  yield takeEvery(
    tranTypeCcActions.REMOVE_TRANSACTION_TYPE_COST_CENTRE,
    removeTransactionTypeCostCentre
  );
}

export const transactionTypeCostCentreSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadTransactionTypeCostCentres),
  fork(watchUpdateTransactionTypeCostCentre),
  fork(watchCreateTransactionTypeCostCentre),
  fork(watchRemoveTransactionTypeCostCentre)
];
