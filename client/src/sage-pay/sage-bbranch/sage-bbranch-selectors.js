import { createSelector } from 'reselect';
import { getSageBanks } from '../sage-bank/sage-bank-selectors';

export const getSageBBranchesRoot = state => {
  return state.sagePay.sageBBranches;
};

export const getSageBBranchList = state => {
  return getSageBBranchesRoot(state).list;
};

/*
  Memorised
 */

export const getSageBBranchById = createSelector(
  getSageBBranchList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getSageBBranches = createSelector(
  getSageBBranchList,
  getSageBanks,
  (sageBBranchList, sageBanks) =>
    sageBBranchList.toArray().map(br => ({
      ...br,
      sage_bank: sageBanks.find(ba => ba.id === br.sage_bank_id)
    }))
);
