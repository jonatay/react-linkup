import { createSelector } from "reselect";

export const getSoAccountsRoot = state => {
  return state.sageOne.accounts;
};

export const getSoAccountList = state => {
  return getSoAccountsRoot(state).list;
};

export const getSoAccountFilter = state => {
  return getSoAccountsRoot(state).filter;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getSoAccountById = createSelector(
  getSoAccountList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getSoAccounts = createSelector(
  getSoAccountList,
  list => list.toArray()
);

export const getFilteredSoAccounts = createSelector(
  getSoAccounts,
  getSoAccountFilter,
  (soAccounts, filter) => soAccounts //add .filter here
);
