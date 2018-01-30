import { combineReducers } from 'redux';
import { authReducer, aclFrontReducer } from './';

export const commonReducer = combineReducers({
  auth: authReducer,
  acl: aclFrontReducer
});
