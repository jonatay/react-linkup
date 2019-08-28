import { combineReducers } from "redux";
import { soBankAccountReducer } from "./index";

export const sageOneReducer = combineReducers({
  bankAccounts: soBankAccountReducer
});
