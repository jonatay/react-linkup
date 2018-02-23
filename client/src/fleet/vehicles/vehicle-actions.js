export const vehicleActions = {
  CREATE_VEHICLE: 'CREATE_VEHICLE',
  CREATE_VEHICLE_FAILED: 'CREATE_VEHICLE_FAILED',
  CREATE_VEHICLE_FULFILLED: 'CREATE_VEHICLE_FULFILLED',

  TOGGLE_VEHICLE_IS_ACTIVE: 'TOGGLE_VEHICLE_IS_ACTIVE',
  TOGGLE_VEHICLE_IS_ACTIVE_FAILED: 'TOGGLE_VEHICLE_IS_ACTIVE_FAILED',
  TOGGLE_VEHICLE_IS_ACTIVE_FULFILLED: 'TOGGLE_VEHICLE_IS_ACTIVE_FULFILLED',

  UPDATE_VEHICLE: 'UPDATE_VEHICLE',
  UPDATE_VEHICLE_FAILED: 'UPDATE_VEHICLE_FAILED',
  UPDATE_VEHICLE_FULFILLED: 'UPDATE_VEHICLE_FULFILLED',

  LOAD_VEHICLES: 'LOAD_VEHICLES',
  FILTER_VEHICLES: 'FILTER_VEHICLES',
  LOAD_VEHICLES_FULFILLED: 'LOAD_VEHICLES_FULFILLED',
  LOAD_VEHICLES_FAILED: 'LOAD_VEHICLES_FAILED',

  VEHICLE_TOGGLE_SHOW_INACTIVE: 'VEHICLE_TOGGLE_SHOW_INACTIVE',

  loadVehicles: () => ({
    type: vehicleActions.LOAD_VEHICLES
  }),

  createVehicle: title => ({
    type: vehicleActions.CREATE_VEHICLE,
    payload: { vehicle: { title, completed: false } }
  }),

  createVehicleFailed: error => ({
    type: vehicleActions.CREATE_VEHICLE_FAILED,
    payload: { error }
  }),

  createVehicleFulfilled: vehicle => ({
    type: vehicleActions.CREATE_VEHICLE_FULFILLED,
    payload: { vehicle }
  }),

  toggleVehicleIsActive: vehicle => ({
    type: vehicleActions.TOGGLE_VEHICLE_IS_ACTIVE,
    payload: { vehicle }
  }),

  toggleVehicleIsActiveFailed: error => ({
    type: vehicleActions.TOGGLE_VEHICLE_IS_ACTIVE_FAILED,
    payload: { error }
  }),

  toggleVehicleIsActiveFulfilled: vehicle => ({
    type: vehicleActions.TOGGLE_VEHICLE_IS_ACTIVE_FULFILLED,
    payload: { vehicle }
  }),

  updateVehicle: (vehicle, changes) => ({
    type: vehicleActions.UPDATE_VEHICLE,
    payload: { vehicle, changes }
  }),

  updateVehicleFailed: error => ({
    type: vehicleActions.UPDATE_VEHICLE_FAILED,
    payload: { error }
  }),

  updateVehicleFulfilled: vehicle => ({
    type: vehicleActions.UPDATE_VEHICLE_FULFILLED,
    payload: { vehicle }
  }),

  filterVehicles: filter => ({
    type: vehicleActions.FILTER_VEHICLES,
    payload: { filter }
  }),

  loadVehiclesFulfilled: vehicles => ({
    type: vehicleActions.LOAD_VEHICLES_FULFILLED,
    payload: { vehicles }
  }),

  loadVehiclesFailed: error => ({
    type: vehicleActions.LOAD_VEHICLES_FAILED,
    payload: { error }
  }),

  vehicleToggleShowInactive: () => ({
    type: vehicleActions.VEHICLE_TOGGLE_SHOW_INACTIVE,
    payload: {}
  })
};
