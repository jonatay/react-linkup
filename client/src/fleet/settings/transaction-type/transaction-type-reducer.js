import { List, Record } from 'immutable';
import { transactionTypeActions } from './transaction-type-actions';

export const TransactionTypeState = new Record({
  filter: '',
  list: new List()
});

export function transactionTypeReducer(state = new TransactionTypeState(), { payload, type }) {
  switch (type) {
    case transactionTypeActions.LOAD_TRANSACTION_TYPES_FULFILLED:
      return state.set(
        'list',
        new List(payload.transactionTypes)
      );

    default:
      return state;
  }
}
 