import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from '../../common/auth/index';
import { userActions } from './user-actions';
import { userList } from './user-list';
import { LOCATION_CHANGE } from 'react-router-redux';

function* loadAllUsers() {
  const users = yield call([userList, userList.list]);
  yield put(userActions.loadUsersFulfilled(users));
}

function* removeUser({ payload }) {
  let result = yield call([userList, userList.remove], payload.user.uid);
  yield put(userActions.removeUserFulfilled(result));
}

function* updateUser({ payload }) {
  let result = yield call([userList, userList.update], payload.user.uid, {
    user: payload.user,
    changes: payload.changes
  });
  yield put(userActions.updateUserFulfilled(result.user));
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    userList.token = payload.idToken;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    userList.token = null;
  }
}

function* watchLocationChange() {
  while (true) {
    let { payload } = yield take(LOCATION_CHANGE);
    if (payload.pathname.indexOf('admin') === 1) {
      yield put(userActions.loadUsers());
    }
  }
}

function* watchIdTokenRefresh() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
    userList.token = payload.idToken;
  }
}

function* watchLoadUsers() {
  yield takeEvery(userActions.LOAD_USERS, loadAllUsers);
}

function* watchRemoveUser() {
  yield takeEvery(userActions.REMOVE_USER, removeUser);
}

function* watchUpdateUser() {
  yield takeEvery(userActions.UPDATE_USER, updateUser);
}

//=====================================
//  USER SAGAS
//-------------------------------------

export const userSagas = [
  fork(watchAuthentication),
  fork(watchLocationChange),
  fork(watchIdTokenRefresh),
  fork(watchLoadUsers),
  fork(watchRemoveUser),
  fork(watchUpdateUser)
];
