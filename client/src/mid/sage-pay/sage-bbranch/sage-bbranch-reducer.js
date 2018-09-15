import { List, Record } from 'immutable';
import { sageBBranchActions } from './sage-bbranch-actions';

export const SageBBranchState = new Record({
  filter: '',
  list: new List()
});

export function sageBBranchReducer(
  state = new SageBBranchState(),
  { payload, type }
) {
  switch (type) {
    case sageBBranchActions.LOAD_SAGE_BBRANCHES_FULFILLED:
    case sageBBranchActions.IMPORT_SAGE_BBRANCHES_FULFILLED:
      return state.set('list', new List(payload.sageBBranches));

    default:
      return state;
  }
}
