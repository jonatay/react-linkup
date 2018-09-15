import { List, Record } from 'immutable';
import { attendUserActions } from './attend-user-actions';

export const AttendUserState = new Record({
  filter: '',
  list: new List()
});

export function attendUserReducer(
  state = new AttendUserState(),
  { payload, type }
) {
  switch (type) {
    case attendUserActions.CREATE_ATTEND_USER_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.attendUser)
      );

    case attendUserActions.UPDATE_ATTEND_USER_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.attendUser.id
            ? payload.attendUser
            : r;
        })
      );

    case attendUserActions.REMOVE_ATTEND_USER_FULFILLED:
      return state.set(
        'list',
        state.list.filter(attendUser => {
          return attendUser.id !== payload.attendUser.id;
        })
      );

    case attendUserActions.LOAD_ATTEND_USERS_FULFILLED:
      return state.set(
        'list',
        new List(payload.attendUsers)
      );

    default:
      return state;
  }
}
