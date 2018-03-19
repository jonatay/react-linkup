import { createSelector } from 'reselect';
// import { fleetTransactionList } from './fleetTransaction-list';

export function getFleetTransactionsFromState(state) {
  return state.fleet.fleetTransactions;
}

export function getFleetTransactionFilter(state) {
  return getFleetTransactionsFromState(state).filter;
}

export function getVehcleShowInactive(state) {
  return getFleetTransactionsFromState(state).showInactive;
}

export function getFleetTransactionList(state) {
  return getFleetTransactionsFromState(state).list;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleFleetTransactions = createSelector(
  getFleetTransactionList,
  getFleetTransactionFilter,
  getVehcleShowInactive,
  (fleetTransactionList, filter, showInactive) =>
    fleetTransactionList
      .filter(
        fleetTransaction =>
          ((!showInactive && fleetTransaction.is_active) ||
            (showInactive && !fleetTransaction.is_active)) &&
          (fleetTransaction.name.toLowerCase().includes(filter.toLowerCase()) ||
            fleetTransaction.registration.toLowerCase().includes(filter.toLowerCase()) ||
            fleetTransaction.fims_drivers
              .join(' ')
              .toLowerCase()
              .includes(filter.toLowerCase()))
      )
      .toArray()
);

export const getFleetTransactionById = createSelector(
  getFleetTransactionList,
  (fleetTransactionList, id) => fleetTransactionList.filter(fleetTransaction => fleetTransaction.id === id)
);

export const getFleetTransactionsList = createSelector(
  getFleetTransactionList,
  fleetTransactionList => fleetTransactionList
);

export const getFleetTransactions = createSelector(getFleetTransactionsList, fleetTransactionList =>
  fleetTransactionList.toArray()
);
