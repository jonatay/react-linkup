import { combineReducers } from 'redux';
import { sageBankReducer, sageBBranchReducer, sageAccountReducer, sageBatchReducer } from './';

export const sagePayReducer = combineReducers({
  sageBanks: sageBankReducer,
  sageBBranches: sageBBranchReducer,
  sageAccounts: sageAccountReducer,
  sageBatches: sageBatchReducer
});
