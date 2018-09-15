import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from '../../common/auth/index';
import { vehicleActions } from './vehicle-actions';
import { vehicleCcgActions } from '../vehicle-ccg/index';
import { vehicleList } from './vehicle-list';
import { costCentreGroupActions } from '../settings/index';

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    vehicleList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    vehicleList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    vehicleList.token = payload.idToken;
  }
}

function* loadAllVehicles() {
  yield put(costCentreGroupActions.loadCostCentreGroups());
  yield put(vehicleCcgActions.loadVehicleCcgs());
  const { vehicles } = yield call([vehicleList, vehicleList.list]);
  yield put(vehicleActions.loadVehiclesFulfilled(vehicles));
}

function* watchLoadVehicles() {
  yield takeEvery(vehicleActions.LOAD_VEHICLES, loadAllVehicles);
}

function* toggleVehicleIsActive({ payload }) {
  let result = yield call(
    [vehicleList, vehicleList.remove],
    payload.vehicle.id
  );
  yield put(vehicleActions.toggleVehicleIsActiveFulfilled(result.vehicle));
}

function* watchToggleVehicleIsActive() {
  yield takeEvery(
    vehicleActions.TOGGLE_VEHICLE_IS_ACTIVE,
    toggleVehicleIsActive
  );
}

function* updateVehicle({
  payload: {
    vehicle: { vehicleCcgs: vCcgs, ...vehicle },
    changes: { vehicleCcgs: cCcgs, ...changes }
  }
}) {
  // console.log({ vCcgs, cCcgs });
  if (JSON.stringify(vCcgs) !== JSON.stringify(cCcgs)) {
    yield put(vehicleCcgActions.updateVehicleCcgArray(vCcgs, cCcgs));
  }
  let result = yield call([vehicleList, vehicleList.update], vehicle.id, {
    changes
  });
  yield put(vehicleActions.updateVehicleFulfilled(result.vehicle));
}

function* watchUpdateVehicle() {
  yield takeEvery(vehicleActions.UPDATE_VEHICLE, updateVehicle);
}

//=====================================
//  VEHICLE SAGAS
//-------------------------------------

export const vehicleSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadVehicles),
  //fork(watchCreateVehicle),
  fork(watchToggleVehicleIsActive),
  fork(watchUpdateVehicle)
];
