export const soAccountActions = {
  
  SET_FILTER_SO_ACCOUNT: 'SAGE_ONESET_FILTER_SO_ACCOUNTS',

  LOAD_SO_ACCOUNTS: 'SAGE_ONE_LOAD_SO_ACCOUNTS',
  LOAD_SO_ACCOUNTS_FULFILLED: 'SAGE_ONE_LOAD_SO_ACCOUNTS_FULFILLED',
  LOAD_SO_ACCOUNTS_FAILED: 'SAGE_ONE_LOAD_SO_ACCOUNTS_FAILED',

  CREATE_SO_ACCOUNT: 'SAGE_ONE_CREATE_SO_ACCOUNT',
  CREATE_SO_ACCOUNT_FAILED: 'SAGE_ONE_CREATE_SO_ACCOUNT_FAILED',
  CREATE_SO_ACCOUNT_FULFILLED:
    'SAGE_ONE_CREATE_SO_ACCOUNT_FULFILLED',

  REMOVE_SO_ACCOUNT: 'SAGE_ONE_REMOVE_SO_ACCOUNT',
  REMOVE_SO_ACCOUNT_FAILED: 'SAGE_ONE_REMOVE_SO_ACCOUNT_FAILED',
  REMOVE_SO_ACCOUNT_FULFILLED:
    'SAGE_ONE_REMOVE_SO_ACCOUNT_FULFILLED',

  UPDATE_SO_ACCOUNT: 'SAGE_ONE_UPDATE_SO_ACCOUNT',
  UPDATE_SO_ACCOUNT_FAILED: 'SAGE_ONE_UPDATE_SO_ACCOUNT_FAILED',
  UPDATE_SO_ACCOUNT_FULFILLED:
    'SAGE_ONE_UPDATE_SO_ACCOUNT_FULFILLED',

  setFilterSoAccount: filter => ({
    type: soAccountActions.SET_FILTER_SO_ACCOUNT,
    payload: { filter }
  }),

  loadSoAccounts: () => ({
    type: soAccountActions.LOAD_SO_ACCOUNTS
  }),
  loadSoAccountsFulfilled: soAccounts => ({
    type: soAccountActions.LOAD_SO_ACCOUNTS_FULFILLED,
    payload: { soAccounts }
  }),

  loadSoAccountsFailed: error => ({
    type: soAccountActions.LOAD_SO_ACCOUNTS_FAILED,
    payload: { error }
  }),

  createSoAccount: soAccount => ({
    type: soAccountActions.CREATE_SO_ACCOUNT,
    payload: { soAccount }
  }),

  createSoAccountFailed: error => ({
    type: soAccountActions.CREATE_SO_ACCOUNT_FAILED,
    payload: { error }
  }),

  createSoAccountFulfilled: soAccount => ({
    type: soAccountActions.CREATE_SO_ACCOUNT_FULFILLED,
    payload: { soAccount }
  }),

  removeSoAccount: soAccount => ({
    type: soAccountActions.REMOVE_SO_ACCOUNT,
    payload: { soAccount }
  }),

  removeSoAccountFailed: error => ({
    type: soAccountActions.REMOVE_SO_ACCOUNT_FAILED,
    payload: { error }
  }),

  removeSoAccountFulfilled: soAccount => ({
    type: soAccountActions.REMOVE_SO_ACCOUNT_FULFILLED,
    payload: { soAccount }
  }),

  updateSoAccount: (id, changes) => ({
    type: soAccountActions.UPDATE_SO_ACCOUNT,
    payload: { id, changes }
  }),

  updateSoAccountFailed: error => ({
    type: soAccountActions.UPDATE_SO_ACCOUNT_FAILED,
    payload: { error }
  }),

  updateSoAccountFulfilled: soAccount => ({
    type: soAccountActions.UPDATE_SO_ACCOUNT_FULFILLED,
    payload: { soAccount }
  })
};
