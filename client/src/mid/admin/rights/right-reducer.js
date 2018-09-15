import { List, Record } from 'immutable';
import { rightActions } from './right-actions';


export const RightsState = new Record({
  filter: '',
  list: new List()
});


export function rightReducer(state = new RightsState(), {payload, type}) {
  switch (type) {
    case rightActions.CREATE_RIGHT_FULFILLED:
      return state.set('list', state.list.unshift(payload.right));

    case rightActions.FILTER_RIGHTS:
      return state.set('filter', payload.filterType || '');

    case rightActions.LOAD_RIGHTS_FULFILLED:
      return state.set('list', new List(payload.rights.reverse()));

    case rightActions.REMOVE_RIGHT_FULFILLED:
      return state.set('list', state.list.filter(right => {
        return right.key !== payload.right.key;
      }));

    case rightActions.UPDATE_RIGHT_FULFILLED:
      return state.set('list', state.list.map(right => {
        return right.key === payload.right.key ? payload.right : right;
      }));

    default:
      return state;
  }
}
