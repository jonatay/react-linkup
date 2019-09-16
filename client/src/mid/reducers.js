import { combineReducers } from "redux";
//import { routerReducer } from "react-router-redux";
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from "redux-form";

import { commonReducer } from "./common/index";
import { adminReducer } from "./admin/index";
import { fleetReducer } from "./fleet/index";
import { sagePayReducer } from "./sage-pay/index";
import { attendReducer } from "./attend";
import { hrReducer } from "./hr";
import { simplePayReducer } from "./simple-pay";
import { sageOneReducer } from "./sage-one";

//export default combineReducers({
export default (history) => combineReducers({
  //router: routerReducer,
  router: connectRouter(history),
  common: commonReducer,
  admin: adminReducer,
  fleet: fleetReducer,
  form: formReducer,
  sagePay: sagePayReducer,
  attend: attendReducer,
  hr: hrReducer,
  simplePay: simplePayReducer,
  sageOne: sageOneReducer
});
