import { createSelector } from 'reselect';

export const getSageBanksRoot = state => {
  return state.sagePay.sageBanks;
};

export const getSageBankList = state => {
  return getSageBanksRoot(state).list;
};

/*
  Memorised
 */

export const getSageBankById = createSelector(getSageBankList, (list, id) =>
  list.filter(rec => rec.id === id)
);

export const getSageBanks = createSelector(
  getSageBankList,
  sageBankList => sageBankList.toArray()
);
