export const vehicleActions = {
  CREATE_VEHICLE: 'CREATE_VEHICLE',
  CREATE_VEHICLE_FAILED: 'CREATE_VEHICLE_FAILED',
  CREATE_VEHICLE_FULFILLED: 'CREATE_VEHICLE_FULFILLED',

  REMOVE_VEHICLE: 'REMOVE_VEHICLE',
  REMOVE_VEHICLE_FAILED: 'REMOVE_VEHICLE_FAILED',
  REMOVE_VEHICLE_FULFILLED: 'REMOVE_VEHICLE_FULFILLED',

  UPDATE_VEHICLE: 'UPDATE_VEHICLE',
  UPDATE_VEHICLE_FAILED: 'UPDATE_VEHICLE_FAILED',
  UPDATE_VEHICLE_FULFILLED: 'UPDATE_VEHICLE_FULFILLED',

  LOAD_VEHICLES: 'LOAD_VEHICLES',
  FILTER_VEHICLES: 'FILTER_VEHICLES',
  LOAD_VEHICLES_FULFILLED: 'LOAD_VEHICLES_FULFILLED',
  LOAD_VEHICLES_FAILED: 'LOAD_VEHICLES_FAILED',

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

  removeVehicle: vehicle => ({
    type: vehicleActions.REMOVE_VEHICLE,
    payload: { vehicle }
  }),

  removeVehicleFailed: error => ({
    type: vehicleActions.REMOVE_VEHICLE_FAILED,
    payload: { error }
  }),

  removeVehicleFulfilled: vehicle => ({
    type: vehicleActions.REMOVE_VEHICLE_FULFILLED,
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

  filterVehicles: filterType => ({
    type: vehicleActions.FILTER_VEHICLES,
    payload: { filterType }
  }),

  loadVehiclesFulfilled: vehicles => ({
    type: vehicleActions.LOAD_VEHICLES_FULFILLED,
    payload: { vehicles }
  }),

  loadVehiclesFailed: error => ({
    type: vehicleActions.LOAD_VEHICLES_FAILED,
    payload: { error }
  })
};