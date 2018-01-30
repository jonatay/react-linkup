import { List, Record } from 'immutable';
import { userActions } from './user-actions';

export const UsersState = new Record({
  filter: '',
  list: new List()
});

export function userReducer(state = new UsersState(), {payload, type}) {
  switch (type) {
    case userActions.CREATE_USER_FULFILLED:
      return state.set('list', state.list.unshift(payload.user));

    case userActions.FILTER_USERS:
      return state.set('filter', payload.filterType || '');

    case userActions.LOAD_USERS_FULFILLED:
      return state.set('list', new List(payload.users));

    case userActions.REMOVE_USER_FULFILLED:
      return state.set('list', state.list.filter(user => {
        return user.uid !== payload.user.uid;
      }));

    case userActions.UPDATE_USER_FULFILLED:
      return state.set('list', state.list.map(user => {
        return user.uid === payload.user.uid ? payload.user : user;
      }));

    default:
      return state;
  }
}
