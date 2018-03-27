import { combineReducers } from 'redux';
import {
  vehicleReducer,
  driverReducer,
  settingReducer,
  fleetTransactionReducer
} from './';

export const fleetReducer = combineReducers({
  vehicles: vehicleReducer,
  drivers: driverReducer,
  fleetTransactions: fleetTransactionReducer,
  settings: settingReducer
});
