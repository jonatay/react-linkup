import { createSelector } from 'reselect';

export const getFimsPeriodsRoot = state => {
  return state.fleet.settings.fimsPeriods;
};

export const getFimsPeriodList = state => {
  return getFimsPeriodsRoot(state).list;
};

/*
  Memorised
 */

export const getFimsPeriodById = createSelector(
  getFimsPeriodList,
  (list, id) =>
    list.filter(rec => rec.id === id)
);

export const getFimsPeriods = createSelector(
  getFimsPeriodList,
  list => list.toArray()
);

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------
