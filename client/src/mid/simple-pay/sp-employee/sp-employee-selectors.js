import { createSelector } from 'reselect';

export const getSpEmployeesRoot = state => {
  return state.simplePay.spEmployees;
};

export const getSpEmployeeList = state => {
  return getSpEmployeesRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getSpEmployeeById = createSelector(
  getSpEmployeeList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getSpEmployees = createSelector(
  getSpEmployeeList,
  list => list.toArray()
);
