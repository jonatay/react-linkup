import { combineReducers } from 'redux';
import { authReducer } from './auth';

export const commonReducer = combineReducers({
  auth: authReducer
});
