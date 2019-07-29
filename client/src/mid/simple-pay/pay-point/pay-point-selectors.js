import { createSelector } from 'reselect';

export const getPayPointsRoot = state => {
  return state.simplePay.payPoints;
};

export const getPayPointList = state => {
  return getPayPointsRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getPayPointById = createSelector(
  getPayPointList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getPayPoints = createSelector(
  getPayPointList,
  list => list.toArray()
);
