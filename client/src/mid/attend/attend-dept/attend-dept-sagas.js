import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { attendDeptActions } from './attend-dept-actions';
import { attendDeptList } from './attend-dept-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllAttendDepts() {
  const attendDepts = yield call([attendDeptList, attendDeptList.list]);
  yield put(attendDeptActions.loadAttendDeptsFulfilled(attendDepts));
}
function* createAttendDept({ payload: { attendDept } }) {
  let result = yield call([attendDeptList, attendDeptList.insert], {
    attendDept
  });
  yield put(attendDeptActions.createAttendDeptFulfilled(result.attendDept));
}

function* updateAttendDept({ payload: { id, changes } }) {
  let result = yield call([attendDeptList, attendDeptList.update], id, {
    changes
  });
  yield put(attendDeptActions.updateAttendDeptFulfilled(result.attendDept));
}

function* removeAttendDept({ payload: { attendDept } }) {
  let result = yield call(
    [attendDeptList, attendDeptList.remove],
    attendDept.id
  );
  if (result.status === 'deleted') {
    yield put(attendDeptActions.removeAttendDeptFulfilled(attendDept));
  } else {
    yield put(attendDeptActions.removeAttendDeptFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    attendDeptList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    attendDeptList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    attendDeptList.token = payload.idToken;
  }
}

function* watchLoadAttendDepts() {
  yield takeEvery(attendDeptActions.LOAD_ATTEND_DEPTS, loadAllAttendDepts);
}

function* watchCreateAttendDept() {
  yield takeEvery(attendDeptActions.CREATE_ATTEND_DEPT, createAttendDept);
}

function* watchUpdateAttendDept() {
  yield takeEvery(attendDeptActions.UPDATE_ATTEND_DEPT, updateAttendDept);
}

function* watchRemoveAttendDept() {
  yield takeEvery(attendDeptActions.REMOVE_ATTEND_DEPT, removeAttendDept);
}

export const attendDeptSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadAttendDepts),
  fork(watchUpdateAttendDept),
  fork(watchCreateAttendDept),
  fork(watchRemoveAttendDept)
];
