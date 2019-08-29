import { List, Record } from "immutable";
import { soBankTransactionActions } from "./so-bank-transaction-actions";

export const SoBankTransactionState = new Record({
  filter: {},
  page: {
    top: 100,
    skip: 0,
    orderby: "Date",
    desc: true,
    filterCol: null,
    filterVal: null
  },
  list: new List()
});

export function soBankTransactionReducer(
  state = new SoBankTransactionState(),
  { payload, type }
) {
  switch (type) {
    case soBankTransactionActions.SET_FILTER_SO_BANK_TRANSACTION:
      return state.set("filter", { ...state.filter, ...payload.filter });

    case soBankTransactionActions.CREATE_SO_BANK_TRANSACTION_FULFILLED:
      return state.set("list", state.list.unshift(payload.soBankTransaction));

    case soBankTransactionActions.UPDATE_SO_BANK_TRANSACTION_FULFILLED:
      return state.set(
        "list",
        state.list.map(r => {
          return r.id === payload.soBankTransaction.id
            ? payload.soBankTransaction
            : r;
        })
      );

    case soBankTransactionActions.REMOVE_SO_BANK_TRANSACTION_FULFILLED:
      return state.set(
        "list",
        state.list.filter(soBankTransaction => {
          return soBankTransaction.id !== payload.soBankTransaction.id;
        })
      );

    case soBankTransactionActions.LOAD_SO_BANK_TRANSACTIONS_FULFILLED:
      return state.set("list", new List(payload.soBankTransactions));

    default:
      return state;
  }
}
