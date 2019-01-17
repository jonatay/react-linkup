import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { empDetailActions } from './emp-detail-actions';
import { empDetailList } from './emp-detail-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllEmpDetails() {
  const { empDetails } = yield call([empDetailList, empDetailList.list]);
  yield put(empDetailActions.loadEmpDetailsFulfilled(empDetails));
}
function* createEmpDetail({ payload: { empDetail } }) {
  let result = yield call([empDetailList, empDetailList.insert], {
    empDetail
  });
  yield put(empDetailActions.createEmpDetailFulfilled(result.empDetail));
}

function* updateEmpDetail({ payload: { id, changes } }) {
  let result = yield call([empDetailList, empDetailList.update], id, {
    changes
  });
  yield put(empDetailActions.updateEmpDetailFulfilled(result.empDetail));
}

function* removeEmpDetail({ payload: { empDetail } }) {
  let result = yield call([empDetailList, empDetailList.remove], empDetail.id);
  if (result.status === 'deleted') {
    yield put(empDetailActions.removeEmpDetailFulfilled(empDetail));
  } else {
    yield put(empDetailActions.removeEmpDetailFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    empDetailList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    empDetailList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    empDetailList.token = payload.idToken;
  }
}

function* watchLoadEmpDetails() {
  yield takeEvery(empDetailActions.LOAD_EMP_DETAILS, loadAllEmpDetails);
}

function* watchCreateEmpDetail() {
  yield takeEvery(empDetailActions.CREATE_EMP_DETAIL, createEmpDetail);
}

function* watchUpdateEmpDetail() {
  yield takeEvery(empDetailActions.UPDATE_EMP_DETAIL, updateEmpDetail);
}

function* watchRemoveEmpDetail() {
  yield takeEvery(empDetailActions.REMOVE_EMP_DETAIL, removeEmpDetail);
}

export const empDetailSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadEmpDetails),
  fork(watchUpdateEmpDetail),
  fork(watchCreateEmpDetail),
  fork(watchRemoveEmpDetail)
];
