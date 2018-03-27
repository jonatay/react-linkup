import {
  vehicleSagas,
  driverSagas,
  settingSagas,
  fleetTransactionSagas
} from './';

export const fleetSagas = [
  ...vehicleSagas,
  ...driverSagas,
  ...settingSagas,
  ...fleetTransactionSagas
];
