import { createSelector } from 'reselect';

const getRoot = state => {
  return state.fleet.settings.fimsPeriods;
};

export const getFimsPeriodList = state => {
  return getRoot(state).list;
};

export const getFimsPeriodIsAvailable = state => {
  return getRoot(state).isAvailable;
};

/*
  Memorised
 */

export const getFimsPeriodById = createSelector(getFimsPeriodList, (list, id) =>
  list.filter(rec => rec.id === id)
);

export const getFimsPeriods = createSelector(getFimsPeriodList, list =>
  list.toArray()
);

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------
