import { List, Record } from 'immutable';
import { roleActions } from './role-actions';


export const RolesState = new Record({
  filter: '',
  list: new List()
});


export function rolesReducer(state = new RolesState(), {payload, type}) {
  switch (type) {
    case roleActions.CREATE_ROLE_FULFILLED:
      return state.set('list', state.list.unshift(payload.role));

    case roleActions.FILTER_ROLES:
      return state.set('filter', payload.filterType || '');

    case roleActions.LOAD_ROLES_FULFILLED:
      return state.set('list', new List(payload.roles.reverse()));

    case roleActions.REMOVE_ROLE_FULFILLED:
      return state.set('list', state.list.filter(role => {
        return role.key !== payload.role.key;
      }));

    case roleActions.UPDATE_ROLE_FULFILLED:
      return state.set('list', state.list.map(role => {
        return role.key === payload.role.key ? payload.role : role;
      }));

    default:
      return state;
  }
}
