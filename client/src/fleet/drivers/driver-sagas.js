import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from 'src/common/auth/index';
import { driverActions } from './driver-actions';
import { driverList } from './driver-list';

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    driverList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    driverList.token = null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    driverList.token = payload.idToken;
  }
}

function* loadAllDrivers() {
  const drivers = yield call([driverList, driverList.list]);
  yield put(driverActions.loadDriversFulfilled(drivers));
}

function* watchLoadDrivers() {
  yield takeEvery(driverActions.LOAD_DRIVERS, loadAllDrivers);
}

function* removeDriver({ payload }) {
  let result = yield call([driverList, driverList.remove], payload.driver.uid);
  yield put(driverActions.removeDriverFulfilled(result));
}

function* watchRemoveDriver() {
  yield takeEvery(driverActions.REMOVE_DRIVER, removeDriver);
}

function* updateDriver({ payload }) {
  let result = yield call([driverList, driverList.update], payload.driver.uid, {
    driver: payload.driver,
    changes: payload.changes
  });
  yield put(driverActions.updateDriverFulfilled(result.driver));
}

function* watchUpdateDriver() {
  yield takeEvery(driverActions.UPDATE_DRIVER, updateDriver);
}

//=====================================
//  DRIVER SAGAS
//-------------------------------------

export const driverSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadDrivers),
  //fork(watchCreateDriver),
  fork(watchRemoveDriver),
  fork(watchUpdateDriver)
];
