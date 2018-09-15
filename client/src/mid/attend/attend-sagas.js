import { attendUserSagas, attendDeptSagas, attendLogSagas } from './index';

export const attendSagas = [
  ...attendUserSagas,
  ...attendDeptSagas,
  ...attendLogSagas
];
