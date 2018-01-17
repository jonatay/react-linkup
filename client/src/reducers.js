import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './auth';
import { rolesReducer } from './acl'
import { userReducer } from './admin';

export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  users: userReducer,
  // rights: rightReducer,
  roles: rolesReducer
});
