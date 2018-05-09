import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { costCentreActions, costCentreList } from './';
import { authActions } from '../../../common/auth';

function* loadAllCostCentres() {
  const costCentres = yield call([costCentreList, costCentreList.list]);
  yield put(costCentreActions.loadCostCentresFulfilled(costCentres));
}

function* updateCostCentre({ payload }) {
  let result = yield call([costCentreList, costCentreList.update], payload.id, {
    costCentre: payload.costCentre,
    changes: payload.changes
  });
  yield put(costCentreActions.updateCostCentreFulfilled(result.costCentre));
}

function* removeCostCentre({ payload }) {
  let result = yield call(
    [costCentreList, costCentreList.remove],
    payload.costCentre.uid
  );
  yield put(costCentreActions.removeCostCentreFulfilled(result));
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
  fork(watchRemoveCostCentre),
  fork(watchUpdateCostCentre)
];
