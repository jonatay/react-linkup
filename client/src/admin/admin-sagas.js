import { aclSagas, userSagas } from './';

export const adminSagas = [
  ...userSagas,
  ...aclSagas
];
