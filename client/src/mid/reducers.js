import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { commonReducer } from './common/index';
import { adminReducer } from './admin/index';
import { fleetReducer } from './fleet/index';
import { sagePayReducer } from './sage-pay/index';
import { attendReducer } from './attend';
import { hrReducer } from './hr';

export default combineReducers({
  router: routerReducer,
  common: commonReducer,
  admin: adminReducer,
  fleet: fleetReducer,
  form: formReducer,
  sagePay: sagePayReducer,
  attend: attendReducer,
  hr: hrReducer
});
