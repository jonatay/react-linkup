import {
  sageBankSagas,
  sageBBranchSagas,
  sageAccountSagas,
  sageBatchSagas
} from './index';

export const sagePaySagas = [
  ...sageBankSagas,
  ...sageBBranchSagas,
  ...sageAccountSagas,
  ...sageBatchSagas
];
