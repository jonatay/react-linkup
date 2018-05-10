import { List, Record } from 'immutable';
import { tranTypeCcActions } from './tran-type-cc-actions';

export const TransactionTypeCostCentreState = new Record({
  filter: '',
  list: new List()
});

export function transactionTypeCostCentreReducer(
  state = new TransactionTypeCostCentreState(),
  { payload, type }
) {
  switch (type) {
    case tranTypeCcActions.CREATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.transactionTypeCostCentre)
      );

    case tranTypeCcActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.transactionTypeCostCentre.id
            ? payload.transactionTypeCostCentre
            : r;
        })
      );

    case tranTypeCcActions.REMOVE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED:
      return state.set(
        'list',
        state.list.filter(transactionTypeCostCentre => {
          return transactionTypeCostCentre.id !== payload.transactionTypeCostCentre.id;
        })
      );

    case tranTypeCcActions.LOAD_TRANSACTION_TYPE_COST_CENTRES_FULFILLED:
      return state.set(
        'list',
        new List(payload.transactionTypeCostCentres)
      );

    default:
      return state;
  }
}
