import { aclSagas, userSagas } from './index';

export const adminSagas = [
  ...userSagas,
  ...aclSagas
];
