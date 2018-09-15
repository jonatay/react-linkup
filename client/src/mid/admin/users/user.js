import { Record } from 'immutable';

export const User = new Record({
  disabled: null,
  displayName: null,
  email: null,
  emailVerified: null,
  metadata: {},
  creationTime: null,
  lastSignInTime: null,
  photoURL: null,
  providerData: [],
  uid: null,
  customClaims: {
    admin:false,
    roles:[]
  }
});
