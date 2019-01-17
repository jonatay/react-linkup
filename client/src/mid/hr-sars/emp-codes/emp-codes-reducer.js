import { List, Record } from 'immutable';
import { empCodesActions } from './emp-codes-actions';

export const EmpCodesState = new Record({
  filter: '',
  list: new List()
});

export function empCodesReducer(
  state = new EmpCodesState(),
  { payload, type }
) {
  switch (type) {
    case empCodesActions.CREATE_EMP_CODES_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.empCodes)
      );

    case empCodesActions.UPDATE_EMP_CODES_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.empCodes.id
            ? payload.empCodes
            : r;
        })
      );

    case empCodesActions.REMOVE_EMP_CODES_FULFILLED:
      return state.set(
        'list',
        state.list.filter(empCodes => {
          return empCodes.id !== payload.empCodes.id;
        })
      );

    case empCodesActions.LOAD_EMP_CODESS_FULFILLED:
      return state.set(
        'list',
        new List(payload.empCodess)
      );

    default:
      return state;
  }
}
