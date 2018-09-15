export const fimsPeriodActions = {
  LOAD_FIRMS_PERIODS: 'FLEET_LOAD_FIRMS_PERIODS',
  LOAD_FIRMS_PERIODS_FULFILLED: 'FLEET_LOAD_FIRMS_PERIODS_FULFILLED',
  LOAD_FIRMS_PERIODS_FAILED: 'FLEET_LOAD_FIRMS_PERIODS_FAILED',

  REMOVE_FIRMS_PERIOD: 'FLEET_REMOVE_FIRMS_PERIOD',
  REMOVE_FIRMS_PERIOD_FULFILLED: 'FLEET_REMOVE_FIRMS_PERIOD_FULFILLED',
  REMOVE_FIRMS_PERIOD_FAILED: 'FLEET_REMOVE_FIRMS_PERIOD_FAILED',

  IMPORT_FIMS_PERIOD_BATCH: 'FLEET_IMPORT_FIMS_PERIOD_BATCH',
  IMPORT_FIRMS_PERIOD: 'FLEET_IMPORT_FIRMS_PERIOD',
  IMPORT_FIRMS_PERIOD_FULFILLED: 'FLEET_IMPORT_FIRMS_PERIOD_FULFILLED',
  IMPORT_FIRMS_PERIOD_FAILED: 'FLEET_IMPORT_FIRMS_PERIOD_FAILED',

  POST_FIMS_BATCH: 'FLEET_POST_FIMS_BATCH',
  POST_FIMS_BATCH_FULFILLED: 'FLEET_POST_FIMS_BATCH_FULFILLED',
  POST_FIMS_BATCH_FAILED: 'FLEET_POST_FIMS_BATCH_FAILED',

  loadFimsPeriods: () => ({
    type: fimsPeriodActions.LOAD_FIRMS_PERIODS
  }),
  loadFimsPeriodsFulfilled: fimsPeriods => ({
    type: fimsPeriodActions.LOAD_FIRMS_PERIODS_FULFILLED,
    payload: { fimsPeriods }
  }),
  loadFimsPeriodsFailed: error => ({
    type: fimsPeriodActions.LOAD_FIRMS_PERIODS_FAILED,
    payload: { error }
  }),

  removeFimsPeriod: id => ({
    type: fimsPeriodActions.REMOVE_FIRMS_PERIOD,
    payload: { id }
  }),
  removeFimsPeriodFulfilled: id => ({
    type: fimsPeriodActions.REMOVE_FIRMS_PERIOD_FULFILLED,
    payload: id
  }),
  removeFimsPeriodFailed: error => ({
    type: fimsPeriodActions.REMOVE_FIRMS_PERIOD_FAILED,
    payload: { error }
  }),

  importFimsPeriodBatch: fimsPeriods => ({
    type: fimsPeriodActions.IMPORT_FIMS_PERIOD_BATCH,
    payload: { fimsPeriods }
  }),
  importFimsPeriod: id => ({
    type: fimsPeriodActions.IMPORT_FIRMS_PERIOD,
    payload: { id }
  }),
  importFimsPeriodFulfilled: fimsPeriod => ({
    type: fimsPeriodActions.IMPORT_FIRMS_PERIOD_FULFILLED,
    payload: { fimsPeriod }
  }),
  importFimsPeriodFailed: error => ({
    type: fimsPeriodActions.IMPORT_FIRMS_PERIOD_FAILED,
    payload: { error }
  }),

  postFimsBatch: fimsBatch => ({
    type: fimsPeriodActions.POST_FIMS_BATCH,
    payload: { fimsBatch }
  }),
  postFimsBatchFulfilled: fimsPeriod => ({
    type: fimsPeriodActions.POST_FIMS_BATCH_FULFILLED,
    payload: { fimsPeriod }
  }),
  postFimsBatchFailed: error => ({
    type: fimsPeriodActions.POST_FIMS_BATCH_FAILED,
    payload: { error }
  })
};
