import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './auth';
import { userReducer } from './admin';

export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  users: userReducer
});
