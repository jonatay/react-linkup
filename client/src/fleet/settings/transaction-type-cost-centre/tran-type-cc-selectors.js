import { createSelector } from 'reselect';

export const getTranTypeCcsRoot = state => {
  return state.fleet.settings.tranTypeCcs;
};

export const getTranTypeCcList = state => {
  return getTranTypeCcsRoot(state).list;
};


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------


export const getTranTypeCcById = createSelector(
  getTranTypeCcList,
  (list, id) =>
    list.filter(rec => rec.id === id)
);

export const getTranTypeCcs = createSelector(
  getTranTypeCcList,
  list => list.toArray()
);
