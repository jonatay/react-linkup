import { combineReducers } from 'redux';
import { authReducer, aclFrontReducer } from './index';

export const commonReducer = combineReducers({
  auth: authReducer,
  acl: aclFrontReducer
});
