import {
  costCentreSagas,
  costCentreGroupSagas,
  fimsPeriodSagas,
  transactionTypeSagas
} from './';

export const settingSagas = [
  ...costCentreSagas,
  ...costCentreGroupSagas,
  ...fimsPeriodSagas,
  ...transactionTypeSagas
];
