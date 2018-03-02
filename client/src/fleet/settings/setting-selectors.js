import { createSelector } from 'reselect';

export function getSettings(state) {
  return state.fleet.settings;
}

export function getCostCentreList(state) {
  return getSettings(state).costCentreList;
}

export function getCostCentreGroupList(state) {
  return getSettings(state).costCentreGroupList;
}

export function getTransactionTypeList(state) {
  return getSettings(state).transactionTypeList;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getCostCentreById = createSelector(
  getCostCentreList,
  (costCentreList, id) =>
    costCentreList.filter(costCentre => costCentre.id === id)
);

export const getCostCentres = createSelector(
  getCostCentreList,
  costCentreList => costCentreList.toArray()
);

export const getCostCentreGroups = createSelector(
  getCostCentreGroupList,
  costCentreGroupList => costCentreGroupList.toArray()
);

export const getTransactionTypes = createSelector(
  getTransactionTypeList,
  transactionTypeList => transactionTypeList.toArray()
);
