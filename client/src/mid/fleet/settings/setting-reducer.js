import { combineReducers } from 'redux';
import {
  costCentreReducer,
  costCentreGroupReducer,
  fimsPeriodReducer,
  transactionTypeReducer,
  tranTypeCcReducer
} from './index';

export const settingReducer = combineReducers({
  costCentres: costCentreReducer,
  costCentreGroups: costCentreGroupReducer,
  fimsPeriods: fimsPeriodReducer,
  transactionTypes: transactionTypeReducer,
  tranTypeCcs: tranTypeCcReducer
});
