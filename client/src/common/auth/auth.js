import { firebaseAuth } from '../../firebase/index';
import { authActions } from './auth-actions';

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

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          authUser.getIdToken().then(idToken => {
            const customClaims = JSON.parse(
              b64DecodeUnicode(idToken.split('.')[1])
            );
            dispatch(authActions.signInFulfilled(authUser, idToken, customClaims.roles));
          });
        }

        resolve();
        unsubscribe();
      },

      error => reject(error)
    );
  });
}
