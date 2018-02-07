import { delay } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';
import { firebaseAuth } from '../../firebase/index';
import history from '../../history';
import { authActions } from './auth-actions';

const tokenTimeout = 30 * 60 * 1000;

const b64DecodeUnicode = str => {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
};

function* signIn(authProvider) {
  try {
    const authData = yield call(
      [firebaseAuth, firebaseAuth.signInWithPopup],
      authProvider
    );
    let idToken = yield call([authData.user, authData.user.getIdToken]);
    const customClaim = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]));
    yield put(
      authActions.signInFulfilled(authData.user, idToken, customClaim.roles)
    );
    yield history.push('/');
  } catch (error) {
    yield put(authActions.signInFailed(error));
  }
}

function* signOut() {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put(authActions.signOutFulfilled());
    yield history.replace('/sign-in');
  } catch (error) {
    yield put(authActions.signOutFailed(error));
  }
}

function* refreshToken(user) {
  while (true) {
    yield put(authActions.refreshIdToken(user));
    yield delay(tokenTimeout);
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchSignIn() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN);
    yield fork(signIn, payload.authProvider);
  }
}

function* watchSignInFulfilled() {
  while (true) {
    const { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    yield fork(refreshToken, payload.authUser);
  }
}

function* watchSignOut() {
  while (true) {
    yield take(authActions.SIGN_OUT);
    yield fork(signOut);
  }
}

function* watchRefreshIdToken() {
  while (true) {
    const { payload } = yield take(authActions.REFRESH_ID_TOKEN);
    let idToken = yield call(
      [payload.authUser, payload.authUser.getIdToken],
      true
    );
    yield put(authActions.refreshIdTokenFulfilled(idToken));
  }
}

//=====================================
//  AUTH SAGAS
//-------------------------------------

export const authSagas = [
  fork(watchSignIn),
  fork(watchSignOut),
  fork(watchSignInFulfilled),
  fork(watchRefreshIdToken)
];
