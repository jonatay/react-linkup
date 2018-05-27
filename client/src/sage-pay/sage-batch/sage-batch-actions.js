export const sageBatchActions = {
  LOAD_SAGE_BATCHES: 'SAGE_PAY_LOAD_SAGE_BATCHES',
  LOAD_SAGE_BATCHES_FULFILLED: 'SAGE_PAY_LOAD_SAGE_BATCHES_FULFILLED',
  LOAD_SAGE_BATCHES_FAILED: 'SAGE_PAY_LOAD_SAGE_BATCHES_FAILED',

  CREATE_SAGE_BATCH: 'SAGE_PAY_CREATE_SAGE_BATCH',
  CREATE_SAGE_BATCH_FULFILLED: 'SAGE_PAY_CREATE_SAGE_BATCH_FULFILLED',
  CREATE_SAGE_BATCH_FAILED: 'SAGE_PAY_CREATE_SAGE_BATCH_FAILED',

  POST_SAGE_BATCH: 'SAGE_PAY_POST_SALARY_BATCH',
  POST_SAGE_BATCH_FULFILLED: 'SAGE_PAY_POST_SALARY_BATCH_FULFILLED',
  POST_SAGE_BATCH_FAILED: 'SAGE_PAY_POST_SALARY_BATCH_FAILED',

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
  createSageBatchFulfilled: sageBatches => ({
    type: sageBatchActions.CREATE_SAGE_BATCH_FULFILLED,
    payload: { sageBatches }
  }),
  createSageBatchFailed: error => ({
    type: sageBatchActions.CREATE_SAGE_BATCH_FAILED,
    payload: { error }
  }),
  postSageBatch: () => ({
    type: sageBatchActions.POST_SAGE_BATCH
  }),
  postSageBatchFulfilled: sageBatches => ({
    type: sageBatchActions.POST_SAGE_BATCH_FULFILLED,
    payload: { sageBatches }
  }),
  postSageBatchFailed: error => ({
    type: sageBatchActions.POST_SAGE_BATCH_FAILED,
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
