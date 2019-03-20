import { firebaseAuth } from '../../firebase/index';
import { authActions } from './auth-actions';

const b64DecodeUnicode = str => {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  //console.log(str);
  try {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  } catch (e) {
    //console.log(e);
    return null;
  }
};

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          authUser.getIdToken().then(idToken => {
            const cClaims = b64DecodeUnicode(idToken.split('.')[1]);
            const customClaims = cClaims ? JSON.parse(cClaims) : null;
            dispatch(
              authActions.signInFulfilled(
                authUser,
                idToken,
                customClaims ? customClaims.roles : null
              )
            );
          });
        }

        resolve();
        unsubscribe();
      },

      error => reject(error)
    );
  });
}
