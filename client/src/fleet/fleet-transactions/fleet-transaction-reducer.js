import { List, Record } from "immutable";
import { fleetTransactionActions } from "./fleet-transaction-actions";

export const FleetTransactionsState = new Record({
  filter: {},
  pageCount: -1,
  showInactive: false,
  list: new List()
});

export function fleetTransactionReducer(
  state = new FleetTransactionsState(),
  { payload, type }
) {
  switch (type) {
    case fleetTransactionActions.CREATE_FLEET_TRANSACTION_FULFILLED:
      return state.set("list", state.list.unshift(payload.fleetTransaction));

    case fleetTransactionActions.FILTER_FLEET_TRANSACTIONS:
      return state.set("filter", payload);

    case fleetTransactionActions.LOAD_FLEET_TRANSACTIONS_FULFILLED:
      return state.set("list", new List(payload.fleetTransactions));

    case fleetTransactionActions.UPDATE_FLEET_TRANSACTION_FULFILLED:
    case fleetTransactionActions.TOGGLE_FLEET_TRANSACTION_IS_ACTIVE_FULFILLED:
      return state.set(
        "list",
        state.list.map(fleetTransaction => {
          return fleetTransaction.id === payload.fleetTransaction.id
            ? payload.fleetTransaction
            : fleetTransaction;
        })
      );

    case fleetTransactionActions.FleetTransaction_TOGGLE_SHOW_INACTIVE:
      return state.set("showInactive", !state.showInactive);

    default:
      return state;
  }
}

// case fleetTransactionActions.REMOVE_FLEET_TRANSACTION_FULFILLED:
//   return state.set(
//     'list',
//     state.list.filter(fleetTransaction => {
//       return fleetTransaction.id !== payload.fleetTransaction.id;
//     })
//   );
