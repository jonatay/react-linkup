import { LOCATION_CHANGE } from 'react-router-redux';
// import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';
import { authActions } from 'src/auth';
import { userActions } from './user-actions';
import { navActions } from './nav-actions';
import { userList } from './user-list';

// function subscribe() {
//   return eventChannel(emit => userList.subscribe(emit));
// }

// function* read() {
//   const channel = yield call(subscribe);
//   while (true) {
//     let action = yield take(channel);
//     yield put(action);
//   }
// }

function* write(context, method, onError, ...params) {
  try {
    yield call([context, method], ...params);
  } catch (error) {
    yield put(onError(error));
  }
}

const createUser = write.bind(
  null,
  userList,
  userList.push,
  userActions.createUserFailed
);
const removeUser = write.bind(
  null,
  userList,
  userList.remove,
  userActions.removeUserFailed
);
const updateUser = write.bind(
  null,
  userList,
  userList.update,
  userActions.updateUserFailed
);

//=====================================
//  WATCHERS
//-------------------------------------

// function* watchAuthentication() {
//   while (true) {
//     let { payload } = yield take(authActions.SIGN_IN_FULFILLED);
//     // userList.token = payload.authUser.getIdToken().i;
//     // let token = yield call([firebaseAuth, firebaseAuth.currentUser.getIdToken])
//     let token = yield call([payload.authUser, payload.authUser.getIdToken])
//     // console.log(token);
//     userList.token = token;
//     yield take([authActions.SIGN_OUT_FULFILLED]);
//     userList.token = null;
//   }
// }

function* watchCreateUser() {
  while (true) {
    let { payload } = yield take(userActions.CREATE_USER);
    yield fork(createUser, payload.user);
  }
}

function* watchLocationChange() {
  while (true) {
    const { payload } = yield take(LOCATION_CHANGE);
    if (payload.pathname === navActions.modules.navToAdminUsers.url) {
      // let users = yield call(userList.list, userList.path, userList.token);
      // yield put(userActions.loadUsersFulfilled(users));
      yield put(userActions.loadUsers());
    }
  }
}

function* watchLoadUsers() {
  while (true) {
    yield take(userActions.LOAD_USERS);
    console.log('asking for a token');
    //let token = yield put(authActions.GET_ID_TOKEN);
    // let payload = yield take(authActions.GET_ID_TOKEN_FULFILLED);
    // console.log('loading-users-saga');
  }
}

function* watchRemoveUser() {
  while (true) {
    let { payload } = yield take(userActions.REMOVE_USER);
    yield fork(removeUser, payload.user.key);
  }
}

function* watchUpdateUser() {
  while (true) {
    let { payload } = yield take(userActions.UPDATE_USER);
    yield fork(updateUser, payload.user.key, payload.changes);
  }
}

//=====================================
//  USER SAGAS
//-------------------------------------

export const userSagas = [
  // fork(watchAuthentication),
  fork(watchLoadUsers),
  fork(watchCreateUser),
  fork(watchLocationChange),
  fork(watchRemoveUser),
  fork(watchUpdateUser)
];
