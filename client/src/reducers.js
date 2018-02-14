import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { commonReducer } from './common';
import { adminReducer } from './admin';
import { fleetReducer } from './fleet';

export default combineReducers({
  router: routerReducer,
  common: commonReducer,
  admin: adminReducer,
  fleet: fleetReducer,
  form: formReducer
});
