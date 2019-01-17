import { combineReducers } from 'redux';
import { empMasterReducer, empDetailReducer } from './index';

export const hrSarsReducer = combineReducers({
  empMasters: empMasterReducer,
  empDetails: empDetailReducer
});
