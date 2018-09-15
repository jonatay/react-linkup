import { List, Record } from 'immutable';
import { tranTypeCcActions } from './tran-type-cc-actions';

export const TranTypeCcState = new Record({
  filter: '',
  list: new List()
});

export function tranTypeCcReducer(
  state = new TranTypeCcState(),
  { payload, type }
) {
  switch (type) {
    case tranTypeCcActions.CREATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.tranTypeCc)
      );

    case tranTypeCcActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.tranTypeCc.id
            ? payload.tranTypeCc
            : r;
        })
      );

    case tranTypeCcActions.REMOVE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED:
      return state.set(
        'list',
        state.list.filter(tranTypeCc => {
          return tranTypeCc.id !== payload.tranTypeCc.id;
        })
      );

    case tranTypeCcActions.LOAD_TRANSACTION_TYPE_COST_CENTRES_FULFILLED:
      return state.set(
        'list',
        new List(payload.tranTypeCcs)
      );

    default:
      return state;
  }
}
