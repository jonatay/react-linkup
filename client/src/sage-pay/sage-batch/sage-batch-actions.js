export const sageBatchActions = {
  LOAD_SAGE_BATCHES: 'SAGE_PAY_LOAD_SAGE_BATCHES',
  LOAD_SAGE_BATCHES_FULFILLED: 'SAGE_PAY_LOAD_SAGE_BATCHES_FULFILLED',
  LOAD_SAGE_BATCHES_FAILED: 'SAGE_PAY_LOAD_SAGE_BATCHES_FAILED',

  CREATE_SAGE_BATCH: 'SAGE_PAY_CREATE_SAGE_BATCH',
  CREATE_SAGE_BATCH_FULFILLED: 'SAGE_PAY_CREATE_SAGE_BATCH_FULFILLED',
  CREATE_SAGE_BATCH_FAILED: 'SAGE_PAY_CREATE_SAGE_BATCH_FAILED',

  DELETE_SAGE_BATCH: 'SAGE_PAY_DELETE_SAGE_BATCH',
  DELETE_SAGE_BATCH_FULFILLED: 'SAGE_PAY_DELETE_SAGE_BATCH_FULFILLED',
  DELETE_SAGE_BATCH_FAILED: 'SAGE_PAY_DELETE_SAGE_BATCH_FAILED',

  SUBMIT_SAGE_BATCH: 'SAGE_PAY_SUBMIT_SAGE_BATCH',
  SUBMIT_SAGE_BATCH_FULFILLED: 'SAGE_PAY_SUBMIT_SAGE_BATCH_FULFILLED',
  SUBMIT_SAGE_BATCH_FAILED: 'SAGE_PAY_SUBMIT_SAGE_BATCH_FAILED',

  QUERY_SAGE_BATCH: 'SAGE_PAY_QUERY_SAGE_BATCH',
  QUERY_SAGE_BATCH_FULFILLED: 'SAGE_PAY_QUERY_SAGE_BATCH_FULFILLED',
  QUERY_SAGE_BATCH_FAILED: 'SAGE_PAY_QUERY_SAGE_BATCH',

  loadSageBatches: () => ({
    type: sageBatchActions.LOAD_SAGE_BATCHES
  }),
  loadSageBatchesFulfilled: sageBatches => ({
    type: sageBatchActions.LOAD_SAGE_BATCHES_FULFILLED,
    payload: { sageBatches }
  }),
  loadSageBatchesFailed: error => ({
    type: sageBatchActions.LOAD_SAGE_BATCHES_FAILED,
    payload: { error }
  }),

  createSageBatch: params => ({
    type: sageBatchActions.CREATE_SAGE_BATCH,
    payload: { params }
  }),
  createSageBatchFulfilled: sageBatch => ({
    type: sageBatchActions.CREATE_SAGE_BATCH_FULFILLED,
    payload: { sageBatch }
  }),
  createSageBatchFailed: error => ({
    type: sageBatchActions.CREATE_SAGE_BATCH_FAILED,
    payload: { error }
  }),
  deleteSageBatch: id => ({
    type: sageBatchActions.DELETE_SAGE_BATCH,
    payload: { id }
  }),
  deleteSageBatchFulfilled: id => ({
    type: sageBatchActions.DELETE_SAGE_BATCH_FULFILLED,
    payload: { id }
  }),
  deleteSageBatchFailed: error => ({
    type: sageBatchActions.DELETE_SAGE_BATCH_FAILED,
    payload: { error }
  }),
  submitSageBatch: id => ({
    type: sageBatchActions.SUBMIT_SAGE_BATCH,
    payload: { id }
  }),
  sumbitSageBatchFulfilled: sageBatch => ({
    type: sageBatchActions.SUBMIT_SAGE_BATCH_FULFILLED,
    payload: { sageBatch }
  }),
  submitSageBatchFailed: error => ({
    type: sageBatchActions.SUBMIT_SAGE_BATCH_FAILED,
    payload: { error }
  }),

  querySageBatch: id => ({
    type: sageBatchActions.QUERY_SAGE_BATCH,
    payload: { id }
  }),
  querySageBatchFalied: error => ({
    type: sageBatchActions.QUERY_SAGE_BATCH_FAILED,
    payload: { error }
  }),
  querySageBatchFulfilled: sageBatch => ({
    type: sageBatchActions.QUERY_SAGE_BATCH_FULFILLED,
    payload: { sageBatch }
  })
};
