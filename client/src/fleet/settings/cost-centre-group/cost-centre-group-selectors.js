import { createSelector } from 'reselect';

export const getCostCentreGroupsRoot = state => {
  return state.fleet.settings.costCentreGroups;
};

export const getCostCentreGroupList = state => {
  return getCostCentreGroupsRoot(state).list;
};

/*
  Memorised
 */

export const getCostCentreGroupById = createSelector(
  getCostCentreGroupList,
  (list, id) =>
    list.filter(rec => rec.id === id)
);

export const getCostCentreGroups = createSelector(
  getCostCentreGroupList,
  list => list.toArray()
);

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------
