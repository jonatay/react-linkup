export const rightActions = {
  CREATE_RIGHT: 'CREATE_RIGHT',
  CREATE_RIGHT_FAILED: 'CREATE_RIGHT_FAILED',
  CREATE_RIGHT_FULFILLED: 'CREATE_RIGHT_FULFILLED',

  REMOVE_RIGHT: 'REMOVE_RIGHT',
  REMOVE_RIGHT_FAILED: 'REMOVE_RIGHT_FAILED',
  REMOVE_RIGHT_FULFILLED: 'REMOVE_RIGHT_FULFILLED',

  UPDATE_RIGHT: 'UPDATE_RIGHT',
  UPDATE_RIGHT_FAILED: 'UPDATE_RIGHT_FAILED',
  UPDATE_RIGHT_FULFILLED: 'UPDATE_RIGHT_FULFILLED',

  FILTER_RIGHTS: 'FILTER_RIGHTS',
  LOAD_RIGHTS_FULFILLED: 'LOAD_RIGHTS_FULFILLED',

  createRight: name => ({
    type: rightActions.CREATE_RIGHT,
    payload: { right: { name, roles: [], assigned: [] } }
  }),

  createRightFailed: error => ({
    type: rightActions.CREATE_RIGHT_FAILED,
    payload: { error }
  }),

  createRightFulfilled: right => ({
    type: rightActions.CREATE_RIGHT_FULFILLED,
    payload: { right }
  }),

  removeRight: right => ({
    type: rightActions.REMOVE_RIGHT,
    payload: { right }
  }),

  removeRightFailed: error => ({
    type: rightActions.REMOVE_RIGHT_FAILED,
    payload: { error }
  }),

  removeRightFulfilled: right => ({
    type: rightActions.REMOVE_RIGHT_FULFILLED,
    payload: { right }
  }),

  updateRight: (right, changes) => ({
    type: rightActions.UPDATE_RIGHT,
    payload: { right, changes }
  }),

  updateRightFailed: error => ({
    type: rightActions.UPDATE_RIGHT_FAILED,
    payload: { error }
  }),

  updateRightFulfilled: right => ({
    type: rightActions.UPDATE_RIGHT_FULFILLED,
    payload: { right }
  }),

  filterRights: filterType => ({
    type: rightActions.FILTER_RIGHTS,
    payload: { filterType }
  }),

  loadRightsFulfilled: rights => ({
    type: rightActions.LOAD_RIGHTS_FULFILLED,
    payload: { rights }
  })
};
