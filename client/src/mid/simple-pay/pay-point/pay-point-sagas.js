import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { payPointActions } from './pay-point-actions';
import { payPointList } from './pay-point-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllPayPoints() {
  const { payPoints } = yield call([payPointList, payPointList.list]);
  yield put(payPointActions.loadPayPointsFulfilled(payPoints));
}
function* createPayPoint({ payload: { payPoint } }) {
  let result = yield call([payPointList, payPointList.insert], {
    payPoint
  });
  yield put(payPointActions.createPayPointFulfilled(result.payPoint));
}

function* updatePayPoint({ payload: { id, changes } }) {
  let result = yield call([payPointList, payPointList.update], id, { changes });
  yield put(payPointActions.updatePayPointFulfilled(result.payPoint));
}

function* removePayPoint({ payload: { payPoint } }) {
  let result = yield call([payPointList, payPointList.remove], payPoint.id);
  if (result.status === 'deleted') {
    yield put(payPointActions.removePayPointFulfilled(payPoint));
  } else {
    yield put(payPointActions.removePayPointFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    payPointList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    payPointList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    payPointList.token = payload.idToken;
  }
}

function* watchLoadPayPoints() {
  yield takeEvery(payPointActions.LOAD_PAY_POINTS, loadAllPayPoints);
}

function* watchCreatePayPoint() {
  yield takeEvery(payPointActions.CREATE_PAY_POINT, createPayPoint);
}

function* watchUpdatePayPoint() {
  yield takeEvery(payPointActions.UPDATE_PAY_POINT, updatePayPoint);
}

function* watchRemovePayPoint() {
  yield takeEvery(payPointActions.REMOVE_PAY_POINT, removePayPoint);
}

export const payPointSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadPayPoints),
  fork(watchUpdatePayPoint),
  fork(watchCreatePayPoint),
  fork(watchRemovePayPoint)
];
