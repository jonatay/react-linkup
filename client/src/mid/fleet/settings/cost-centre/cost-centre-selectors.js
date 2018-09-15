import { createSelector } from 'reselect';
import { getTranTypeCcs } from '../transaction-type-cost-centre/index';

export const getCostCentresRoot = state => {
  return state.fleet.settings.costCentres;
};

export const getCostCentreList = state => {
  return getCostCentresRoot(state).list;
};

/*
  Memorised
 */

export const getCostCentreById = createSelector(getCostCentreList, (list, id) =>
  list.filter(rec => rec.id === id)
);

export const getCostCentres = createSelector(
  getCostCentreList,
  getTranTypeCcs,
  (list, ttccl) =>
    list.toArray().map(cc => ({
      ...cc,
      transactionTypes: ttccl.filter(r => r.cost_centre_id === cc.id)
    }))
);

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

/*
  getTransactionTypeCostCentres,
  (list, ttccl) =>
    list.toArray().map(cc => ({
      ...cc,
      transactionTypes: ttccl.filter(r => r.cost_centre_id === cc.id)
    }))
 */
