export const sageAccountActions = {
  LOAD_SAGE_ACCOUNTS: 'SAGE_PAY_LOAD_SAGE_ACCOUNTS',
  LOAD_SAGE_ACCOUNTS_FULFILLED: 'SAGE_PAY_LOAD_SAGE_ACCOUNTS_FULFILLED',
  LOAD_SAGE_ACCOUNTS_FAILED: 'SAGE_PAY_LOAD_SAGE_ACCOUNTS_FAILED',

  IMPORT_SAGE_ACCOUNTS: 'SAGE_PAY_IMPORT_SAGE_ACCOUNTS',
  IMPORT_SAGE_ACCOUNTS_FULFILLED: 'SAGE_PAY_IMPORT_SAGE_ACCOUNTS_FULFILLED',
  IMPORT_SAGE_ACCOUNTS_FAILED: 'SAGE_PAY_IMPORT_SAGE_ACCOUNTS_FAILED',

  loadSageAccounts: () => ({
    type: sageAccountActions.LOAD_SAGE_ACCOUNTS
  }),
  loadSageAccountsFulfilled: sageAccounts => ({
    type: sageAccountActions.LOAD_SAGE_ACCOUNTS_FULFILLED,
    payload: { sageAccounts }
  }),
  loadSageAccountsFailed: error => ({
    type: sageAccountActions.LOAD_SAGE_ACCOUNTS_FAILED,
    payload: { error }
  }),

  importSageAccounts: () => ({
    type: sageAccountActions.IMPORT_SAGE_ACCOUNTS
  }),
  importSageAccountsFulfilled: sageAccounts => ({
    type: sageAccountActions.IMPORT_SAGE_ACCOUNTS_FULFILLED,
    payload: { sageAccounts }
  }),
  importSageAccountsFailed: error => ({
    type: sageAccountActions.IMPORT_SAGE_ACCOUNTS_FAILED,
    payload: { error }
  })
};
