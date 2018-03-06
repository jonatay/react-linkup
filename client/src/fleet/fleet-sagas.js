import { vehicleSagas, driverSagas, settingSagas } from './';

export const fleetSagas = [...vehicleSagas, ...driverSagas, ...settingSagas];
