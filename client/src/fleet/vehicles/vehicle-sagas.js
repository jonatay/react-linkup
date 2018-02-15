import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from 'src/common/auth/index';
import { vehicleActions } from './vehicle-actions';
import { vehicleList } from './vehicle-list';
const jsondiffpatch = require('jsondiffpatch').create();

// import * as jsondiffpatch from 'jsondiffpatch';
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
  const vehicles = yield call([vehicleList, vehicleList.list]);
  yield put(vehicleActions.loadVehiclesFulfilled(vehicles));
}

function* watchLoadVehicles() {
  yield takeEvery(vehicleActions.LOAD_VEHICLES, loadAllVehicles);
}

function* removeVehicle({ payload }) {
  let result = yield call(
    [vehicleList, vehicleList.remove],
    payload.vehicle.uid
  );
  yield put(vehicleActions.removeVehicleFulfilled(result));
}

function* watchRemoveVehicle() {
  yield takeEvery(vehicleActions.REMOVE_VEHICLE, removeVehicle);
}

function* updateVehicle({ payload }) {
  const changes = jsondiffpatch.diff(payload.vehicle, payload.changes);
  let result = yield call(
    [vehicleList, vehicleList.update],
    payload.vehicle.id,
    { changes }
  );
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
  fork(watchRemoveVehicle),
  fork(watchUpdateVehicle)
];
