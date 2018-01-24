import { createSelector } from 'reselect';

export function isAuthenticatedInt(state) {
  return state.common.auth.authenticated;
}

const getPhotoURLInt = state => {
  return state.common.auth.photoURL;
};

export const getAuthError = state => {
  return state.common.auth.authError;
};

export const getAuthUser = state => {
  return state.common.auth.user;
};

export const getIdToken = state => {
  return state.common.auth.token.i;
  // return new Promise((resolve, reject) => {
  //   state.common.auth.user
  //     .getIdToken()
  //     .then(idToken => {
  //       resolve(idToken.i);
  //     })
  //     .catch(err => {
  //       reject(err);
  //     });
  // });
  //return state.common.auth.user.getIdToken();
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getAuth = createSelector(
  state => state.common.auth,
  auth => auth.toJS()
);

export const getPhotoURL = createSelector(getPhotoURLInt, url => url);

export const isAuthenticated = createSelector(
  isAuthenticatedInt,
  authenticated => authenticated
);
