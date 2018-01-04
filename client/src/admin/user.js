import { Record } from 'immutable';

export const path = 'admin/users';

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
  uid: null
});
