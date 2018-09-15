import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { costCentreActions, costCentreList } from './index';
import {
  tranTypeCcActions,
  transactionTypeActions,
  costCentreGroupActions
} from '../index';
import { authActions } from '../../../common/auth/index';

function* loadAllCostCentres() {
  yield put(transactionTypeActions.loadTransactionTypes());
  yield put(costCentreGroupActions.loadCostCentreGroups());
  yield put(tranTypeCcActions.loadTranTypeCcs());
  const costCentres = yield call([costCentreList, costCentreList.list]);
  yield put(costCentreActions.loadCostCentresFulfilled(costCentres));
}

function* createCostCentre({
  payload: { costCentre: { transactionTypes, ...costCentre } }
}) {
  let { costCentre: newCostCentre } = yield call(
    [costCentreList, costCentreList.insert],
    { costCentre }
  );
  let ttcc = transactionTypes.map(tt => ({
    ...tt,
    id: null,
    cost_centre_id: newCostCentre.id
  }));
  yield put(tranTypeCcActions.updateTranTypeCcBatch([], ttcc));
  yield put(costCentreActions.createCostCentreFulfilled(newCostCentre));
}

function* updateCostCentre({
  payload: {
    costCentre: { transactionTypes: tt, ...costCentre },
    changes: { transactionTypes: ctt, ...changes }
  }
}) {
  // console.log(tt, ctt);
  if (JSON.stringify(tt) !== JSON.stringify(ctt)) {
    yield put(tranTypeCcActions.updateTranTypeCcBatch(tt, ctt));
  }
  if (JSON.stringify(costCentre) !== JSON.stringify(changes)) {
    let result = yield call(
      [costCentreList, costCentreList.update],
      costCentre.id,
      {
        costCentre,
        changes
      }
    );
    yield put(costCentreActions.updateCostCentreFulfilled(result.costCentre));
  }
}

function* removeCostCentre({ payload: { id } }) {
  let result = yield call([costCentreList, costCentreList.remove], id);
  yield put(costCentreActions.removeCostCentreFulfilled(result.id));
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    costCentreList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    costCentreList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    costCentreList.token = payload.idToken;
  }
}

function* watchLoadCostCentres() {
  yield takeEvery(costCentreActions.LOAD_COST_CENTRES, loadAllCostCentres);
}

function* watchCreateCostCentre() {
  yield takeEvery(costCentreActions.CREATE_COST_CENTRE, createCostCentre);
}

function* watchUpdateCostCentre() {
  yield takeEvery(costCentreActions.UPDATE_COST_CENTRE, updateCostCentre);
}

function* watchRemoveCostCentre() {
  yield takeEvery(costCentreActions.REMOVE_COST_CENTRE, removeCostCentre);
}

export const costCentreSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadCostCentres),
  fork(watchCreateCostCentre),
  fork(watchRemoveCostCentre),
  fork(watchUpdateCostCentre)
];
