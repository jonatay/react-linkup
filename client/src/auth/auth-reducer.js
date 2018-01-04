import { Record } from 'immutable';
import { authActions } from './auth-actions';

export const AuthState = new Record({
  authenticated: false,
  uid: null,
  user: null,
  photoURL:null,
  token:null
});

export function authReducer(state = new AuthState(), { payload, type }) {
  switch (type) {
    case authActions.SIGN_IN_FULFILLED:
      return state.merge({
        authenticated: true,
        uid: payload.authUser.uid,
        user: payload.authUser,
        photoURL: payload.authUser.photoURL,
        token: payload.authUser.getIdToken()
      });

    case authActions.SIGN_OUT_FULFILLED:
      return state.merge({
        authenticated: false,
        uid: null,
        user: null,
        photoURL: null,
        token:null
      });

    default:
      return state;
  }
}
