import { createSelector } from 'reselect';
import _ from 'lodash';
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

export const getFilteredFleetTransactions = createSelector(
  getFleetTransactionList,
  getFleetTransactionFilter,
  (list, { filtered }) =>
    !filtered
      ? list
      : filtered.length === 0
        ? list
        : list.filter((val, key) =>
            filtered.reduce((r, v, k) => (!r ? r : val[v.id] === v.value), true)
          )
);

const getSortedFleetTransactions = createSelector(
  getFilteredFleetTransactions,
  getFleetTransactionFilter,
  (list, { sorted }) =>
    !sorted
      ? list
      : sorted.length === 0
        ? list
        : sorted.reduce((r, v) => _.sortBy(list, v.id))
);

export const getFleetTransactionsPageCount = createSelector(
  getFilteredFleetTransactions,
  getFleetTransactionFilter,
  (list, { pageSize }) => parseInt(list.size / pageSize)
);

export const getVisibleFleetTransactions = createSelector(
  getFilteredFleetTransactions,
  getSortedFleetTransactions,
  (list, { page, pageSize, sorted, filtered }) =>
    list.toArray().slice(page * pageSize, page * pageSize + pageSize)
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
