import firebase from 'firebase/app';

export const authActions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',
  SIGN_IN_FULFILLED: 'SIGN_IN_FULFILLED',

  REGISTER_NEW_USER: 'REGISTER_NEW_USER',
  REGISTER_NEW_USER_FULFILLED: 'REGISTER_NEW_USER_FULFILLED',
  REGISTER_NEW_USER_FAILED: 'REGISTER_NEW_USER_FAILED',

  SIGN_IN_WITH_EMAIL_PASSWORD: 'SIGN_IN_WITH_EMAIL_PASSWORD',

  AUTH_ACL_GET: 'AUTH_ACL_GET',
  AUTH_ACL_GET_FULFILLED: 'AUTH_ACL_GET_FULFILLED',
  AUTH_ACL_GET_FAILED: 'AUTH_ACL_GET_FAILED',

  SIGN_OUT: 'SIGN_OUT',
  SIGN_OUT_FAILED: 'SIGN_OUT_FAILED',
  SIGN_OUT_FULFILLED: 'SIGN_OUT_FULFILLED',

  REFRESH_ID_TOKEN: 'REFRESH_ID_TOKEN',
  REFRESH_ID_TOKEN_FULFILLED: 'REFRESH_ID_TOKEN_FULFILLED',
  REFRESH_ID_TOKEN_FAILED: 'REFRESH_ID_TOKEN_FAILED',

  refreshIdToken: authUser => ({
    type: authActions.REFRESH_ID_TOKEN,
    payload: { authUser }
  }),

  refreshIdTokenFail: error => ({
    type: authActions.REFRESH_ID_TOKEN_FAILED,
    payload: { error }
  }),

  refreshIdTokenFulfilled: idToken => ({
    type: authActions.REFRESH_ID_TOKEN_FULFILLED,
    payload: { idToken }
  }),

  signIn: authProvider => ({
    type: authActions.SIGN_IN,
    payload: { authProvider }
  }),

  signInWithEmailPassword: (email, password) => ({
    type: authActions.SIGN_IN_WITH_EMAIL_PASSWORD,
    payload: { email, password }
  }),

  registerNewUser: user => ({
    type: authActions.REGISTER_NEW_USER,
    payload: { user }
  }),
  registerNewUserFulfilled: user => ({
    type: authActions.REGISTER_NEW_USER_FULFILLED,
    payload: { user }
  }),
  registerNewUserFailed: error => ({
    type: authActions.REGISTER_NEW_USER_FAILED,
    payload: { error }
  }),

  signInFailed: error => ({
    type: authActions.SIGN_IN_FAILED,
    payload: { error }
  }),

  signInFulfilled: (authUser, idToken, roles) => ({
    type: authActions.SIGN_IN_FULFILLED,
    payload: { authUser, idToken, roles }
  }),

  authAclGet: authUser => ({
    type: authActions.AUTH_ACL_GET,
    payload: { authUser }
  }),
  authAclGetFulfilled: appUser => ({
    type: authActions.AUTH_ACL_GET_FULFILLED,
    payload: { appUser }
  }),
  authAclGetFailed: error => ({
    type: authActions.AUTH_ACL_GET_FAILED,
    payload: { error }
  }),

  signInWithGithub: () =>
    authActions.signIn(new firebase.auth.GithubAuthProvider()),

  signInWithGoogle: () =>
    authActions.signIn(new firebase.auth.GoogleAuthProvider()),

  signInWithTwitter: () =>
    authActions.signIn(new firebase.auth.TwitterAuthProvider()),

  signInWithFacebook: () =>
    authActions.signIn(new firebase.auth.FacebookAuthProvider()),

  signOut: () => ({
    type: authActions.SIGN_OUT
  }),

  signOutFailed: error => ({
    type: authActions.SIGN_OUT_FAILED,
    payload: { error }
  }),

  signOutFulfilled: () => ({
    type: authActions.SIGN_OUT_FULFILLED
  })
};
