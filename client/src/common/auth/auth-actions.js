import firebase from 'firebase/app';

export const authActions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',
  SIGN_IN_FULFILLED: 'SIGN_IN_FULFILLED',

  AUTH_ACL_GET: 'AUTH_ACL_GET',
  AUTH_ACL_GET_FULFILLED: 'AUTH_ACL_GET_FULFILLED',
  AUTH_ACL_GET_FAILED: 'AUTH_ACL_GET_FAILED',

  SIGN_OUT: 'SIGN_OUT',
  SIGN_OUT_FAILED: 'SIGN_OUT_FAILED',
  SIGN_OUT_FULFILLED: 'SIGN_OUT_FULFILLED',

  getIdTokenFailed: error => ({
    type: authActions.GET_ID_TOKEN_FAILED,
    payload: { error }
  }),

  getIdTokenFulfilled: token => ({
    type: authActions.GET_ID_TOKEN_FULFILLED,
    payload: { token }
  }),


  signIn: authProvider => ({
    type: authActions.SIGN_IN,
    payload: { authProvider }
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
