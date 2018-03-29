export const vehicleCcgActions = {
  CREATE_VEHICLE_CCG: 'CREATE_VEHICLE_CCG',
  CREATE_VEHICLE_CCG_FAILED: 'CREATE_VEHICLE_CCG_FAILED',
  CREATE_VEHICLE_CCG_FULFILLED: 'CREATE_VEHICLE_CCG_FULFILLED',

  REMOVE_VEHICLE_CCG: 'REMOVE_VEHICLE_CCG',
  REMOVE_VEHICLE_CCG_FAILED: 'REMOVE_VEHICLE_CCG_FAILED',
  REMOVE_VEHICLE_CCG_FULFILLED: 'REMOVE_VEHICLE_CCG_FULFILLED',

  UPDATE_VEHICLE_CCG_ARRAY: 'UPDATE_VEHICLE_CCG_ARRAY',
  UPDATE_VEHICLE_CCG: 'UPDATE_VEHICLE_CCG',
  UPDATE_VEHICLE_CCG_FAILED: 'UPDATE_VEHICLE_CCG_FAILED',
  UPDATE_VEHICLE_CCG_FULFILLED: 'UPDATE_VEHICLE_CCG_FULFILLED',

  LOAD_VEHICLE_CCGS: 'LOAD_VEHICLE_CCGS',
  FILTER_VEHICLE_CCGS: 'FILTER_VEHICLE_CCGS',
  LOAD_VEHICLE_CCGS_FULFILLED: 'LOAD_VEHICLE_CCGS_FULFILLED',
  LOAD_VEHICLE_CCGS_FAILED: 'LOAD_VEHICLE_CCGS_FAILED',

  loadVehicleCcgs: () => ({
    type: vehicleCcgActions.LOAD_VEHICLE_CCGS
  }),

  createVehicleCcg: vehicleCcg => ({
    type: vehicleCcgActions.CREATE_VEHICLE_CCG,
    payload: { vehicleCcg }
  }),

  createVehicleCcgFailed: error => ({
    type: vehicleCcgActions.CREATE_VEHICLE_CCG_FAILED,
    payload: { error }
  }),

  createVehicleCcgFulfilled: vehicleCcg => ({
    type: vehicleCcgActions.CREATE_VEHICLE_CCG_FULFILLED,
    payload: { vehicleCcg }
  }),

  removeVehicleCcg: vehicleCcg => ({
    type: vehicleCcgActions.REMOVE_VEHICLE_CCG,
    payload: { vehicleCcg }
  }),

  removeVehicleCcgFailed: error => ({
    type: vehicleCcgActions.REMOVE_VEHICLE_CCG_FAILED,
    payload: { error }
  }),

  removeVehicleCcgFulfilled: id => ({
    type: vehicleCcgActions.REMOVE_VEHICLE_CCG_FULFILLED,
    payload: { id }
  }),

  updateVehicleCcgArray: (vehicleCcgs, changes) => ({
    type: vehicleCcgActions.UPDATE_VEHICLE_CCG_ARRAY,
    payload: { vehicleCcgs, changes }
  }),

  updateVehicleCcg: vehicleCcg => ({
    type: vehicleCcgActions.UPDATE_VEHICLE_CCG,
    payload: { vehicleCcg }
  }),

  updateVehicleCcgFailed: error => ({
    type: vehicleCcgActions.UPDATE_VEHICLE_CCG_FAILED,
    payload: { error }
  }),

  updateVehicleCcgFulfilled: vehicleCcg => ({
    type: vehicleCcgActions.UPDATE_VEHICLE_CCG_FULFILLED,
    payload: { vehicleCcg }
  }),

  filterVehicleCcgs: filterType => ({
    type: vehicleCcgActions.FILTER_VEHICLE_CCGS,
    payload: { filterType }
  }),

  loadVehicleCcgsFulfilled: vehicleCcgs => ({
    type: vehicleCcgActions.LOAD_VEHICLE_CCGS_FULFILLED,
    payload: { vehicleCcgs }
  }),

  loadVehicleCcgsFailed: error => ({
    type: vehicleCcgActions.LOAD_VEHICLE_CCGS_FAILED,
    payload: { error }
  })
};
