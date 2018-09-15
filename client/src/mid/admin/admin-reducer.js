import { combineReducers } from 'redux';
import { aclReducer, userReducer } from './index';

export const adminReducer = combineReducers({
  users: userReducer,
  acl: aclReducer
});
