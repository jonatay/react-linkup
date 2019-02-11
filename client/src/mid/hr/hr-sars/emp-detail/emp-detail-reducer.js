import { List, Record } from 'immutable';
import { empDetailActions } from './emp-detail-actions';

export const EmpDetailState = new Record({
  filter: '',
  list: new List()
});

export function empDetailReducer(
  state = new EmpDetailState(),
  { payload, type }
) {
  switch (type) {
    case empDetailActions.CREATE_EMP_DETAIL_FULFILLED:
      return state.set('list', state.list.unshift(payload.empDetail));

    case empDetailActions.UPDATE_EMP_DETAIL_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.empDetail.id ? payload.empDetail : r;
        })
      );

    case empDetailActions.REMOVE_EMP_DETAIL_FULFILLED:
      return state.set(
        'list',
        state.list.filter(empDetail => {
          return empDetail.id !== payload.empDetail.id;
        })
      );

    case empDetailActions.LOAD_EMP_DETAILS_FULFILLED:
      return state.set('list', new List(payload.empDetails));

    case empDetailActions.IMPORT_EMP_DETAILS_FULFILLED:
      return state.set('list', state.list.concat(payload.empDetails));

    default:
      return state;
  }
}
