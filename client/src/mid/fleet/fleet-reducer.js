import { combineReducers } from 'redux';
import {
  vehicleReducer,
  driverReducer,
  settingReducer,
  fleetTransactionReducer,
  vehicleCcgReducer
} from './index';

export const fleetReducer = combineReducers({
  vehicles: vehicleReducer,
  vehicleCcgs: vehicleCcgReducer,
  drivers: driverReducer,
  fleetTransactions: fleetTransactionReducer,
  settings: settingReducer
});
