import {
  vehicleSagas,
  driverSagas,
  settingSagas,
  fleetTransactionSagas,
  vehicleCcgSagas
} from './';

export const fleetSagas = [
  ...vehicleSagas,
  ...driverSagas,
  ...settingSagas,
  ...fleetTransactionSagas,
  ...vehicleCcgSagas
];
