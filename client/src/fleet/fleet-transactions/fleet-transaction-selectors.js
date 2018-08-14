import { createSelector } from 'reselect';
// import { fleetTransactionList } from './fleetTransaction-list';

export function getFleetTransactionsFromState(state) {
  return state.fleet.fleetTransactions;
}

export function getFleetTransactionFilter(state) {
  return getFleetTransactionsFromState(state).filter;
}

export function getFleetTransactionList(state) {
  return getFleetTransactionsFromState(state).list;
}

export function getListParamsFromState(state) {
  return getFleetTransactionsFromState(state).listParams;
}

export function getListOptionsFromState(state) {
  return getFleetTransactionsFromState(state).listOptions;
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
        : sorted.reduceRight(
            (r, v) =>
              v.desc
                ? r.sortBy(rec => rec[v.id]).reverse()
                : r.sortBy(rec => rec[v.id]),
            list
          )
);

export const getFleetTransactionsPageCount = createSelector(
  getFilteredFleetTransactions,
  getFleetTransactionFilter,
  (list, { pageSize }) => parseInt(list.size / pageSize, 10)
);

export const getVisibleFleetTransactions = createSelector(
  getSortedFleetTransactions,
  getFleetTransactionFilter,
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
  fleetTransactionList => fleetTransactionList
);

export const getListParams = createSelector(getListParamsFromState, dr => dr);

export const getListOptions = createSelector(
  getListOptionsFromState,
  listOptions => listOptions
);

const getPerId = ft =>
  `${String('0000' + ft.tax_year).slice(-4)}${String('00' + ft.tax_month).slice(
    -2
  )}`;

export const getFleetTransactionPeriods = createSelector(
  getFleetTransactionList,
  fleetTransactionList =>
    fleetTransactionList
      .toArray()
      .reduce(
        (ret, ft) =>
          ret.find(p => p === getPerId(ft)) ? ret : [...ret, getPerId(ft)],
        []
      )
      .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
);

export const getFleetTransactionSummary = createSelector(
  getFleetTransactionList,
  fleetTransactionList =>
    fleetTransactionList.toArray().reduce((ret, ft) => {
      let perId = `${ft.tax_year}${String('00' + ft.tax_month).slice(-2)}`;
      let vr = ret.find(v => v.registration === ft.registration);
      if (typeof vr === 'undefined') {
        vr = {
          registration: ft.registration,
          vehicle: ft.vehicle,
          periods: []
        };
        ret.push(vr);
      }
      let per = vr.periods.find(
        p => p.tax_year === ft.tax_year && p.tax_month === ft.tax_month
      );
      if (typeof per === 'undefined') {
        per = { tax_year: ft.tax_year, tax_month: ft.tax_month, types: [] };
        vr.periods.push(per);
      }
      let type = per.types.find(
        t => t.transaction_type === ft.transaction_type
      );
      if (typeof type === 'undefined') {
        type = { transaction_type: ft.transaction_type, amount: ft.amount };
        per.types.push(type);
      } else {
        type.amount += ft.amount;
      }
      return ret;
    }, [])
);
