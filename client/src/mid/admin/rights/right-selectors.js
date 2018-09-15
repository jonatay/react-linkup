import { createSelector } from 'reselect';

export function getRights(state) {
  return state.rights;
}

export function getRightFilter(state) {
  return getRights(state).filter;
}

export function getRightList(state) {
  return getRights(state).list;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleRights = createSelector(
  getRightList,
  (rightList) => (rightList)
);
