import { vehicleSagas, driverSagas } from './';

export const fleetSagas = [...vehicleSagas, ...driverSagas];
