import {
  empMasterSagas,
  empDetailSagas,
  empCodeSagas,
  codeLkpSagas
} from './index';

export const hrSarsSagas = [
  ...empMasterSagas,
  ...empDetailSagas,
  ...empCodeSagas,
  ...codeLkpSagas
];
