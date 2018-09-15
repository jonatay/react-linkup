import {
  vehicleSagas,
  driverSagas,
  settingSagas,
  fleetTransactionSagas,
  vehicleCcgSagas
} from './index';

export const fleetSagas = [
  ...vehicleSagas,
  ...driverSagas,
  ...settingSagas,
  ...fleetTransactionSagas,
  ...vehicleCcgSagas
];
