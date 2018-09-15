export const attendUserActions = {
  LOAD_ATTEND_USERS: 'ATTEND_LOAD_ATTEND_USERS',
  LOAD_ATTEND_USERS_FULFILLED: 'ATTEND_LOAD_ATTEND_USERS_FULFILLED',
  LOAD_ATTEND_USERS_FAILED: 'ATTEND_LOAD_ATTEND_USERS_FAILED',

  CREATE_ATTEND_USER: 'ATTEND_CREATE_ATTEND_USER',
  CREATE_ATTEND_USER_FAILED: 'ATTEND_CREATE_ATTEND_USER_FAILED',
  CREATE_ATTEND_USER_FULFILLED:
    'ATTEND_CREATE_ATTEND_USER_FULFILLED',

  REMOVE_ATTEND_USER: 'ATTEND_REMOVE_ATTEND_USER',
  REMOVE_ATTEND_USER_FAILED: 'ATTEND_REMOVE_ATTEND_USER_FAILED',
  REMOVE_ATTEND_USER_FULFILLED:
    'ATTEND_REMOVE_ATTEND_USER_FULFILLED',

  UPDATE_ATTEND_USER: 'ATTEND_UPDATE_ATTEND_USER',
  UPDATE_ATTEND_USER_FAILED: 'ATTEND_UPDATE_ATTEND_USER_FAILED',
  UPDATE_ATTEND_USER_FULFILLED:
    'ATTEND_UPDATE_ATTEND_USER_FULFILLED',

  loadAttendUsers: () => ({
    type: attendUserActions.LOAD_ATTEND_USERS
  }),
  loadAttendUsersFulfilled: attendUsers => ({
    type: attendUserActions.LOAD_ATTEND_USERS_FULFILLED,
    payload: { attendUsers }
  }),

  loadAttendUsersFailed: error => ({
    type: attendUserActions.LOAD_ATTEND_USERS_FAILED,
    payload: { error }
  }),

  createAttendUser: attendUser => ({
    type: attendUserActions.CREATE_ATTEND_USER,
    payload: { attendUser }
  }),

  createAttendUserFailed: error => ({
    type: attendUserActions.CREATE_ATTEND_USER_FAILED,
    payload: { error }
  }),

  createAttendUserFulfilled: attendUser => ({
    type: attendUserActions.CREATE_ATTEND_USER_FULFILLED,
    payload: { attendUser }
  }),

  removeAttendUser: attendUser => ({
    type: attendUserActions.REMOVE_ATTEND_USER,
    payload: { attendUser }
  }),

  removeAttendUserFailed: error => ({
    type: attendUserActions.REMOVE_ATTEND_USER_FAILED,
    payload: { error }
  }),

  removeAttendUserFulfilled: attendUser => ({
    type: attendUserActions.REMOVE_ATTEND_USER_FULFILLED,
    payload: { attendUser }
  }),

  updateAttendUser: (id, changes) => ({
    type: attendUserActions.UPDATE_ATTEND_USER,
    payload: { id, changes }
  }),

  updateAttendUserFailed: error => ({
    type: attendUserActions.UPDATE_ATTEND_USER_FAILED,
    payload: { error }
  }),

  updateAttendUserFulfilled: attendUser => ({
    type: attendUserActions.UPDATE_ATTEND_USER_FULFILLED,
    payload: { attendUser }
  })
};
