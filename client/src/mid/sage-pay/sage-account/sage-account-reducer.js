import { List, Record } from 'immutable';
import { sageAccountActions } from './sage-account-actions';

export const SageAccountState = new Record({
  filter: { employeeOnly: true },
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

    case sageAccountActions.VALIDATE_SAGE_ACCOUNT_FULFILLED: {
      return state.set(
        'list',
        state.list.map(
          sageAccount =>
            sageAccount.id === payload.sageAccount.id
              ? {
                  ...payload.sageAccount,
                  validationResult: payload.validationResult
                }
              : sageAccount
        )
      );
    }
    case sageAccountActions.UPDATE_SAGE_ACCOUNT_FULFILLED: {
      return state.set(
        'list',
        state.list.map(
          sageAccount =>
            sageAccount.id === payload.sageAccount.id
              ? payload.sageAccount
              : sageAccount
        )
      );
    }

    default:
      return state;
  }
}
