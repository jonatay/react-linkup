import { combineReducers } from 'redux';
import { aclReducer, userReducer } from './';

export const adminReducer = combineReducers({
  users: userReducer,
  acl: aclReducer
});
