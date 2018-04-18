export const fleetTransactionActions = {
  CREATE_FLEET_TRANSACTION: 'CREATE_FLEET_TRANSACTION',
  CREATE_FLEET_TRANSACTION_FAILED: 'CREATE_FLEET_TRANSACTION_FAILED',
  CREATE_FLEET_TRANSACTION_FULFILLED: 'CREATE_FLEET_TRANSACTION_FULFILLED',

  TOGGLE_FLEET_TRANSACTION_IS_ACTIVE: 'TOGGLE_FLEET_TRANSACTION_IS_ACTIVE',
  TOGGLE_FLEET_TRANSACTION_IS_ACTIVE_FAILED:
    'TOGGLE_FLEET_TRANSACTION_IS_ACTIVE_FAILED',
  TOGGLE_FLEET_TRANSACTION_IS_ACTIVE_FULFILLED:
    'TOGGLE_FLEET_TRANSACTION_IS_ACTIVE_FULFILLED',

  UPDATE_FLEET_TRANSACTION: 'UPDATE_FLEET_TRANSACTION',
  UPDATE_FLEET_TRANSACTION_FAILED: 'UPDATE_FLEET_TRANSACTION_FAILED',
  UPDATE_FLEET_TRANSACTION_FULFILLED: 'UPDATE_FLEET_TRANSACTION_FULFILLED',

  LOAD_FLEET_TRANSACTIONS: 'LOAD_FLEET_TRANSACTIONS',
  FILTER_FLEET_TRANSACTIONS: 'FILTER_FLEET_TRANSACTIONS',
  LOAD_FLEET_TRANSACTIONS_FULFILLED: 'LOAD_FLEET_TRANSACTIONS_FULFILLED',
  LOAD_FLEET_TRANSACTIONS_FAILED: 'LOAD_FLEET_TRANSACTIONS_FAILED',

  FLEET_TRANSACTION_TOGGLE_SHOW_INACTIVE:
    'FLEET_TRANSACTION_TOGGLE_SHOW_INACTIVE',

  loadFleetTransactions: listParams => ({
    type: fleetTransactionActions.LOAD_FLEET_TRANSACTIONS,
    payload: { listParams }
  }),

  createFleetTransaction: title => ({
    type: fleetTransactionActions.CREATE_FLEET_TRANSACTION,
    payload: { fleetTransaction: { title, completed: false } }
  }),

  createFleetTransactionFailed: error => ({
    type: fleetTransactionActions.CREATE_FLEET_TRANSACTION_FAILED,
    payload: { error }
  }),

  createFleetTransactionFulfilled: fleetTransaction => ({
    type: fleetTransactionActions.CREATE_FLEET_TRANSACTION_FULFILLED,
    payload: { fleetTransaction }
  }),

  toggleFleetTransactionIsActive: fleetTransaction => ({
    type: fleetTransactionActions.TOGGLE_FLEET_TRANSACTION_IS_ACTIVE,
    payload: { fleetTransaction }
  }),

  toggleFleetTransactionIsActiveFailed: error => ({
    type: fleetTransactionActions.TOGGLE_FLEET_TRANSACTION_IS_ACTIVE_FAILED,
    payload: { error }
  }),

  toggleFleetTransactionIsActiveFulfilled: fleetTransaction => ({
    type: fleetTransactionActions.TOGGLE_FLEET_TRANSACTION_IS_ACTIVE_FULFILLED,
    payload: { fleetTransaction }
  }),

  updateFleetTransaction: (fleetTransaction, changes) => ({
    type: fleetTransactionActions.UPDATE_FLEET_TRANSACTION,
    payload: { fleetTransaction, changes }
  }),

  updateFleetTransactionFailed: error => ({
    type: fleetTransactionActions.UPDATE_FLEET_TRANSACTION_FAILED,
    payload: { error }
  }),

  updateFleetTransactionFulfilled: fleetTransaction => ({
    type: fleetTransactionActions.UPDATE_FLEET_TRANSACTION_FULFILLED,
    payload: { fleetTransaction }
  }),

  filterFleetTransactions: ({ page, pageSize, sorted, filtered }) => ({
    type: fleetTransactionActions.FILTER_FLEET_TRANSACTIONS,
    payload: { page, pageSize, sorted, filtered }
  }),

  loadFleetTransactionsFulfilled: fleetTransactions => ({
    type: fleetTransactionActions.LOAD_FLEET_TRANSACTIONS_FULFILLED,
    payload: { fleetTransactions }
  }),

  loadFleetTransactionsFailed: error => ({
    type: fleetTransactionActions.LOAD_FLEET_TRANSACTIONS_FAILED,
    payload: { error }
  }),

  fleetTransactionToggleShowInactive: () => ({
    type: fleetTransactionActions.FLEET_TRANSACTION_TOGGLE_SHOW_INACTIVE,
    payload: {}
  })
};
