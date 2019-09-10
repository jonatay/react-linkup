export const soBankTransactionActions = {
  SET_FILTER_SO_BANK_TRANSACTION: "SAGE_ONESET_FILTER_SO_BANK_TRANSACTIONS",
  SET_PAGE_SO_BANK_TRANSACTION: "SAGE_ONESET_PAGE_SO_BANK_TRANSACTIONS",

  LOAD_SO_BANK_TRANSACTIONS: "SAGE_ONE_LOAD_SO_BANK_TRANSACTIONS",
  LOAD_SO_BANK_TRANSACTIONS_FULFILLED:
    "SAGE_ONE_LOAD_SO_BANK_TRANSACTIONS_FULFILLED",
  LOAD_SO_BANK_TRANSACTIONS_FAILED: "SAGE_ONE_LOAD_SO_BANK_TRANSACTIONS_FAILED",

  CREATE_SO_BANK_TRANSACTION: "SAGE_ONE_CREATE_SO_BANK_TRANSACTION",
  CREATE_SO_BANK_TRANSACTION_FAILED:
    "SAGE_ONE_CREATE_SO_BANK_TRANSACTION_FAILED",
  CREATE_SO_BANK_TRANSACTION_FULFILLED:
    "SAGE_ONE_CREATE_SO_BANK_TRANSACTION_FULFILLED",

  REMOVE_SO_BANK_TRANSACTION: "SAGE_ONE_REMOVE_SO_BANK_TRANSACTION",
  REMOVE_SO_BANK_TRANSACTION_FAILED:
    "SAGE_ONE_REMOVE_SO_BANK_TRANSACTION_FAILED",
  REMOVE_SO_BANK_TRANSACTION_FULFILLED:
    "SAGE_ONE_REMOVE_SO_BANK_TRANSACTION_FULFILLED",

  UPDATE_SO_BANK_TRANSACTION: "SAGE_ONE_UPDATE_SO_BANK_TRANSACTION",
  UPDATE_SO_BANK_TRANSACTION_FAILED:
    "SAGE_ONE_UPDATE_SO_BANK_TRANSACTION_FAILED",
  UPDATE_SO_BANK_TRANSACTION_FULFILLED:
    "SAGE_ONE_UPDATE_SO_BANK_TRANSACTION_FULFILLED",

  setFilterSoBankTransaction: filter => ({
    type: soBankTransactionActions.SET_FILTER_SO_BANK_TRANSACTION,
    payload: { filter }
  }),

  setSoBankTransactionPage: page => ({
    type: soBankTransactionActions.SET_PAGE_SO_BANK_TRANSACTION,
    payload: { page }
  }),

  loadSoBankTransactions: (filter, page) => ({
    type: soBankTransactionActions.LOAD_SO_BANK_TRANSACTIONS,
    payload: { filter, page }
  }),
  loadSoBankTransactionsFulfilled: soBankTransactions => ({
    type: soBankTransactionActions.LOAD_SO_BANK_TRANSACTIONS_FULFILLED,
    payload: { soBankTransactions }
  }),

  loadSoBankTransactionsFailed: error => ({
    type: soBankTransactionActions.LOAD_SO_BANK_TRANSACTIONS_FAILED,
    payload: { error }
  }),

  createSoBankTransaction: soBankTransaction => ({
    type: soBankTransactionActions.CREATE_SO_BANK_TRANSACTION,
    payload: { soBankTransaction }
  }),

  createSoBankTransactionFailed: error => ({
    type: soBankTransactionActions.CREATE_SO_BANK_TRANSACTION_FAILED,
    payload: { error }
  }),

  createSoBankTransactionFulfilled: soBankTransaction => ({
    type: soBankTransactionActions.CREATE_SO_BANK_TRANSACTION_FULFILLED,
    payload: { soBankTransaction }
  }),

  removeSoBankTransaction: soBankTransaction => ({
    type: soBankTransactionActions.REMOVE_SO_BANK_TRANSACTION,
    payload: { soBankTransaction }
  }),

  removeSoBankTransactionFailed: error => ({
    type: soBankTransactionActions.REMOVE_SO_BANK_TRANSACTION_FAILED,
    payload: { error }
  }),

  removeSoBankTransactionFulfilled: soBankTransaction => ({
    type: soBankTransactionActions.REMOVE_SO_BANK_TRANSACTION_FULFILLED,
    payload: { soBankTransaction }
  }),

  updateSoBankTransaction: (id, changes) => ({
    type: soBankTransactionActions.UPDATE_SO_BANK_TRANSACTION,
    payload: { id, changes }
  }),

  updateSoBankTransactionFailed: error => ({
    type: soBankTransactionActions.UPDATE_SO_BANK_TRANSACTION_FAILED,
    payload: { error }
  }),

  updateSoBankTransactionFulfilled: soBankTransaction => ({
    type: soBankTransactionActions.UPDATE_SO_BANK_TRANSACTION_FULFILLED,
    payload: { soBankTransaction }
  })
};
