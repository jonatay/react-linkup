import { createSelector } from 'reselect';

export const getAttendDeptsRoot = state => {
  return state.attend.attendDepts;
};

export const getAttendDeptList = state => {
  return getAttendDeptsRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getAttendDeptById = createSelector(
  getAttendDeptList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getAttendDepts = createSelector(
  getAttendDeptList,
  list => list.toArray()
);
