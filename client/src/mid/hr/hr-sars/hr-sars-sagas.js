import { empMasterSagas, empDetailSagas, empCodeSagas } from './index';

export const hrSarsSagas = [
  ...empMasterSagas,
  ...empDetailSagas,
  ...empCodeSagas
];
