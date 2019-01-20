import { createSelector } from 'reselect';

export const getCodeLkpsRoot = state => {
  return state.hr.hrSars.codeLkps;
};

export const getCodeLkpList = state => {
  return getCodeLkpsRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getCodeLkpById = createSelector(
  getCodeLkpList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getCodeLkps = createSelector(
  getCodeLkpList,
  list => list.toArray()
);
