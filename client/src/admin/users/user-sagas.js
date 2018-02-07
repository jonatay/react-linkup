import { call, fork, put, take, takeEvery, select } from 'redux-saga/effects';
import { authActions } from 'src/common/auth/index';
import { userActions } from './user-actions';
import { userList } from './user-list';
import { getIdToken } from '../../common/auth';

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

function* loadAllUsers() {
  const idToken = yield select(getIdToken);
  console.log(idToken);
  userList.token = idToken;
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
  fork(watchRemoveUser),
  fork(watchUpdateUser)
];
