import { combineReducers } from 'redux';
import { sageBankReducer, sageBBranchReducer } from './';

export const sagePayReducer = combineReducers({
  sageBanks: sageBankReducer,
  sageBBranches: sageBBranchReducer
});
