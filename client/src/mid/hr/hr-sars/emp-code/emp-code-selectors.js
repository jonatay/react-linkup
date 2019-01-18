import { createSelector } from 'reselect';

export const getEmpCodesRoot = state => {
  return state.hr.hrSars.empCodes;
};

export const getEmpCodeList = state => {
  return getEmpCodesRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getEmpCodeById = createSelector(getEmpCodeList, (list, id) =>
  list.filter(rec => rec.id === id)
);

export const getEmpCodes = createSelector(getEmpCodeList, list =>
  list.toArray()
);
