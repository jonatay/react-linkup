import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { attendUserActions } from './attend-user-actions';
// import { attendDeptActions } from '../attend-dept';
import { attendUserList } from './attend-user-list';
import { authActions } from 'src/mid/common/auth';

function* loadAllAttendUsers() {
  const attendUsers = yield call([attendUserList, attendUserList.list]);
  yield put(attendUserActions.loadAttendUsersFulfilled(attendUsers));
}
function* createAttendUser({ payload: { attendUser } }) {
  let result = yield call([attendUserList, attendUserList.insert], {
    attendUser
  });
  yield put(attendUserActions.createAttendUserFulfilled(result.attendUser));
}

function* updateAttendUser({ payload: { id, changes } }) {
  let result = yield call([attendUserList, attendUserList.update], id, {
    changes
  });
  yield put(attendUserActions.updateAttendUserFulfilled(result.attendUser));
}

function* removeAttendUser({ payload: { attendUser } }) {
  let result = yield call(
    [attendUserList, attendUserList.remove],
    attendUser.id
  );
  if (result.status === 'deleted') {
    yield put(attendUserActions.removeAttendUserFulfilled(attendUser));
  } else {
    yield put(attendUserActions.removeAttendUserFailed(result));
  }
}
//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    attendUserList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    attendUserList.token = payload.null;
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    attendUserList.token = payload.idToken;
  }
}

function* watchLoadAttendUsers() {
  yield takeEvery(attendUserActions.LOAD_ATTEND_USERS, loadAllAttendUsers);
}

function* watchCreateAttendUser() {
  yield takeEvery(attendUserActions.CREATE_ATTEND_USER, createAttendUser);
}

function* watchUpdateAttendUser() {
  yield takeEvery(attendUserActions.UPDATE_ATTEND_USER, updateAttendUser);
}

function* watchRemoveAttendUser() {
  yield takeEvery(attendUserActions.REMOVE_ATTEND_USER, removeAttendUser);
}

export const attendUserSagas = [
  fork(watchAuthentication),
  fork(watchIdTokenRefresh),
  fork(watchLoadAttendUsers),
  fork(watchUpdateAttendUser),
  fork(watchCreateAttendUser),
  fork(watchRemoveAttendUser)
];
