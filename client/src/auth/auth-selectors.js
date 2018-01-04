import { createSelector } from 'reselect';

export function isAuthenticated(state) {
  return state.auth.authenticated;
}

export const getPhotoURL = (state) => {
  // console.log(state.auth);
  return state.auth.photoURL;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getAuth = createSelector(
  state => state.auth,
  auth => auth.toJS()
);
