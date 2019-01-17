import { createSelector } from 'reselect';

export const getEmpCodessRoot = state => {
  return state.hr-sars.empCodess;
};

export const getEmpCodesList = state => {
  return getEmpCodessRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getEmpCodesById = createSelector(
  getEmpCodesList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getEmpCodess = createSelector(
  getEmpCodesList,
  list => list.toArray()
);
