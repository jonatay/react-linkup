export const tranTypeCcActions = {
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

  loadTranTypeCcs: () => ({
    type: tranTypeCcActions.LOAD_TRANSACTION_TYPE_COST_CENTRES
  }),
  loadTranTypeCcsFulfilled: tranTypeCcs => ({
    type: tranTypeCcActions.LOAD_TRANSACTION_TYPE_COST_CENTRES_FULFILLED,
    payload: { tranTypeCcs }
  }),

  loadTranTypeCcsFailed: error => ({
    type: tranTypeCcActions.LOAD_TRANSACTION_TYPE_COST_CENTRES_FAILED,
    payload: { error }
  }),

  createTranTypeCc: tranTypeCc => ({
    type: tranTypeCcActions.CREATE_TRANSACTION_TYPE_COST_CENTRE,
    payload: { tranTypeCc }
  }),

  createTranTypeCcFailed: error => ({
    type: tranTypeCcActions.CREATE_TRANSACTION_TYPE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  createTranTypeCcFulfilled: tranTypeCc => ({
    type: tranTypeCcActions.CREATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED,
    payload: { tranTypeCc }
  }),

  removeTranTypeCc: tranTypeCc => ({
    type: tranTypeCcActions.REMOVE_TRANSACTION_TYPE_COST_CENTRE,
    payload: { tranTypeCc }
  }),

  removeTranTypeCcFailed: error => ({
    type: tranTypeCcActions.REMOVE_TRANSACTION_TYPE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  removeTranTypeCcFulfilled: tranTypeCc => ({
    type: tranTypeCcActions.REMOVE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED,
    payload: { tranTypeCc }
  }),

  updateTranTypeCcBatch: (tranTypeCcs, changes) => ({
    type: tranTypeCcActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE_BATCH,
    payload: { tranTypeCcs, changes }
  }),

  updateTranTypeCc: (id, changes) => ({
    type: tranTypeCcActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE,
    payload: { id, changes }
  }),

  updateTranTypeCcFailed: error => ({
    type: tranTypeCcActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  updateTranTypeCcFulfilled: tranTypeCc => ({
    type: tranTypeCcActions.UPDATE_TRANSACTION_TYPE_COST_CENTRE_FULFILLED,
    payload: { tranTypeCc }
  })
};
