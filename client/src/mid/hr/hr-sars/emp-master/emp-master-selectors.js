import { createSelector } from 'reselect';

export const getEmpMastersRoot = state => {
  return state.hr.hrSars.empMasters;
};

export const getEmpMasterList = state => {
  return getEmpMastersRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getEmpMasterById = createSelector(
  getEmpMasterList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getEmpMasters = createSelector(
  getEmpMasterList,
  list => list.toArray()
);
