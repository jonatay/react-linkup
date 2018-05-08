import { combineReducers } from 'redux';
import {
  costCentreReducer,
  costCentreGroupReducer,
  fimsPeriodReducer,
  transactionTypeReducer
} from './';

export const settingReducer = combineReducers({
  costCentres: costCentreReducer,
  costCentreGroups: costCentreGroupReducer,
  fimsPeriods: fimsPeriodReducer,
  transactionTypes: transactionTypeReducer
});
