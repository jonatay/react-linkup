import { combineReducers } from "redux";
import {
  soBankAccountReducer,
  soBankTransactionReducer,
  soAccountReducer
} from "./index";

export const sageOneReducer = combineReducers({
  bankAccounts: soBankAccountReducer,
  bankTransactions: soBankTransactionReducer,
  accounts: soAccountReducer
});
