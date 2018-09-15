export const attendDeptActions = {
  LOAD_ATTEND_DEPTS: 'ATTEND_LOAD_ATTEND_DEPTS',
  LOAD_ATTEND_DEPTS_FULFILLED: 'ATTEND_LOAD_ATTEND_DEPTS_FULFILLED',
  LOAD_ATTEND_DEPTS_FAILED: 'ATTEND_LOAD_ATTEND_DEPTS_FAILED',

  CREATE_ATTEND_DEPT: 'ATTEND_CREATE_ATTEND_DEPT',
  CREATE_ATTEND_DEPT_FAILED: 'ATTEND_CREATE_ATTEND_DEPT_FAILED',
  CREATE_ATTEND_DEPT_FULFILLED:
    'ATTEND_CREATE_ATTEND_DEPT_FULFILLED',

  REMOVE_ATTEND_DEPT: 'ATTEND_REMOVE_ATTEND_DEPT',
  REMOVE_ATTEND_DEPT_FAILED: 'ATTEND_REMOVE_ATTEND_DEPT_FAILED',
  REMOVE_ATTEND_DEPT_FULFILLED:
    'ATTEND_REMOVE_ATTEND_DEPT_FULFILLED',

  UPDATE_ATTEND_DEPT: 'ATTEND_UPDATE_ATTEND_DEPT',
  UPDATE_ATTEND_DEPT_FAILED: 'ATTEND_UPDATE_ATTEND_DEPT_FAILED',
  UPDATE_ATTEND_DEPT_FULFILLED:
    'ATTEND_UPDATE_ATTEND_DEPT_FULFILLED',

  loadAttendDepts: () => ({
    type: attendDeptActions.LOAD_ATTEND_DEPTS
  }),
  loadAttendDeptsFulfilled: attendDepts => ({
    type: attendDeptActions.LOAD_ATTEND_DEPTS_FULFILLED,
    payload: { attendDepts }
  }),

  loadAttendDeptsFailed: error => ({
    type: attendDeptActions.LOAD_ATTEND_DEPTS_FAILED,
    payload: { error }
  }),

  createAttendDept: attendDept => ({
    type: attendDeptActions.CREATE_ATTEND_DEPT,
    payload: { attendDept }
  }),

  createAttendDeptFailed: error => ({
    type: attendDeptActions.CREATE_ATTEND_DEPT_FAILED,
    payload: { error }
  }),

  createAttendDeptFulfilled: attendDept => ({
    type: attendDeptActions.CREATE_ATTEND_DEPT_FULFILLED,
    payload: { attendDept }
  }),

  removeAttendDept: attendDept => ({
    type: attendDeptActions.REMOVE_ATTEND_DEPT,
    payload: { attendDept }
  }),

  removeAttendDeptFailed: error => ({
    type: attendDeptActions.REMOVE_ATTEND_DEPT_FAILED,
    payload: { error }
  }),

  removeAttendDeptFulfilled: attendDept => ({
    type: attendDeptActions.REMOVE_ATTEND_DEPT_FULFILLED,
    payload: { attendDept }
  }),

  updateAttendDept: (id, changes) => ({
    type: attendDeptActions.UPDATE_ATTEND_DEPT,
    payload: { id, changes }
  }),

  updateAttendDeptFailed: error => ({
    type: attendDeptActions.UPDATE_ATTEND_DEPT_FAILED,
    payload: { error }
  }),

  updateAttendDeptFulfilled: attendDept => ({
    type: attendDeptActions.UPDATE_ATTEND_DEPT_FULFILLED,
    payload: { attendDept }
  })
};
