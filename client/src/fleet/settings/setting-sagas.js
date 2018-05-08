import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from 'src/common/auth/index';
import { settingActions } from './setting-actions';
import { costCentreList } from './cost-centre-list';
import { costCentreGroupList } from './cost-centre-group-list';
import { transactionTypeList } from './transaction-type-list';
import { fimsPeriodList } from './fims-period-list';

function* importFimsPeriod({ payload }) {
  //console.log(payload);
  const fimsPeriod = yield call(
    [fimsPeriodList, fimsPeriodList.importFimsPeriod],
    payload.id
  );
  yield put(settingActions.importFimsPeriodFulfilled(fimsPeriod));
}

function* removeFimsPeriod({ payload }) {
  const id = yield call([fimsPeriodList, fimsPeriodList.remove], payload.id);
  yield put(settingActions.removeFimsPeriodFulfilled(id));
}

function* loadFimsPeriods() {
  const fimsPeriods = yield call([fimsPeriodList, fimsPeriodList.list]);
  yield put(settingActions.loadFimsPeriodsFulfilled(fimsPeriods));
}

function* postFimsBatch({ payload }) {
  const { fimsBatch } = payload;
  const postFimsBatchResult = yield call(
    [fimsPeriodList, fimsPeriodList.postFimsBatch],
    { fimsBatch }
  );
  yield put(settingActions.postFimsBatchFulfilled(postFimsBatchResult));
}

function* removeCostCentre({ payload }) {
  let result = yield call(
    [costCentreList, costCentreList.remove],
    payload.costCentre.uid
  );
  yield put(settingActions.removeCostCentreFulfilled(result));
}

function* updateCostCentre({ payload }) {
  let result = yield call(
    [costCentreList, costCentreList.update],
    payload.costCentre.id,
    {
      costCentre: payload.costCentre,
      changes: payload.changes
    }
  );
  yield put(settingActions.updateCostCentreFulfilled(result.costCentre));
}

function* loadAllCostCentreGroups() {
  const costCentreGroups = yield call([
    costCentreGroupList,
    costCentreGroupList.list
  ]);
  yield put(settingActions.loadCostCentreGroupsFulfilled(costCentreGroups));
}

function* loadAllTransactionTypes() {
  const transactionTypes = yield call([
    transactionTypeList,
    transactionTypeList.list
  ]);
  yield put(settingActions.loadTransactionTypesFulfilled(transactionTypes));
}

function* updateCostCentreGroup({ payload }) {
  let result = yield call(
    [costCentreGroupList, costCentreGroupList.update],
    payload.costCentreGroup.id,
    { costCentreGroup: payload.costCentreGroup, changes: payload.changes }
  );
  yield put(
    settingActions.updateCostCentreGroupFulfilled(result.costCentreGroup)
  );
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    costCentreList.token = payload.idToken;
    costCentreGroupList.token = payload.idToken;
    transactionTypeList.token = payload.idToken;
    fimsPeriodList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    costCentreList.token = null;
    costCentreGroupList.token = payload.null;
    transactionTypeList.token = null;
    fimsPeriodList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    costCentreList.token = payload.idToken;
    costCentreGroupList.token = payload.idToken;
    transactionTypeList.token = payload.idToken;
    fimsPeriodList.token = payload.idToken;
  }
}

function* loadAllCostCentres() {
  const costCentres = yield call([costCentreList, costCentreList.list]);
  yield put(settingActions.loadCostCentresFulfilled(costCentres));
}

function* watchLoadCostCentres() {
  yield takeEvery(settingActions.LOAD_COST_CENTRES, loadAllCostCentres);
}

function* watchRemoveCostCentre() {
  yield takeEvery(settingActions.REMOVE_COST_CENTRE, removeCostCentre);
}

function* watchUpdateCostCentre() {
  yield takeEvery(settingActions.UPDATE_COST_CENTRE, updateCostCentre);
}

function* watchUpdateCostCentreGroup() {
  yield takeEvery(
    settingActions.UPDATE_COST_CENTRE_GROUP,
    updateCostCentreGroup
  );
}

function* watchLoadCostCentreGroups() {
  yield takeEvery(
    settingActions.LOAD_COST_CENTRE_GROUPS,
    loadAllCostCentreGroups
  );
}

function* watchLoadTransactionTypes() {
  yield takeEvery(
    settingActions.LOAD_TRANSACTION_TYPES,
    loadAllTransactionTypes
  );
}

function* watchFimsLoadPeriods() {
  yield takeEvery(settingActions.LOAD_FIRMS_PERIODS, loadFimsPeriods);
}

function* watchPostFimsBatch() {
  yield takeEvery(settingActions.POST_FIMS_BATCH, postFimsBatch);
}

function* watchRemoveFimsPeriod() {
  yield takeEvery(settingActions.REMOVE_FIRMS_PERIOD, removeFimsPeriod);
}

function* watchImportFimsPeriod() {
  yield takeEvery(settingActions.IMPORT_FIRMS_PERIOD, importFimsPeriod);
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
  fork(watchLoadTransactionTypes),
  fork(watchFimsLoadPeriods),
  fork(watchPostFimsBatch),
  fork(watchRemoveFimsPeriod),
  fork(watchImportFimsPeriod),
  fork(watchUpdateCostCentreGroup)
];
