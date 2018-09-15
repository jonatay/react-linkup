import {
  costCentreSagas,
  costCentreGroupSagas,
  fimsPeriodSagas,
  transactionTypeSagas,
  tranTypeCcSagas
} from './index';

export const settingSagas = [
  ...costCentreSagas,
  ...costCentreGroupSagas,
  ...fimsPeriodSagas,
  ...transactionTypeSagas,
  ...tranTypeCcSagas
];
