export const transactionTypeActions = {
  LOAD_TRANSACTION_TYPES: 'FLEET_LOAD_TRANSACTION_TYPES',
  LOAD_TRANSACTION_TYPES_FULFILLED: 'FLEET_LOAD_TRANSACTION_TYPES_FULFILLED',
  LOAD_TRANSACTION_TYPES_FAILED: 'FLEET_LOAD_TRANSACTION_TYPES_FAILED',

  loadTransactionTypes: () => ({
    type: transactionTypeActions.LOAD_TRANSACTION_TYPES
  }),
  loadTransactionTypesFulfilled: transactionTypes => ({
    type: transactionTypeActions.LOAD_TRANSACTION_TYPES_FULFILLED,
    payload: { transactionTypes }
  }),

  loadTransactionTypesFailed: error => ({
    type: transactionTypeActions.LOAD_TRANSACTION_TYPES_FAILED,
    payload: { error }
  })
};
