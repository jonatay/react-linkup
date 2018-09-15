import { List, Record } from 'immutable';
import { sageBatchActions } from './sage-batch-actions';

export const SageBatchState = new Record({
  filter: '',
  list: new List()
});

export function sageBatchReducer(
  state = new SageBatchState(),
  { payload, type }
) {
  switch (type) {
    case sageBatchActions.LOAD_SAGE_BATCHES_FULFILLED:
      return state.set('list', new List(payload.sageBatches));

    case sageBatchActions.CREATE_SAGE_BATCH_FULFILLED:
      return state.set('list', state.list.unshift(payload.sageBatch));

    case sageBatchActions.SUBMIT_SAGE_BATCH_FULFILLED:
    case sageBatchActions.QUERY_SAGE_BATCH_FULFILLED:
      return state.set(
        'list',
        state.list.map(
          sageBatch =>
            sageBatch.id === payload.sageBatch.id
              ? payload.sageBatch
              : sageBatch
        )
      );

    case sageBatchActions.DELETE_SAGE_BATCH_FULFILLED:
      return state.set('list', state.list.filter(r => r.id !== payload.id));

    default:
      return state;
  }
}
