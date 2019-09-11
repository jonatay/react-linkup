import { createSelector } from "reselect";

export const getSoBankTransactionsRoot = state => {
  return state.sageOne.bankTransactions;
};

export const getSoBankTransactionList = state => {
  return getSoBankTransactionsRoot(state).list;
};

export const getSoBankTransactionFilter = state => {
  return getSoBankTransactionsRoot(state).filter;
};

export const getSoBankTransactionPage = state => {
  return getSoBankTransactionsRoot(state).page;
};
//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getSoBankTransactionById = createSelector(
  getSoBankTransactionList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getSoBankTransactions = createSelector(
  getSoBankTransactionList,
  list => list.toArray()
);

export const getFilteredSoBankTransactions = createSelector(
  getSoBankTransactions,
  getSoBankTransactionFilter,
  (soBankTransactions, filter) => soBankTransactions //add .filter here
);
