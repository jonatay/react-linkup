export const costCentreActions = {
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

  loadCostCentres: () => ({
    type: costCentreActions.LOAD_COST_CENTRES
  }),

  createCostCentre: costCentre => ({
    type: costCentreActions.CREATE_COST_CENTRE,
    payload: { costCentre }
  }),

  createCostCentreFailed: error => ({
    type: costCentreActions.CREATE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  createCostCentreFulfilled: costCentre => ({
    type: costCentreActions.CREATE_COST_CENTRE_FULFILLED,
    payload: { costCentre }
  }),

  removeCostCentre: id => ({
    type: costCentreActions.REMOVE_COST_CENTRE,
    payload: { id }
  }),

  removeCostCentreFailed: error => ({
    type: costCentreActions.REMOVE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  removeCostCentreFulfilled: id => ({
    type: costCentreActions.REMOVE_COST_CENTRE_FULFILLED,
    payload: { id }
  }),

  updateCostCentre: (costCentre, changes) => ({
    type: costCentreActions.UPDATE_COST_CENTRE,
    payload: { costCentre, changes }
  }),

  updateCostCentreFailed: error => ({
    type: costCentreActions.UPDATE_COST_CENTRE_FAILED,
    payload: { error }
  }),

  updateCostCentreFulfilled: costCentre => ({
    type: costCentreActions.UPDATE_COST_CENTRE_FULFILLED,
    payload: { costCentre }
  }),

  filterCostCentres: filter => ({
    type: costCentreActions.FILTER_COST_CENTRES,
    payload: { filter }
  }),

  loadCostCentresFulfilled: costCentres => ({
    type: costCentreActions.LOAD_COST_CENTRES_FULFILLED,
    payload: { costCentres }
  }),

  loadCostCentresFailed: error => ({
    type: costCentreActions.LOAD_COST_CENTRES_FAILED,
    payload: { error }
  })
};
