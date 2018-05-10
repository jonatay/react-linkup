import {
  costCentreSagas,
  costCentreGroupSagas,
  fimsPeriodSagas,
  transactionTypeSagas,
  tranTypeCcSagas
} from './';

export const settingSagas = [
  ...costCentreSagas,
  ...costCentreGroupSagas,
  ...fimsPeriodSagas,
  ...transactionTypeSagas,
  ...tranTypeCcSagas
];
