import { createSelector } from 'reselect';

export const getCostCentresRoot = state => {
  return state.fleet.settings.costCentres;
};

export const getCostCentreList = state => {
  return getCostCentresRoot(state).list;
};

/*
  Memorised
 */

export const getCostCentreById = createSelector(
  getCostCentreList,
  (list, id) =>
    list.filter(rec => rec.id === id)
);

export const getCostCentres = createSelector(
  getCostCentreList,
  list => list.toArray()
);

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------
