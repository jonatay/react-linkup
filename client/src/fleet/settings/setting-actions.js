export const settingActions = {
  CREATE_COST_CENTRE: 'FLEET_CREATE_COST_CENTRE',
  CREATE_COST_CENTRE_FAILED: 'FLEET_CREATE_COST_CENTRE_FAILED',
  CREATE_COST_CENTRE_FULFILLED: 'FLEET_CREATE_COST_CENTRE_FULFILLED',

  REMOVE_COST_CENTRE: 'FLEET_REMOVE_COST_CENTRE',
  REMOVE_COST_CENTRE_FAILED: 'FLEET_REMOVE_COST_CENTRE_FAILED',
  REMOVE_COST_CENTRE_FULFILLED: 'FLEET_REMOVE_COST_CENTRE_FULFILLED',

  UPDATE_COST_CENTRE: 'FLEET_UPDATE_COST_CENTRE',
  UPDATE_COST_CENTRE_FAILED: 'FLEET_UPDATE_COST_CENTRE_FAILED',
  UPDATE_COST_CENTRE_FULFILLED: 'FLEET_UPDATE_COST_CENTRE_FULFILLED',

  LOAD_COST_CENTRES: 'FLEET_LOAD_COST_CENTRES',
  FILTER_COST_CENTRES: 'FLEET_FILTER_COST_CENTRES',
  LOAD_COST_CENTRES_FULFILLED: 'FLEET_LOAD_COST_CENTRES_FULFILLED',
  LOAD_COST_CENTRES_FAILED: 'FLEET_LOAD_COST_CENTRES_FAILED',

  LOAD_COST_CENTRE_GROUPS: 'FLEET_LOAD_COST_CENTRE_GROUPS',
  LOAD_COST_CENTRE_GROUPS_FULFILLED: 'FLEET_LOAD_COST_CENTRE_GROUPS_FULFILLED',
  LOAD_COST_CENTRE_GROUPS_FAILED: 'FLEET_LOAD_COST_CENTRE_GROUPS_FAILED',

  LOAD_TRANSACTION_TYPES: 'FLEET_LOAD_TRANSACTION_TYPES',
  LOAD_TRANSACTION_TYPES_FULFILLED: 'FLEET_LOAD_TRANSACTION_TYPES_FULFILLED',
  LOAD_TRANSACTION_TYPES_FAILED: 'FLEET_LOAD_TRANSACTION_TYPES_FAILED',

  LOAD_FIRMS_PERIODS: 'FLEET_LOAD_FIRMS_PERIODS',
  LOAD_FIRMS_PERIODS_FULFILLED: 'FLEET_LOAD_FIRMS_PERIODS_FULFILLED',
  LOAD_FIRMS_PERIODS_FAILED: 'FLEET_LOAD_FIRMS_PERIODS_FAILED',

  POST_FIMS_BATCH: 'FLEET_POST_FIMS_BATCH',
  POST_FIMS_BATCH_FULFILLED: 'FLEET_POST_FIMS_BATCH_FULFILLED',
  POST_FIMS_BATCH_FAILED: 'FLEET_POST_FIMS_BATCH_FAILED',

  loadCostCentres: () => ({
    type: settingActions.LOAD_COST_CENTRES
  }),

  createCostCentre: title => ({
    type: settingActions.CREATE_COST_CENTRE,
    payload: { costCentre: { title, completed: false } }
  }),

  createCostCentreFailed: error => ({
    type: settingActions.CREATE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  createCostCentreFulfilled: costCentre => ({
    type: settingActions.CREATE_COST_CENTRE_FULFILLED,
    payload: { costCentre }
  }),

  removeCostCentre: costCentre => ({
    type: settingActions.REMOVE_COST_CENTRE,
    payload: { costCentre }
  }),

  removeCostCentreFailed: error => ({
    type: settingActions.REMOVE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  removeCostCentreFulfilled: costCentre => ({
    type: settingActions.REMOVE_COST_CENTRE_FULFILLED,
    payload: { costCentre }
  }),

  updateCostCentre: (costCentre, changes) => ({
    type: settingActions.UPDATE_COST_CENTRE,
    payload: { costCentre, changes }
  }),

  updateCostCentreFailed: error => ({
    type: settingActions.UPDATE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  updateCostCentreFulfilled: costCentre => ({
    type: settingActions.UPDATE_COST_CENTRE_FULFILLED,
    payload: { costCentre }
  }),

  filterCostCentres: filter => ({
    type: settingActions.FILTER_COST_CENTRES,
    payload: { filter }
  }),

  loadCostCentresFulfilled: costCentres => ({
    type: settingActions.LOAD_COST_CENTRES_FULFILLED,
    payload: { costCentres }
  }),

  loadCostCentresFailed: error => ({
    type: settingActions.LOAD_COST_CENTRES_FAILED,
    payload: { error }
  }),

  loadCostCentreGroups: () => ({
    type: settingActions.LOAD_COST_CENTRE_GROUPS
  }),
  loadCostCentreGroupsFulfilled: costCentreGroups => ({
    type: settingActions.LOAD_COST_CENTRE_GROUPS_FULFILLED,
    payload: { costCentreGroups }
  }),

  loadCostCentreGroupsFailed: error => ({
    type: settingActions.LOAD_COST_CENTRE_GROUPS_FAILED,
    payload: { error }
  }),

  loadTransactionTypes: () => ({
    type: settingActions.LOAD_TRANSACTION_TYPES
  }),
  loadTransactionTypesFulfilled: transactionTypes => ({
    type: settingActions.LOAD_TRANSACTION_TYPES_FULFILLED,
    payload: { transactionTypes }
  }),

  loadTransactionTypesFailed: error => ({
    type: settingActions.LOAD_TRANSACTION_TYPES_FAILED,
    payload: { error }
  }),

  loadFimsPeriods: () => ({
    type: settingActions.LOAD_FIRMS_PERIODS
  }),
  loadFimsPeriodsFulfilled: fimsPeriods => ({
    type: settingActions.LOAD_FIRMS_PERIODS_FULFILLED,
    payload: { fimsPeriods }
  }),
  loadFimsPeriodsFailed: error => ({
    type: settingActions.LOAD_FIRMS_PERIODS_FAILED,
    payload: { error }
  }),

  postFimsBatch: fimsBatch => ({
    type: settingActions.POST_FIMS_BATCH,
    payload: { fimsBatch }
  }),
  postFimsBatchFulfilled: fimsPeriod => ({
    type: settingActions.POST_FIMS_BATCH_FULFILLED,
    payload: { fimsPeriod }
  }),
  postFimsBatchFailed: error => ({
    type: settingActions.POST_FIMS_BATCH_FAILED,
    payload: { error }
  })
};
