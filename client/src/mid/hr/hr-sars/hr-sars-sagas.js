import { empMasterSagas, empDetailSagas } from './index';

export const hrSarsSagas = [...empMasterSagas, ...empDetailSagas];
