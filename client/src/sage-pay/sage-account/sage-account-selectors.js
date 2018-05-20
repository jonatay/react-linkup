import { createSelector } from 'reselect';

export const getSageAccountsRoot = state => {
  return state.sagePay.sageAccounts;
};

export const getSageAccountList = state => {
  return getSageAccountsRoot(state).list;
};

/*
  Memorised
 */

export const getSageAccountById = createSelector(getSageAccountList, (list, id) =>
  list.filter(rec => rec.id === id)
);

export const getSageAccounts = createSelector(
  getSageAccountList,
  sageAccountList => sageAccountList.toArray()
);
