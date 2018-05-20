import { combineReducers } from 'redux';
import { sageBankReducer, sageBBranchReducer, sageAccountReducer } from './';

export const sagePayReducer = combineReducers({
  sageBanks: sageBankReducer,
  sageBBranches: sageBBranchReducer,
  sageAccounts: sageAccountReducer
});
