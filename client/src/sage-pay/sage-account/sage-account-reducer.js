import { List, Record } from 'immutable';
import { sageAccountActions } from './sage-account-actions';

export const SageAccountState = new Record({
  filter: '',
  list: new List()
});

export function sageAccountReducer(
  state = new SageAccountState(),
  { payload, type }
) {
  switch (type) {
    case sageAccountActions.LOAD_SAGE_ACCOUNTS_FULFILLED:
    case sageAccountActions.IMPORT_CUBIT_ACCOUNTS_FULFILLED:
    case sageAccountActions.IMPORT_BEST_ACCOUNTS_FULFILLED:
      return state.set('list', new List(payload.sageAccounts));

    default:
      return state;
  }
}
