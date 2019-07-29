import { List, Record } from 'immutable';
import { spEmployeeActions } from './sp-employee-actions';

export const SpEmployeeState = new Record({
  filter: '',
  list: new List()
});

export function spEmployeeReducer(
  state = new SpEmployeeState(),
  { payload, type }
) {
  switch (type) {
    case spEmployeeActions.CREATE_SP_EMPLOYEE_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.spEmployee)
      );

    case spEmployeeActions.UPDATE_SP_EMPLOYEE_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.spEmployee.id
            ? payload.spEmployee
            : r;
        })
      );

    case spEmployeeActions.REMOVE_SP_EMPLOYEE_FULFILLED:
      return state.set(
        'list',
        state.list.filter(spEmployee => {
          return spEmployee.id !== payload.spEmployee.id;
        })
      );

    case spEmployeeActions.LOAD_SP_EMPLOYEES_FULFILLED:
      return state.set(
        'list',
        new List(payload.spEmployees)
      );

    default:
      return state;
  }
}
