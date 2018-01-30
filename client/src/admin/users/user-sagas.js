import { LOCATION_CHANGE } from 'react-router-redux';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from 'src/common/auth/index';
import { userActions } from './user-actions';
import { navActions } from '../../common/nav/nav-actions';
import { userList } from './user-list';
const userPath = 'admin/users';

//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    userList.token = payload.idToken;
    userList.path = userPath;
    yield take([authActions.SIGN_OUT_FULFILLED]);
    userList.token = null;
    userList.path = null;
  }
}

function* watchLocationChange() {
  while (true) {
    const { payload } = yield take(LOCATION_CHANGE);
    if (payload.pathname === navActions.modules.navToAdminUsers.url) {
      yield put(userActions.loadUsers());
    }
  }
}

function* loadAllUsers() {
  const users = yield call([userList, userList.list]);
  yield put(userActions.loadUsersFulfilled(users));
}

function* watchLoadUsers() {
  yield takeEvery(userActions.LOAD_USERS, loadAllUsers);
}

function* removeUser({ payload }) {
  let result = yield call([userList, userList.remove], payload.user.uid);
  yield put(userActions.removeUserFulfilled(result));
}

function* watchRemoveUser() {
  yield takeEvery(userActions.REMOVE_USER, removeUser);
}

function* updateUser({ payload }) {
  let result = yield call([userList, userList.update], payload.user.uid, {
    user: payload.user,
    changes: payload.changes
  });
  yield put(userActions.updateUserFulfilled(result.user));
}

function* watchUpdateUser() {
  yield takeEvery(userActions.UPDATE_USER, updateUser);
}

//=====================================
//  USER SAGAS
//-------------------------------------

export const userSagas = [
  fork(watchAuthentication),
  fork(watchLoadUsers),
  //fork(watchCreateUser),
  fork(watchLocationChange),
  fork(watchRemoveUser),
  fork(watchUpdateUser)
];