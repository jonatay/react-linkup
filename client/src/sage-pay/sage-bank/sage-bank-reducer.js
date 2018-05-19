import { List, Record } from 'immutable';
import { sageBankActions } from './sage-bank-actions';

export const SageBankState = new Record({
  filter: '',
  list: new List()
});

export function sageBankReducer(
  state = new SageBankState(),
  { payload, type }
) {
  switch (type) {
    case sageBankActions.LOAD_SAGE_BANKS_FULFILLED:
    case sageBankActions.IMPORT_SAGE_BANKS_FULFILLED:
      return state.set('list', new List(payload.sageBanks));

    default:
      return state;
  }
}
