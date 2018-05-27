import { createSelector } from 'reselect';
import { getSageBanks, getSageBBranches } from '../';

export const getSageAccountsRoot = state => {
  return state.sagePay.sageAccounts;
};

export const getSageAccountList = state => {
  return getSageAccountsRoot(state).list;
};

/*
  Memorised
 */

export const getSageAccountById = createSelector(
  getSageAccountList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getSageAccounts = createSelector(
  getSageAccountList,
  getSageBanks,
  getSageBBranches,
  (sageAccountList, sageBanks, sageBBranches) =>
    sageAccountList.toArray().map(sa => ({
      ...sa,
      sageBank: sageBanks.find(sb => sb.id === sa.sage_bank_id),
      sageBBranch: sageBBranches.find(sbr => sbr.id === sa.sage_bbranch_id)
    }))
);
