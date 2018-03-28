import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from 'src/common/auth/index';
import { vehicleCcgActions } from './vehicle-ccg-actions';
import { vehicleCcgList } from './vehicle-ccg-list';

function* loadAllVehicleCcgs() {
  const { vehicleCcgs } = yield call([vehicleCcgList, vehicleCcgList.list]);
  yield put(vehicleCcgActions.loadVehicleCcgsFulfilled(vehicleCcgs));
}

function* createVehicleCcg({ payload: { vehicleCcg: values } }) {
  let { vehicleCcg } = yield call(
    [vehicleCcgList, vehicleCcgList.create],
    values
  );
  yield put(vehicleCcgActions.createVehicleCcgFulfilled(vehicleCcg));
}

function* updateVehicleCcg({ payload: { vehicleCcg, changes } }) {
  let result = yield call(
    [vehicleCcgList, vehicleCcgList.update],
    vehicleCcg.id,
    {
      vehicleCcg: vehicleCcg,
      changes: changes
    }
  );
  yield put(vehicleCcgActions.updateVehicleCcgFulfilled(result.vehicleCcg));
}

function* removeVehicleCcg({ payload }) {
  let result = yield call(
    [vehicleCcgList, vehicleCcgList.remove],
    payload.vehicleCcg.uid
  );
  yield put(vehicleCcgActions.removeVehicleCcgFulfilled(result));
}

function* updateVehicleCcgArray({ payload: { vehicleCcgs, changes } }) {
  console.log(vehicleCcgs, changes);
  // look for changes without id - add
  const addCcg = changes.filter(ccg => !ccg.id);
  // look for matching v.id = c.id where different - modify
  console.log(addCcg);
  const modCcg = changes.filter(ccg => {
    const vCcg = vehicleCcgs.find(vc => vc.id === ccg.id);
    return !vCcg ? false : JSON.stringify(vCcg) === JSON.stringify(ccg);
  });
  console.log(modCcg);
  // look for v.id missing in c - delete

}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    vehicleCcgList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    vehicleCcgList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    vehicleCcgList.token = payload.idToken;
  }
}

function* watchCreateVehicleCcg() {
  yield takeEvery(vehicleCcgActions.CREATE_VEHICLE_CCG, createVehicleCcg);
}

function* watchLoadVehicleCcgs() {
  yield takeEvery(vehicleCcgActions.LOAD_VEHICLE_CCGS, loadAllVehicleCcgs);
}

function* watchUpdateVehicleCcg() {
  yield takeEvery(vehicleCcgActions.UPDATE_VEHICLE_CCG, updateVehicleCcg);
}

function* watchRemoveVehicleCcg() {
  yield takeEvery(vehicleCcgActions.REMOVE_VEHICLE_CCG, removeVehicleCcg);
}

function* watchUpdateVehicleCcgBatch() {
  yield takeEvery(
    vehicleCcgActions.UPDATE_VEHICLE_CCG_ARRAY,
    updateVehicleCcgArray
  );
}

//=====================================
//  VEHICLE_CCG SAGAS
//-------------------------------------

export const vehicleCcgSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadVehicleCcgs),
  fork(watchCreateVehicleCcg),
  fork(watchRemoveVehicleCcg),
  fork(watchUpdateVehicleCcg),
  fork(watchUpdateVehicleCcgBatch)
];
