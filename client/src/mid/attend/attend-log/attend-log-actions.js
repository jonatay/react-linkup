export const attendLogActions = {
  LOAD_ATTEND_LOGS: 'ATTEND_LOAD_ATTEND_LOGS',
  LOAD_ATTEND_LOGS_FULFILLED: 'ATTEND_LOAD_ATTEND_LOGS_FULFILLED',
  LOAD_ATTEND_LOGS_FAILED: 'ATTEND_LOAD_ATTEND_LOGS_FAILED',

  CREATE_ATTEND_LOG: 'ATTEND_CREATE_ATTEND_LOG',
  CREATE_ATTEND_LOG_FAILED: 'ATTEND_CREATE_ATTEND_LOG_FAILED',
  CREATE_ATTEND_LOG_FULFILLED: 'ATTEND_CREATE_ATTEND_LOG_FULFILLED',

  REMOVE_ATTEND_LOG: 'ATTEND_REMOVE_ATTEND_LOG',
  REMOVE_ATTEND_LOG_FAILED: 'ATTEND_REMOVE_ATTEND_LOG_FAILED',
  REMOVE_ATTEND_LOG_FULFILLED: 'ATTEND_REMOVE_ATTEND_LOG_FULFILLED',

  UPDATE_ATTEND_LOG: 'ATTEND_UPDATE_ATTEND_LOG',
  UPDATE_ATTEND_LOG_FAILED: 'ATTEND_UPDATE_ATTEND_LOG_FAILED',
  UPDATE_ATTEND_LOG_FULFILLED: 'ATTEND_UPDATE_ATTEND_LOG_FULFILLED',

  loadAttendLogs: listParams => ({
    type: attendLogActions.LOAD_ATTEND_LOGS,
    payload: { listParams }
  }),
  loadAttendLogsFulfilled: attendLogs => ({
    type: attendLogActions.LOAD_ATTEND_LOGS_FULFILLED,
    payload: { attendLogs }
  }),

  loadAttendLogsFailed: error => ({
    type: attendLogActions.LOAD_ATTEND_LOGS_FAILED,
    payload: { error }
  }),

  createAttendLog: attendLog => ({
    type: attendLogActions.CREATE_ATTEND_LOG,
    payload: { attendLog }
  }),

  createAttendLogFailed: error => ({
    type: attendLogActions.CREATE_ATTEND_LOG_FAILED,
    payload: { error }
  }),

  createAttendLogFulfilled: attendLog => ({
    type: attendLogActions.CREATE_ATTEND_LOG_FULFILLED,
    payload: { attendLog }
  }),

  removeAttendLog: attendLog => ({
    type: attendLogActions.REMOVE_ATTEND_LOG,
    payload: { attendLog }
  }),

  removeAttendLogFailed: error => ({
    type: attendLogActions.REMOVE_ATTEND_LOG_FAILED,
    payload: { error }
  }),

  removeAttendLogFulfilled: attendLog => ({
    type: attendLogActions.REMOVE_ATTEND_LOG_FULFILLED,
    payload: { attendLog }
  }),

  updateAttendLog: (id, changes) => ({
    type: attendLogActions.UPDATE_ATTEND_LOG,
    payload: { id, changes }
  }),

  updateAttendLogFailed: error => ({
    type: attendLogActions.UPDATE_ATTEND_LOG_FAILED,
    payload: { error }
  }),

  updateAttendLogFulfilled: attendLog => ({
    type: attendLogActions.UPDATE_ATTEND_LOG_FULFILLED,
    payload: { attendLog }
  })
};
