import { combineReducers } from 'redux';
import {
  vehicleReducer,
  driverReducer,
  settingReducer,
  fleetTransactionReducer,
  vehicleCcgReducer
} from './';

export const fleetReducer = combineReducers({
  vehicles: vehicleReducer,
  vehicleCcgs: vehicleCcgReducer,
  drivers: driverReducer,
  fleetTransactions: fleetTransactionReducer,
  settings: settingReducer
});
