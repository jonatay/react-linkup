import { createSelector } from 'reselect';

export const getTransactionTypesRoot = state => {
  return state.fleet.settings.transactionTypes;
};

export const getTransactionTypeList = state => {
  return getTransactionTypesRoot(state).list;
};

/*
  Memorised
 */

export const getTransactionTypeById = createSelector(
  getTransactionTypeList,
  (list, id) =>
    list.filter(rec => rec.id === id)
);

export const getTransactionTypes = createSelector(
  getTransactionTypeList,
  list => list.toArray()
);

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------
