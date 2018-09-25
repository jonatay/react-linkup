import { Record } from 'immutable';
import { authActions } from './auth-actions';

export const AuthState = new Record({
  authenticated: false,
  uid: null,
  user: null,
  photoURL: null,
  idToken: null,
  authError: null,
  roles: []
});

export const authReducer = (state = new AuthState(), { payload, type }) => {
  switch (type) {
    case authActions.SIGN_IN_FULFILLED:
      return state.merge({
        authenticated: true,
        uid: payload.authUser.uid,
        user: payload.authUser,
        photoURL: payload.authUser.photoURL,
        idToken: payload.idToken,
        authError: null,
        roles: payload.roles
      });

    case authActions.REFRESH_ID_TOKEN_FULFILLED:
      return state.merge({
        idToken: payload.idToken
      });

    case authActions.SIGN_IN_FAILED:
    case authActions.REGISTER_NEW_USER_FAILED:
      return state.merge({
        authError: payload.error
      });

    case authActions.SIGN_OUT_FULFILLED:
      return state.merge({
        authenticated: false,
        uid: null,
        user: null,
        photoURL: null,
        idToken: null,
        authError: null,
        roles: []
      });

    default:
      return state;
  }
};
