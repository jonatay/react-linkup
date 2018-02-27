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

  CostCentre_TOGGLE_SHOW_INACTIVE: 'FLEET_CostCentre_TOGGLE_SHOW_INACTIVE',

  LOAD_COST_CENTRE_GROUPS: 'FLEET_LOAD_COST_CENTRE_GROUPS',
  LOAD_COST_CENTRE_GROUPS_FULFILLED: 'FLEET_LOAD_COST_CENTRE_GROUPS_FULFILLED',
  LOAD_COST_CENTRE_GROUPS_FAILED: 'FLEET_LOAD_COST_CENTRE_GROUPS_FAILED',

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
  })
};
