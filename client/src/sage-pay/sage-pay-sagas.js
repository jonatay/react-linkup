import {
  sageBankSagas,
  sageBBranchSagas,
  sageAccountSagas,
  sageBatchSagas
} from './';

export const sagePaySagas = [
  ...sageBankSagas,
  ...sageBBranchSagas,
  ...sageAccountSagas,
  ...sageBatchSagas
];
