import { combineReducers } from 'redux';
import { vehicleReducer, driverReducer } from './';

export const fleetReducer = combineReducers({
  vehicles: vehicleReducer,
  drivers: driverReducer
});
