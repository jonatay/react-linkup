export const soBankAccountActions = {
  SET_SO_BANK_ACCOUNT_FILTER: "SAGE_ONE_SET_SO_BANK_ACCOUNT_FILTER",

  LOAD_SO_BANK_ACCOUNTS: "SAGE_ONE_LOAD_SO_BANK_ACCOUNTS",
  LOAD_SO_BANK_ACCOUNTS_FULFILLED: "SAGE_ONE_LOAD_SO_BANK_ACCOUNTS_FULFILLED",
  LOAD_SO_BANK_ACCOUNTS_FAILED: "SAGE_ONE_LOAD_SO_BANK_ACCOUNTS_FAILED",

  CREATE_SO_BANK_ACCOUNT: "SAGE_ONE_CREATE_SO_BANK_ACCOUNT",
  CREATE_SO_BANK_ACCOUNT_FAILED: "SAGE_ONE_CREATE_SO_BANK_ACCOUNT_FAILED",
  CREATE_SO_BANK_ACCOUNT_FULFILLED: "SAGE_ONE_CREATE_SO_BANK_ACCOUNT_FULFILLED",

  REMOVE_SO_BANK_ACCOUNT: "SAGE_ONE_REMOVE_SO_BANK_ACCOUNT",
  REMOVE_SO_BANK_ACCOUNT_FAILED: "SAGE_ONE_REMOVE_SO_BANK_ACCOUNT_FAILED",
  REMOVE_SO_BANK_ACCOUNT_FULFILLED: "SAGE_ONE_REMOVE_SO_BANK_ACCOUNT_FULFILLED",

  UPDATE_SO_BANK_ACCOUNT: "SAGE_ONE_UPDATE_SO_BANK_ACCOUNT",
  UPDATE_SO_BANK_ACCOUNT_FAILED: "SAGE_ONE_UPDATE_SO_BANK_ACCOUNT_FAILED",
  UPDATE_SO_BANK_ACCOUNT_FULFILLED: "SAGE_ONE_UPDATE_SO_BANK_ACCOUNT_FULFILLED",

  setSoBankAccountFilter: filter => ({
    type: soBankAccountActions.SET_SO_BANK_ACCOUNT_FILTER,
    payload: { filter }
  }),

  loadSoBankAccounts: () => ({
    type: soBankAccountActions.LOAD_SO_BANK_ACCOUNTS
  }),
  loadSoBankAccountsFulfilled: soBankAccounts => ({
    type: soBankAccountActions.LOAD_SO_BANK_ACCOUNTS_FULFILLED,
    payload: { soBankAccounts }
  }),

  loadSoBankAccountsFailed: error => ({
    type: soBankAccountActions.LOAD_SO_BANK_ACCOUNTS_FAILED,
    payload: { error }
  }),

  createSoBankAccount: soBankAccount => ({
    type: soBankAccountActions.CREATE_SO_BANK_ACCOUNT,
    payload: { soBankAccount }
  }),

  createSoBankAccountFailed: error => ({
    type: soBankAccountActions.CREATE_SO_BANK_ACCOUNT_FAILED,
    payload: { error }
  }),

  createSoBankAccountFulfilled: soBankAccount => ({
    type: soBankAccountActions.CREATE_SO_BANK_ACCOUNT_FULFILLED,
    payload: { soBankAccount }
  }),

  removeSoBankAccount: soBankAccount => ({
    type: soBankAccountActions.REMOVE_SO_BANK_ACCOUNT,
    payload: { soBankAccount }
  }),

  removeSoBankAccountFailed: error => ({
    type: soBankAccountActions.REMOVE_SO_BANK_ACCOUNT_FAILED,
    payload: { error }
  }),

  removeSoBankAccountFulfilled: soBankAccount => ({
    type: soBankAccountActions.REMOVE_SO_BANK_ACCOUNT_FULFILLED,
    payload: { soBankAccount }
  }),

  updateSoBankAccount: (id, changes) => ({
    type: soBankAccountActions.UPDATE_SO_BANK_ACCOUNT,
    payload: { id, changes }
  }),

  updateSoBankAccountFailed: error => ({
    type: soBankAccountActions.UPDATE_SO_BANK_ACCOUNT_FAILED,
    payload: { error }
  }),

  updateSoBankAccountFulfilled: soBankAccount => ({
    type: soBankAccountActions.UPDATE_SO_BANK_ACCOUNT_FULFILLED,
    payload: { soBankAccount }
  })
};
