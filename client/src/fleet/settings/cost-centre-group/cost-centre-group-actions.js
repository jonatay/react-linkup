export const costCentreGroupActions = {
  LOAD_COST_CENTRE_GROUPS: 'FLEET_LOAD_COST_CENTRE_GROUPS',
  LOAD_COST_CENTRE_GROUPS_FULFILLED: 'FLEET_LOAD_COST_CENTRE_GROUPS_FULFILLED',
  LOAD_COST_CENTRE_GROUPS_FAILED: 'FLEET_LOAD_COST_CENTRE_GROUPS_FAILED',

  CREATE_COST_CENTRE_GROUP: 'FLEET_CREATE_COST_CENTRE_GROUP',
  CREATE_COST_CENTRE_GROUP_FAILED: 'FLEET_CREATE_COST_CENTRE_GROUP_FAILED',
  CREATE_COST_CENTRE_GROUP_FULFILLED:
    'FLEET_CREATE_COST_CENTRE_GROUP_FULFILLED',

  REMOVE_COST_CENTRE_GROUP: 'FLEET_REMOVE_COST_CENTRE_GROUP',
  REMOVE_COST_CENTRE_GROUP_FAILED: 'FLEET_REMOVE_COST_CENTRE_GROUP_FAILED',
  REMOVE_COST_CENTRE_GROUP_FULFILLED:
    'FLEET_REMOVE_COST_CENTRE_GROUP_FULFILLED',

  UPDATE_COST_CENTRE_GROUP: 'FLEET_UPDATE_COST_CENTRE_GROUP',
  UPDATE_COST_CENTRE_GROUP_FAILED: 'FLEET_UPDATE_COST_CENTRE_GROUP_FAILED',
  UPDATE_COST_CENTRE_GROUP_FULFILLED:
    'FLEET_UPDATE_COST_CENTRE_GROUP_FULFILLED',

  loadCostCentreGroups: () => ({
    type: costCentreGroupActions.LOAD_COST_CENTRE_GROUPS
  }),
  loadCostCentreGroupsFulfilled: costCentreGroups => ({
    type: costCentreGroupActions.LOAD_COST_CENTRE_GROUPS_FULFILLED,
    payload: { costCentreGroups }
  }),

  loadCostCentreGroupsFailed: error => ({
    type: costCentreGroupActions.LOAD_COST_CENTRE_GROUPS_FAILED,
    payload: { error }
  }),

  createCostCentreGroup: costCentreGroup => ({
    type: costCentreGroupActions.CREATE_COST_CENTRE_GROUP,
    payload: { costCentreGroup }
  }),

  createCostCentreGroupFailed: error => ({
    type: costCentreGroupActions.CREATE_COST_CENTRE_GROUP_FAILED,
    payload: { error }
  }),

  createCostCentreGroupFulfilled: costCentreGroup => ({
    type: costCentreGroupActions.CREATE_COST_CENTRE_GROUP_FULFILLED,
    payload: { costCentreGroup }
  }),

  removeCostCentreGroup: costCentreGroup => ({
    type: costCentreGroupActions.REMOVE_COST_CENTRE_GROUP,
    payload: { costCentreGroup }
  }),

  removeCostCentreGroupFailed: error => ({
    type: costCentreGroupActions.REMOVE_COST_CENTRE_GROUP_FAILED,
    payload: { error }
  }),

  removeCostCentreGroupFulfilled: costCentreGroup => ({
    type: costCentreGroupActions.REMOVE_COST_CENTRE_GROUP_FULFILLED,
    payload: { costCentreGroup }
  }),

  updateCostCentreGroup: (id, changes) => ({
    type: costCentreGroupActions.UPDATE_COST_CENTRE_GROUP,
    payload: { id, changes }
  }),

  updateCostCentreGroupFailed: error => ({
    type: costCentreGroupActions.UPDATE_COST_CENTRE_GROUP_FAILED,
    payload: { error }
  }),

  updateCostCentreGroupFulfilled: costCentreGroup => ({
    type: costCentreGroupActions.UPDATE_COST_CENTRE_GROUP_FULFILLED,
    payload: { costCentreGroup }
  })
};
