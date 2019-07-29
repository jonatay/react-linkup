import { combineReducers } from 'redux';
import { spEmployeeReducer, payPointReducer } from './index';

export const simplePayReducer = combineReducers({
  spEmployees : spEmployeeReducer,
  payPoints : payPointReducer
});
