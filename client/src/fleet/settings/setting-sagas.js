import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from 'src/common/auth/index';
import { settingActions } from './setting-actions';
import { costCentreList } from './cost-centre-list';
import { costCentreGroupList } from './cost-centre-group-list';
import { transactionTypeList } from './transaction-type-list';

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    costCentreList.token = payload.idToken;
    costCentreGroupList.token = payload.idToken;
    transactionTypeList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    costCentreList.token = null;
    costCentreGroupList.token = payload.null;
    transactionTypeList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    costCentreList.token = payload.idToken;
    costCentreGroupList.token = payload.idToken;
    transactionTypeList.token = payload.idToken;
  }
}

function* loadAllCostCentres() {
  const costCentres = yield call([costCentreList, costCentreList.list]);
  yield put(settingActions.loadCostCentresFulfilled(costCentres));
}

function* watchLoadCostCentres() {
  yield takeEvery(settingActions.LOAD_COST_CENTRES, loadAllCostCentres);
}

function* removeCostCentre({ payload }) {
  let result = yield call(
    [costCentreList, costCentreList.remove],
    payload.costCentre.uid
  );
  yield put(settingActions.removeCostCentreFulfilled(result));
}

function* watchRemoveCostCentre() {
  yield takeEvery(settingActions.REMOVE_COST_CENTRE, removeCostCentre);
}

function* updateCostCentre({ payload }) {
  let result = yield call(
    [costCentreList, costCentreList.update],
    payload.costCentre.uid,
    {
      costCentre: payload.costCentre,
      changes: payload.changes
    }
  );
  yield put(settingActions.updateCostCentreFulfilled(result.costCentre));
}

function* watchUpdateCostCentre() {
  yield takeEvery(settingActions.UPDATE_COST_CENTRE, updateCostCentre);
}

function* loadAllCostCentreGroups() {
  const costCentreGroups = yield call([
    costCentreGroupList,
    costCentreGroupList.list
  ]);
  yield put(settingActions.loadCostCentreGroupsFulfilled(costCentreGroups));
}

function* watchLoadCostCentreGroups() {
  yield takeEvery(
    settingActions.LOAD_COST_CENTRE_GROUPS,
    loadAllCostCentreGroups
  );
}

function* loadAllTransactionTypes() {
  const transactionTypes = yield call([
    transactionTypeList,
    transactionTypeList.list
  ]);
  yield put(settingActions.loadTransactionTypesFulfilled(transactionTypes));
}

function* watchLoadTransactionTypes() {
  yield takeEvery(
    settingActions.LOAD_TRANSACTION_TYPES,
    loadAllTransactionTypes
  );
}

//=====================================
//  COST_CENTRE SAGAS
//-------------------------------------

export const settingSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadCostCentres),
  //fork(watchCreateCostCentre),
  fork(watchRemoveCostCentre),
  fork(watchUpdateCostCentre),
  fork(watchLoadCostCentreGroups),
  fork(watchLoadTransactionTypes)
];
