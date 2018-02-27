import { createSelector } from 'reselect';

export function getSettings(state) {
  return state.settings;
}

export function getCostCentreList(state) {
  return getSettings(state.fleet).costCentreList;
}

export function getCostCentreGroupList(state) {
  return getSettings(state.fleet).costCentreGroupList;
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
