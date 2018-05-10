import { createSelector } from 'reselect';

export const getTransactionTypeCostCentresRoot = state => {
  return state.fleet.settings.transactionTypeCostCentres;
};

export const getTransactionTypeCostCentreList = state => {
  return getTransactionTypeCostCentresRoot(state).list;
};


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------


export const getTransactionTypeCostCentreById = createSelector(
  getTransactionTypeCostCentreList,
  (list, id) =>
    list.filter(rec => rec.id === id)
);

export const getTransactionTypeCostCentres = createSelector(
  getTransactionTypeCostCentreList,
  list => list.toArray()
);
