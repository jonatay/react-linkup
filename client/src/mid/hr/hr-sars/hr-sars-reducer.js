import { combineReducers } from 'redux';
import { empMasterReducer, empDetailReducer, empCodeReducer, codeLkpReducer} from '.';

export const hrSarsReducer = combineReducers({
  empMasters: empMasterReducer,
  empDetails: empDetailReducer,
  empCodes: empCodeReducer,
  codeLkps: codeLkpReducer
});
