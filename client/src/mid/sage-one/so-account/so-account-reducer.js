import { List, Record } from 'immutable';
import { soAccountActions } from './so-account-actions';

export const SoAccountState = new Record({
  filter: {},
  list: new List()
});

export function soAccountReducer(
  state = new SoAccountState(),
  { payload, type }
) {
  switch (type) {

    case soAccountActions.SET_FILTER_SO_ACCOUNT:
      return state.set("filter", { ...state.filter, ...payload.filter });

    case soAccountActions.CREATE_SO_ACCOUNT_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.soAccount)
      );

    case soAccountActions.UPDATE_SO_ACCOUNT_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.soAccount.id
            ? payload.soAccount
            : r;
        })
      );

    case soAccountActions.REMOVE_SO_ACCOUNT_FULFILLED:
      return state.set(
        'list',
        state.list.filter(soAccount => {
          return soAccount.id !== payload.soAccount.id;
        })
      );

    case soAccountActions.LOAD_SO_ACCOUNTS_FULFILLED:
      return state.set(
        'list',
        new List(payload.soAccounts)
      );

    default:
      return state;
  }
}
