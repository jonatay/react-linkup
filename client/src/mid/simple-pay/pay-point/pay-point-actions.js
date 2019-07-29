export const payPointActions = {
  LOAD_PAY_POINTS: 'SIMPLE_PAY_LOAD_PAY_POINTS',
  LOAD_PAY_POINTS_FULFILLED: 'SIMPLE_PAY_LOAD_PAY_POINTS_FULFILLED',
  LOAD_PAY_POINTS_FAILED: 'SIMPLE_PAY_LOAD_PAY_POINTS_FAILED',

  CREATE_PAY_POINT: 'SIMPLE_PAY_CREATE_PAY_POINT',
  CREATE_PAY_POINT_FAILED: 'SIMPLE_PAY_CREATE_PAY_POINT_FAILED',
  CREATE_PAY_POINT_FULFILLED:
    'SIMPLE_PAY_CREATE_PAY_POINT_FULFILLED',

  REMOVE_PAY_POINT: 'SIMPLE_PAY_REMOVE_PAY_POINT',
  REMOVE_PAY_POINT_FAILED: 'SIMPLE_PAY_REMOVE_PAY_POINT_FAILED',
  REMOVE_PAY_POINT_FULFILLED:
    'SIMPLE_PAY_REMOVE_PAY_POINT_FULFILLED',

  UPDATE_PAY_POINT: 'SIMPLE_PAY_UPDATE_PAY_POINT',
  UPDATE_PAY_POINT_FAILED: 'SIMPLE_PAY_UPDATE_PAY_POINT_FAILED',
  UPDATE_PAY_POINT_FULFILLED:
    'SIMPLE_PAY_UPDATE_PAY_POINT_FULFILLED',

  loadPayPoints: () => ({
    type: payPointActions.LOAD_PAY_POINTS
  }),
  loadPayPointsFulfilled: payPoints => ({
    type: payPointActions.LOAD_PAY_POINTS_FULFILLED,
    payload: { payPoints }
  }),

  loadPayPointsFailed: error => ({
    type: payPointActions.LOAD_PAY_POINTS_FAILED,
    payload: { error }
  }),

  createPayPoint: payPoint => ({
    type: payPointActions.CREATE_PAY_POINT,
    payload: { payPoint }
  }),

  createPayPointFailed: error => ({
    type: payPointActions.CREATE_PAY_POINT_FAILED,
    payload: { error }
  }),

  createPayPointFulfilled: payPoint => ({
    type: payPointActions.CREATE_PAY_POINT_FULFILLED,
    payload: { payPoint }
  }),

  removePayPoint: payPoint => ({
    type: payPointActions.REMOVE_PAY_POINT,
    payload: { payPoint }
  }),

  removePayPointFailed: error => ({
    type: payPointActions.REMOVE_PAY_POINT_FAILED,
    payload: { error }
  }),

  removePayPointFulfilled: payPoint => ({
    type: payPointActions.REMOVE_PAY_POINT_FULFILLED,
    payload: { payPoint }
  }),

  updatePayPoint: (id, changes) => ({
    type: payPointActions.UPDATE_PAY_POINT,
    payload: { id, changes }
  }),

  updatePayPointFailed: error => ({
    type: payPointActions.UPDATE_PAY_POINT_FAILED,
    payload: { error }
  }),

  updatePayPointFulfilled: payPoint => ({
    type: payPointActions.UPDATE_PAY_POINT_FULFILLED,
    payload: { payPoint }
  })
};
