import { List, Record } from "immutable";
import moment from "moment";

import { soBankAccountActions } from "./so-bank-account-actions";

export const SoBankAccountState = new Record({
  filter: {
    activeOnly: true,
    dateRange: [moment().subtract(90, "days"), moment()]
  },
  list: new List()
});

export function soBankAccountReducer(
  state = new SoBankAccountState(),
  { payload, type }
) {
  switch (type) {
    case soBankAccountActions.SET_SO_BANK_ACCOUNT_FILTER:
      return state.set("filter", { ...state.filter, ...payload.filter });

    case soBankAccountActions.CREATE_SO_BANK_ACCOUNT_FULFILLED:
      return state.set("list", state.list.unshift(payload.soBankAccount));

    case soBankAccountActions.UPDATE_SO_BANK_ACCOUNT_FULFILLED:
      return state.set(
        "list",
        state.list.map(r => {
          return r.id === payload.soBankAccount.id ? payload.soBankAccount : r;
        })
      );

    case soBankAccountActions.REMOVE_SO_BANK_ACCOUNT_FULFILLED:
      return state.set(
        "list",
        state.list.filter(soBankAccount => {
          return soBankAccount.id !== payload.soBankAccount.id;
        })
      );

    case soBankAccountActions.LOAD_SO_BANK_ACCOUNTS_FULFILLED:
      return state.set("list", new List(payload.soBankAccounts));

    default:
      return state;
  }
}
