import { sageBankSagas, sageBBranchSagas } from './';

export const sagePaySagas = [...sageBankSagas, ...sageBBranchSagas];
