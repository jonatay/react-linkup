export const driverActions = {
  CREATE_DRIVER: 'CREATE_DRIVER',
  CREATE_DRIVER_FAILED: 'CREATE_DRIVER_FAILED',
  CREATE_DRIVER_FULFILLED: 'CREATE_DRIVER_FULFILLED',

  REMOVE_DRIVER: 'REMOVE_DRIVER',
  REMOVE_DRIVER_FAILED: 'REMOVE_DRIVER_FAILED',
  REMOVE_DRIVER_FULFILLED: 'REMOVE_DRIVER_FULFILLED',

  UPDATE_DRIVER: 'UPDATE_DRIVER',
  UPDATE_DRIVER_FAILED: 'UPDATE_DRIVER_FAILED',
  UPDATE_DRIVER_FULFILLED: 'UPDATE_DRIVER_FULFILLED',

  LOAD_DRIVERS: 'LOAD_DRIVERS',
  FILTER_DRIVERS: 'FILTER_DRIVERS',
  LOAD_DRIVERS_FULFILLED: 'LOAD_DRIVERS_FULFILLED',
  LOAD_DRIVERS_FAILED: 'LOAD_DRIVERS_FAILED',

  loadDrivers: () => ({
    type: driverActions.LOAD_DRIVERS
  }),

  createDriver: title => ({
    type: driverActions.CREATE_DRIVER,
    payload: { driver: { title, completed: false } }
  }),

  createDriverFailed: error => ({
    type: driverActions.CREATE_DRIVER_FAILED,
    payload: { error }
  }),

  createDriverFulfilled: driver => ({
    type: driverActions.CREATE_DRIVER_FULFILLED,
    payload: { driver }
  }),

  removeDriver: driver => ({
    type: driverActions.REMOVE_DRIVER,
    payload: { driver }
  }),

  removeDriverFailed: error => ({
    type: driverActions.REMOVE_DRIVER_FAILED,
    payload: { error }
  }),

  removeDriverFulfilled: driver => ({
    type: driverActions.REMOVE_DRIVER_FULFILLED,
    payload: { driver }
  }),

  updateDriver: (driver, changes) => ({
    type: driverActions.UPDATE_DRIVER,
    payload: { driver, changes }
  }),

  updateDriverFailed: error => ({
    type: driverActions.UPDATE_DRIVER_FAILED,
    payload: { error }
  }),

  updateDriverFulfilled: driver => ({
    type: driverActions.UPDATE_DRIVER_FULFILLED,
    payload: { driver }
  }),

  filterDrivers: filterType => ({
    type: driverActions.FILTER_DRIVERS,
    payload: { filterType }
  }),

  loadDriversFulfilled: drivers => ({
    type: driverActions.LOAD_DRIVERS_FULFILLED,
    payload: { drivers }
  }),

  loadDriversFailed: error => ({
    type: driverActions.LOAD_DRIVERS_FAILED,
    payload: { error }
  })
};
