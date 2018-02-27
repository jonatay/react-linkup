import { combineReducers } from 'redux';
import { vehicleReducer, driverReducer, settingReducer } from './';

export const fleetReducer = combineReducers({
  vehicles: vehicleReducer,
  drivers: driverReducer,
  settings: settingReducer
});
