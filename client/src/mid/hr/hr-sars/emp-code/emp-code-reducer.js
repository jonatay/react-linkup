import { List, Record } from 'immutable';
import { empCodeActions } from './emp-code-actions';

export const EmpCodeState = new Record({
  filter: '',
  list: new List()
});

export function empCodeReducer(state = new EmpCodeState(), { payload, type }) {
  switch (type) {
    case empCodeActions.CREATE_EMP_CODE_FULFILLED:
      return state.set('list', state.list.unshift(payload.empCode));

    case empCodeActions.UPDATE_EMP_CODE_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.empCode.id ? payload.empCode : r;
        })
      );

    case empCodeActions.REMOVE_EMP_CODE_FULFILLED:
      return state.set(
        'list',
        state.list.filter(empCode => {
          return empCode.id !== payload.empCode.id;
        })
      );

    case empCodeActions.LOAD_EMP_CODES_FULFILLED:
      return state.set('list', new List(payload.empCodes));

    case empCodeActions.IMPORT_EMP_CODES_FULFILLED:
      return state.set('list', state.list.concat(payload.empCodes));

    default:
      return state;
  }
}
