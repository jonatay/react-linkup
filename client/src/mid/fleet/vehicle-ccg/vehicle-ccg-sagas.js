import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from '../../common/auth/index';
import { vehicleCcgActions } from './vehicle-ccg-actions';
import { vehicleCcgList } from './vehicle-ccg-list';

function* loadAllVehicleCcgs() {
  const { vehicleCcgs } = yield call([vehicleCcgList, vehicleCcgList.list]);
  yield put(vehicleCcgActions.loadVehicleCcgsFulfilled(vehicleCcgs));
}

function* createVehicleCcg({ payload: { vehicleCcg } }) {
  let { vehicleCcg: newCcg } = yield call(
    [vehicleCcgList, vehicleCcgList.insert],
    vehicleCcg
  );
  yield put(vehicleCcgActions.createVehicleCcgFulfilled(newCcg));
}

function* updateVehicleCcg({ payload: { vehicleCcg, changes } }) {
  let result = yield call(
    [vehicleCcgList, vehicleCcgList.update],
    vehicleCcg.id,
    {
      vehicleCcg: vehicleCcg
    }
  );
  yield put(vehicleCcgActions.updateVehicleCcgFulfilled(result.vehicleCcg));
}

function* removeVehicleCcg({ payload: { vehicleCcg } }) {
  let { id } = yield call(
    [vehicleCcgList, vehicleCcgList.remove],
    vehicleCcg.id
  );
  yield put(vehicleCcgActions.removeVehicleCcgFulfilled(id));
}

function* updateVehicleCcgArray({ payload: { vehicleCcgs, changes } }) {
  console.log(vehicleCcgs, changes);
  // look for changes without id - add
  const addCcg = changes.filter(ccg => !ccg.id);
  // look for matching v.id = c.id where different - modify
  const modCcg = changes.filter(ccg => {
    const vCcg = vehicleCcgs.find(vc => vc.id === ccg.id);

    return !vCcg ? false : JSON.stringify(vCcg) !== JSON.stringify(ccg);
  });
  // look for v.id missing in c - delete
  const delCcg = vehicleCcgs.filter(
    vc => !changes.find(ccg => ccg.id === vc.id)
  );
  // console.log({ add: addCcg, mod: modCcg, del: delCcg });
  for (let ccg of addCcg) {
    yield put(vehicleCcgActions.createVehicleCcg(ccg));
  }
  for (let ccg of modCcg) {
    yield put(vehicleCcgActions.updateVehicleCcg(ccg));
  }
  for (let ccg of delCcg) {
    yield put(vehicleCcgActions.removeVehicleCcg(ccg));
  }
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
