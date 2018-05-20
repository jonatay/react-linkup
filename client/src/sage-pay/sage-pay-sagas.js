import { sageBankSagas, sageBBranchSagas, sageAccountSagas } from './';

export const sagePaySagas = [
  ...sageBankSagas,
  ...sageBBranchSagas,
  ...sageAccountSagas
];
