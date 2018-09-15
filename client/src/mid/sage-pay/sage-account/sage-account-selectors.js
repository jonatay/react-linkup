import { createSelector } from 'reselect';
import { getSageBanks, getSageBBranches } from '../.';

export const getSageAccountsRoot = state => {
  return state.sagePay.sageAccounts;
};

export const getSageAccountList = state => {
  return getSageAccountsRoot(state).list;
};

export const getFilter = state => {
  return getSageAccountsRoot(state).filter;
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
  getFilter,
  getSageBanks,
  getSageBBranches,
  (sageAccountList, filter, sageBanks, sageBBranches) =>
    sageAccountList
      .toArray()
      .filter(sa => (filter.employeeOnly ? sa.employee_id : true))
      .map(sa => ({
        ...sa,
        sageBank: sageBanks.find(sb => sb.id === sa.sage_bank_id),
        sageBBranch: sageBBranches.find(sbr => sbr.id === sa.sage_bbranch_id)
      }))
);
