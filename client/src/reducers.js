import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { commonReducer } from './common';
import { adminReducer } from './admin';

export default combineReducers({
  router: routerReducer,
  common: commonReducer,
  admin: adminReducer
});
