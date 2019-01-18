import { combineReducers } from 'redux';
import { empMasterReducer, empDetailReducer, empCodeReducer } from '.';

export const hrSarsReducer = combineReducers({
  empMasters: empMasterReducer,
  empDetails: empDetailReducer,
  empCodes: empCodeReducer
});
