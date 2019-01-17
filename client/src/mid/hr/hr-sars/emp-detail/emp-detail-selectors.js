import { createSelector } from 'reselect';

export const getEmpDetailsRoot = state => {
  return state.hr.hrSars.empDetails;
};

export const getEmpDetailList = state => {
  return getEmpDetailsRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getEmpDetailById = createSelector(getEmpDetailList, (list, id) =>
  list.filter(rec => rec.id === id)
);

export const getEmpDetailByMasterId = createSelector(
  getEmpDetailList,
  (list, emp_master_id) =>
    list.filter(rec => rec.emp_master_id === emp_master_id).toArray()
);

export const getEmpDetails = createSelector(getEmpDetailList, list =>
  list.toArray()
);
