export const sageAccountActions = {
  LOAD_SAGE_ACCOUNTS: 'SAGE_PAY_LOAD_SAGE_ACCOUNTS',
  LOAD_SAGE_EMP_ACCOUNTS: 'SAGE_PAY_LOAD_SAGE_EMP_ACCOUNTS',
  LOAD_SAGE_ACCOUNTS_FULFILLED: 'SAGE_PAY_LOAD_SAGE_ACCOUNTS_FULFILLED',
  LOAD_SAGE_ACCOUNTS_FAILED: 'SAGE_PAY_LOAD_SAGE_ACCOUNTS_FAILED',

  UPDATE_SAGE_ACCOUNT: 'SAGE_PAY_UPDATE_SAGE_ACCOUNT',
  UPDATE_SAGE_ACCOUNT_FULFILLED: 'SAGE_PAY_UPDATE_SAGE_ACCOUNT_FULFILLED',
  UPDATE_SAGE_ACCOUNT_FAILED: 'SAGE_PAY_UPDATE_SAGE_ACCOUNT_FAILED',

  IMPORT_BEST_ACCOUNTS: 'SAGE_PAY_IMPORT_BEST_ACCOUNTS',
  IMPORT_BEST_ACCOUNTS_FULFILLED: 'SAGE_PAY_IMPORT_BEST_ACCOUNTS_FULFILLED',
  IMPORT_BEST_ACCOUNTS_FAILED: 'SAGE_PAY_IMPORT_BEST_ACCOUNTS_FAILED',

  IMPORT_CUBIT_ACCOUNTS: 'SAGE_PAY_IMPORT_CUBIT_ACCOUNTS',
  IMPORT_CUBIT_ACCOUNTS_FULFILLED: 'SAGE_PAY_IMPORT_CUBIT_ACCOUNTS_FULFILLED',
  IMPORT_CUBIT_ACCOUNTS_FAILED: 'SAGE_PAY_IMPORT_CUBIT_ACCOUNTS_FAILED',

  VALIDATE_SAGE_ACCOUNT: 'SAGE_PAY_VALIDATE_SAGE_ACCOUNT',
  VALIDATE_SAGE_ACCOUNT_FULFILLED: 'SAGE_PAY_VALIDATE_SAGE_ACCOUNT_FULFILLED',
  VALIDATE_SAGE_ACCOUNT_FAILED: 'SAGE_PAY_VALIDATE_SAGE_ACCOUNT',

  loadSageAccounts: () => ({
    type: sageAccountActions.LOAD_SAGE_ACCOUNTS
  }),
  loadSageEmpAccounts: () => ({
    type: sageAccountActions.LOAD_SAGE_EMP_ACCOUNTS
  }),
  loadSageAccountsFulfilled: sageAccounts => ({
    type: sageAccountActions.LOAD_SAGE_ACCOUNTS_FULFILLED,
    payload: { sageAccounts }
  }),
  loadSageAccountsFailed: error => ({
    type: sageAccountActions.LOAD_SAGE_ACCOUNTS_FAILED,
    payload: { error }
  }),

  updateSageAccount: sageAccount => ({
    type: sageAccountActions.UPDATE_SAGE_ACCOUNT,
    payload: { sageAccount }
  }),
  updateSageAccountFulfilled: sageAccount => ({
    type: sageAccountActions.UPDATE_SAGE_ACCOUNT_FULFILLED,
    payload: { sageAccount }
  }),
  updateSageAccountFailed: error => ({
    type: sageAccountActions.UPDATE_SAGE_ACCOUNT_FAILED,
    payload: { error }
  }),

  importBestAccounts: bestCreditors => ({
    type: sageAccountActions.IMPORT_BEST_ACCOUNTS,
    payload: { bestCreditors }
  }),
  importBestAccountsFulfilled: sageAccounts => ({
    type: sageAccountActions.IMPORT_BEST_ACCOUNTS_FULFILLED,
    payload: { sageAccounts }
  }),
  importBestAccountsFailed: error => ({
    type: sageAccountActions.IMPORT_BEST_ACCOUNTS_FAILED,
    payload: { error }
  }),
  importCubitAccounts: () => ({
    type: sageAccountActions.IMPORT_CUBIT_ACCOUNTS
  }),
  importCubitAccountsFulfilled: sageAccounts => ({
    type: sageAccountActions.IMPORT_CUBIT_ACCOUNTS_FULFILLED,
    payload: { sageAccounts }
  }),
  importCubitAccountsFailed: error => ({
    type: sageAccountActions.IMPORT_CUBIT_ACCOUNTS_FAILED,
    payload: { error }
  }),

  validateSageAccount: id => ({
    type: sageAccountActions.VALIDATE_SAGE_ACCOUNT,
    payload: { id }
  }),
  validateSageAccountFalied: error => ({
    type: sageAccountActions.VALIDATE_SAGE_ACCOUNT_FAILED,
    payload: { error }
  }),
  validateSageAccountFulfilled: (sageAccount, validationResult) => ({
    type: sageAccountActions.VALIDATE_SAGE_ACCOUNT_FULFILLED,
    payload: { sageAccount, validationResult }
  })
};
