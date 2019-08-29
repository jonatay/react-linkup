import { combineReducers } from "redux";
import { soBankAccountReducer, soBankTransactionReducer } from "./index";

export const sageOneReducer = combineReducers({
  bankAccounts: soBankAccountReducer,
  bankTransactions: soBankTransactionReducer
});
