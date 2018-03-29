import { createSelector } from 'reselect';

export const getSettings = state => {
  return state.fleet.settings;
};

export const getCostCentreList = state => {
  return getSettings(state).costCentreList;
};

export const getCostCentreGroupList = state => {
  return getSettings(state).costCentreGroupList;
};

export const getTransactionTypeList = state => {
  return getSettings(state).transactionTypeList;
};

export function getFimsPeriodList(state) {
  return getSettings(state).fimsPeriodList;
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

export const getCostCentreGroupById = createSelector(
  getCostCentreGroupList,
  (id, costCentreGroupList) =>
    costCentreGroupList.toArray().find(ccg => ccg.id === id)
);

export const getTransactionTypes = createSelector(
  getTransactionTypeList,
  transactionTypeList => transactionTypeList.toArray()
);

export const getFimsPeriods = createSelector(
  getFimsPeriodList,
  fimsPeriodList => fimsPeriodList.toArray()
);
