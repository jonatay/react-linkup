import { List, Record } from 'immutable';
import { attendDeptActions } from './attend-dept-actions';

export const AttendDeptState = new Record({
  filter: '',
  list: new List()
});

export function attendDeptReducer(
  state = new AttendDeptState(),
  { payload, type }
) {
  switch (type) {
    case attendDeptActions.CREATE_ATTEND_DEPT_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.attendDept)
      );

    case attendDeptActions.UPDATE_ATTEND_DEPT_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.attendDept.id
            ? payload.attendDept
            : r;
        })
      );

    case attendDeptActions.REMOVE_ATTEND_DEPT_FULFILLED:
      return state.set(
        'list',
        state.list.filter(attendDept => {
          return attendDept.id !== payload.attendDept.id;
        })
      );

    case attendDeptActions.LOAD_ATTEND_DEPTS_FULFILLED:
      return state.set(
        'list',
        new List(payload.attendDepts)
      );

    default:
      return state;
  }
}
