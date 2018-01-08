import { createSelector } from 'reselect';

export function isAuthenticated(state) {
  return state.auth.authenticated;
}

export const getPhotoURL = state => {
  // console.log(state.auth);
  return state.auth.photoURL;
};

export const getIdToken = state => {
  return state.auth.token.i;
  // return new Promise((resolve, reject) => {
  //   state.auth.user
  //     .getIdToken()
  //     .then(idToken => {
  //       resolve(idToken.i);
  //     })
  //     .catch(err => {
  //       reject(err);
  //     });
  // });
  //return state.auth.user.getIdToken();
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getAuth = createSelector(state => state.auth, auth => auth.toJS());
