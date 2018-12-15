import { delay } from 'redux-saga';
import { call, fork, put, take, cancel, takeEvery } from 'redux-saga/effects';
import { firebaseAuth } from '../../firebase/index';
import history from 'src/mid/history';
import { authActions } from './auth-actions';

const tokenTimeout = 55 * 60 * 1000;

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

//infinite loop that asks for token refresh every x minutes
// get's by firebase token expiry without resorting to messageing
function* refreshToken(user) {
  while (user !== null) {
    yield put(authActions.refreshIdToken(user));
    yield delay(tokenTimeout);
    //yield put(authActions.signOut());
  }
}

function* signInWithEmailPassword({ payload: { email, password } }) {
  const authData = yield call(
    [firebaseAuth, firebaseAuth.signInAndRetrieveDataWithEmailAndPassword],
    email,
    password
  );
  let idToken = yield call([authData.user, authData.user.getIdToken]);
  const customClaim = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]));
  yield put(
    authActions.signInFulfilled(authData.user, idToken, customClaim.roles)
  );
  yield history.push('/home');
}

function* registerNewUser({ payload }) {
  try {
    const { user } = payload;
    const { email, password } = user;
    const authData = yield call(
      [
        firebaseAuth,
        firebaseAuth.createUserAndRetrieveDataWithEmailAndPassword
      ],
      email,
      password
    );
    //get curr user and set up rest of profile
    authData.user.updateProfile({
      displayName: user.fullname
    });
    yield put(authActions.registerNewUserFulfilled(authData.user));
    let idToken = yield call([authData.user, authData.user.getIdToken]);
    const customClaim = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]));
    yield put(
      authActions.signInFulfilled(authData.user, idToken, customClaim.roles)
    );
    yield history.push('/home');
  } catch (error) {
    yield put(authActions.registerNewUserFailed(error));
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

function* watchSignInWithEmailPassword() {
  yield takeEvery(
    authActions.SIGN_IN_WITH_EMAIL_PASSWORD,
    signInWithEmailPassword
  );
}

//starts (then cancels
function* watchSignInFulfilled() {
  while (true) {
    const { payload } = yield take(authActions.SIGN_IN_FULFILLED);
    //start token refresh loop
    const tokenRefresh = yield fork(refreshToken, payload.authUser);
    yield take(authActions.SIGN_OUT);
    yield cancel(tokenRefresh);
  }
}

function* watchSignOut() {
  while (true) {
    yield take(authActions.SIGN_OUT);
    yield fork(signOut);
  }
}

//
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

function* watchRegisterNewUser() {
  yield takeEvery(authActions.REGISTER_NEW_USER, registerNewUser);
}

//=====================================
//  AUTH SAGAS
//-------------------------------------

export const authSagas = [
  fork(watchSignIn),
  fork(watchSignOut),
  fork(watchSignInFulfilled),
  fork(watchRefreshIdToken),
  fork(watchRegisterNewUser),
  fork(watchSignInWithEmailPassword)
];
