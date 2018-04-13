import { createSelector } from "reselect";
// import { fleetTransactionList } from './fleetTransaction-list';

export function getFleetTransactionsFromState(state) {
  return state.fleet.fleetTransactions;
}

export function getFleetTransactionFilter(state) {
  return getFleetTransactionsFromState(state).filter;
}

export function getFleetTransactionShowInactive(state) {
  return getFleetTransactionsFromState(state).showInactive;
}

export function getFleetTransactionList(state) {
  return getFleetTransactionsFromState(state).list;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

const getFilteredFleetTransactions = createSelector(
  getFleetTransactionList,
  getFleetTransactionFilter,
  (list, { filtered }) =>
    !filtered
      ? list
      : filtered.length === 0
        ? list
        : list.filter((val, key) =>
            filtered.reduce((r, v, k) => {
              return true;
            })
          )
);

export const getVisibleFleetTransactions = createSelector(
  getFilteredFleetTransactions,
  getFleetTransactionFilter,
  (fleetTransactionList, { page, pageSize, sorted, filtered }) =>
    fleetTransactionList
      .toArray()
      .slice(page * pageSize, page * pageSize + pageSize)
);

export const getFleetTransactionById = createSelector(
  getFleetTransactionList,
  (fleetTransactionList, id) =>
    fleetTransactionList.filter(fleetTransaction => fleetTransaction.id === id)
);

export const getFleetTransactionsList = createSelector(
  getFleetTransactionList,
  fleetTransactionList => fleetTransactionList
);

export const getFleetTransactions = createSelector(
  getFleetTransactionsList,
  fleetTransactionList => fleetTransactionList.toArray()
);
