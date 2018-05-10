export const transactionTypeCostCentreActions = {
  LOAD_TRANSACTION_TYPE_COST_CENTRES:
    'FLEET_LOAD_TRANSACTION_TYPE_COST_CENTRES',
  LOAD_TRANSACTION_TYPE_COST_CENTRES_FULFILLED:
    'FLEET_LOAD_TRANSACTION_TYPE_COST_CENTRES_FULFILLED',
  LOAD_TRANSACTION_TYPE_COST_CENTRES_FAILED:
    'FLEET_LOAD_TRANSACTION_TYPE_COST_CENTRES_FAILED',

  CREATE_TRANSACTION_TYPE_COST_CENTRE:
    'FLEET_CREATE_TRANSACTION_TYPE_COST_CENTRE',
  CREATE_TRANSACTION_TYPE_COST_CENTRE_FAILED:
    'FLEET_CREATE_TRANSACTION_TYPE_COST_CENTRE_FAILED',
  CREATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED:
    'FLEET_CREATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED',

  REMOVE_TRANSACTION_TYPE_COST_CENTRE:
    'FLEET_REMOVE_TRANSACTION_TYPE_COST_CENTRE',
  REMOVE_TRANSACTION_TYPE_COST_CENTRE_FAILED:
    'FLEET_REMOVE_TRANSACTION_TYPE_COST_CENTRE_FAILED',
  REMOVE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED:
    'FLEET_REMOVE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED',

  UPDATE_TRANSACTION_TYPE_COST_CENTRE_BATCH:
    'FLEET_UPDATE_TRANSACTION_TYPE_COST_CENTRE_BATCH',
  UPDATE_TRANSACTION_TYPE_COST_CENTRE:
    'FLEET_UPDATE_TRANSACTION_TYPE_COST_CENTRE',
  UPDATE_TRANSACTION_TYPE_COST_CENTRE_FAILED:
    'FLEET_UPDATE_TRANSACTION_TYPE_COST_CENTRE_FAILED',
  UPDATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED:
    'FLEET_UPDATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED',

  loadTransactionTypeCostCentres: () => ({
    type: transactionTypeCostCentreActions.LOAD_TRANSACTION_TYPE_COST_CENTRES
  }),
  loadTransactionTypeCostCentresFulfilled: transactionTypeCostCentres => ({
    type:
      transactionTypeCostCentreActions.LOAD_TRANSACTION_TYPE_COST_CENTRES_FULFILLED,
    payload: { transactionTypeCostCentres }
  }),

  loadTransactionTypeCostCentresFailed: error => ({
    type:
      transactionTypeCostCentreActions.LOAD_TRANSACTION_TYPE_COST_CENTRES_FAILED,
    payload: { error }
  }),

  createTransactionTypeCostCentre: transactionTypeCostCentre => ({
    type: transactionTypeCostCentreActions.CREATE_TRANSACTION_TYPE_COST_CENTRE,
    payload: { transactionTypeCostCentre }
  }),

  createTransactionTypeCostCentreFailed: error => ({
    type:
      transactionTypeCostCentreActions.CREATE_TRANSACTION_TYPE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  createTransactionTypeCostCentreFulfilled: transactionTypeCostCentre => ({
    type:
      transactionTypeCostCentreActions.CREATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED,
    payload: { transactionTypeCostCentre }
  }),

  removeTransactionTypeCostCentre: transactionTypeCostCentre => ({
    type: transactionTypeCostCentreActions.REMOVE_TRANSACTION_TYPE_COST_CENTRE,
    payload: { transactionTypeCostCentre }
  }),

  removeTransactionTypeCostCentreFailed: error => ({
    type:
      transactionTypeCostCentreActions.REMOVE_TRANSACTION_TYPE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  removeTransactionTypeCostCentreFulfilled: transactionTypeCostCentre => ({
    type:
      transactionTypeCostCentreActions.REMOVE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED,
    payload: { transactionTypeCostCentre }
  }),

  updateTransactionTypeCostCentreActionsArray: (
    transactionTypeCostCentres,
    changes
  ) => ({
    type: transactionTypeCostCentres.UPDATE_TRANSACTION_TYPE_COST_CENTRE_BATCH,
    payload: { transactionTypeCostCentres, changes }
  }),

  updateTransactionTypeCostCentre: (id, changes) => ({
    type: transactionTypeCostCentreActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE,
    payload: { id, changes }
  }),

  updateTransactionTypeCostCentreFailed: error => ({
    type:
      transactionTypeCostCentreActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  updateTransactionTypeCostCentreFulfilled: transactionTypeCostCentre => ({
    type:
      transactionTypeCostCentreActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED,
    payload: { transactionTypeCostCentre }
  })
};
