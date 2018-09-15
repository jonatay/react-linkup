import { createSelector } from 'reselect';
import moment from 'moment';
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

// const getDateSortedFleetTransactions = createSelector(
//   getFleetTransactionList,
//   fleetTranList =>
//     fleetTranList.sort(
//       (a, b) =>
//         a.transaction_date > b.transaction_date
//           ? 1
//           : a.transaction_date > b.transaction_date
//             ? -1
//             : 0
//     )
// );

const sortMethodRandPerLitre = (a, b) =>
  a.fuel_litres > 0 && b.fuel_litres > 0
    ? a.amount / a.fuel_litres - b.amount / b.fuel_litres
    : a.fuel_litres > 0
      ? 1
      : b.fuel_litres > 0
        ? -1
        : 0;

const getSortedFleetTransactions = createSelector(
  getFilteredFleetTransactions,
  getFleetTransactionFilter,
  (list, { sorted }) =>
    !sorted || sorted.length === 0
      ? list
      : sorted.reduceRight(
          (r, v) =>
            v.desc
              ? v.id === 'rand_per_litre'
                ? r.sort(sortMethodRandPerLitre).reverse()
                : r.sortBy(rec => rec[v.id]).reverse()
              : v.id === 'rand_per_litre'
                ? r.sort(sortMethodRandPerLitre)
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
  ft.tax_year === 0
    ? 'Current'
    : `${String(
        '0000' + ft.tax_month <= 2 ? ft.tax_year : ft.tax_year - 1
      ).slice(-4)}${String('00' + ft.tax_month).slice(-2)}`;

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

export const getFleetTransactionTypes = createSelector(
  getFleetTransactionList,
  fleetTransactionList =>
    fleetTransactionList
      .toArray()
      .reduce(
        (ret, ft) =>
          ret.find(p => p === ft.transaction_type)
            ? ret
            : [...ret, ft.transaction_type],
        []
      )
      .sort(
        (a, b) => (a.localeCompare(b) < 0 ? 1 : a.localeCompare(b) > 0 ? -1 : 0)
      )
);

export const getFleetTransactionSummary = createSelector(
  getFleetTransactionList,
  getFleetTransactionPeriods,
  getFleetTransactionTypes,
  (fleetTransactionList, fleetTransactionPeriods, fleetTransactionTypes) =>
    fleetTransactionList.toArray().reduce((vehSumm, ft) => {
      // let perId = `${ft.tax_year}${String('00' + ft.tax_month).slice(-2)}`;
      let vehRow = vehSumm.find(v => v.vehicle_id === ft.vehicle_id);
      const periodId = getPerId(ft);
      if (typeof vehRow === 'undefined') {
        vehRow = {
          vehicle_id: ft.vehicle_id,
          registration: ft.registration,
          vehicle: ft.vehicle,
          periods: fleetTransactionPeriods.reduce(
            (periods, pId) => ({
              ...periods,
              [pId]: {
                period: pId,
                amount: 0,
                types: {}
              }
            }),
            {}
          )
        };
        vehSumm.push(vehRow);
      }
      let per = vehRow.periods[periodId];
      if (!per.tax_year) {
        per = {
          ...per,
          tax_year: ft.tax_year,
          tax_month: ft.tax_month,
          amount: 0
        };
      }
      per.amount += ft.amount;
      let tranType = per.types[ft.transaction_type]
        ? per.types[ft.transaction_type]
        : { tranType: ft.transactionType, amount: 0 };
      tranType.amount += ft.amount;
      per.types[ft.transaction_type] = tranType;
      vehRow.periods[periodId] = per;
      return vehSumm;
    }, [])
);

// const getDateFromTran = fTran => fTran.transaction_date;
// moment(fTran.transaction_date).format('YYYY-MM-DD');

// const findDateNotEqual = ra => getDateFromTran(this) !== ra.date;
// const findDateEqual = ra => getDateFromTran(this) === ra.date;

export const getFleetTransactionChartData = createSelector(
  getFleetTransactionList,
  getFleetTransactionTypes,
  (fTranList, tranTypes) =>
    tranTypes.map((tranType, idx) =>
      fTranList
        .toArray()
        .filter(fTran => fTran.transaction_type === tranType)
        .map(fTran => ({
          x: moment(fTran.transaction_date),
          y: Math.round(fTran.amount)
        }))
        .sort((a, b) => a.x - b.x)
        .map(({ x, y }) => ({
          x: moment(x).format('D-MMM-YY'),
          y
        }))
    )
);

/*
export const getFleetTransactionChartData = createSelector(
  getFleetTransactionList,
  getFleetTransactionTypes,
  (fTranList, tranTypes) =>
    fTranList
      .reduce(
        (rArr, fTran) => {
          let item = rArr.find(i => i.date === getDateFromTran(fTran));
          if (!item) {
            item = {
              date: getDateFromTran(fTran),
              ...tranTypes.reduce((ret, tt) => ({ ...ret, [tt]: 0 }), {}),
              [fTran.transaction_type]: fTran.amount
            };
            rArr.push(item);
          } else {
            if (item[fTran.transaction_type]) {
              item[fTran.transaction_type] += fTran.amount;
            } else {
              item[fTran.transaction_type] = fTran.amount;
            }
          }
          return rArr;
        },

        []
      )
      .map(a => ({ ...a, date: moment(a.date).format('YY-MM-DD') }))
      .sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0))
);


          ...rArr.filter(findDateNotEqual, fTran),
            rArr.find(findDateEqual, fTran) || {
              date: getDateFromTran(fTran)

 */
