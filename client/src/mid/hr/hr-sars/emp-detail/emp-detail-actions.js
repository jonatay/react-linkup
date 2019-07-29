export const empDetailActions = {
  LOAD_EMP_DETAILS: 'HR_SARS_LOAD_EMP_DETAILS',
  LOAD_EMP_DETAILS_FULFILLED: 'HR_SARS_LOAD_EMP_DETAILS_FULFILLED',
  LOAD_EMP_DETAILS_FAILED: 'HR_SARS_LOAD_EMP_DETAILS_FAILED',

  CREATE_EMP_DETAIL: 'HR_SARS_CREATE_EMP_DETAIL',
  CREATE_EMP_DETAIL_FAILED: 'HR_SARS_CREATE_EMP_DETAIL_FAILED',
  CREATE_EMP_DETAIL_FULFILLED: 'HR_SARS_CREATE_EMP_DETAIL_FULFILLED',

  REMOVE_EMP_DETAIL: 'HR_SARS_REMOVE_EMP_DETAIL',
  REMOVE_EMP_DETAIL_FAILED: 'HR_SARS_REMOVE_EMP_DETAIL_FAILED',
  REMOVE_EMP_DETAIL_FULFILLED: 'HR_SARS_REMOVE_EMP_DETAIL_FULFILLED',

  UPDATE_EMP_DETAIL: 'HR_SARS_UPDATE_EMP_DETAIL',
  UPDATE_EMP_DETAIL_FAILED: 'HR_SARS_UPDATE_EMP_DETAIL_FAILED',
  UPDATE_EMP_DETAIL_FULFILLED: 'HR_SARS_UPDATE_EMP_DETAIL_FULFILLED',

  IMPORT_EMP_EAFYFILE: 'HR_SARS_IMPORT_EMP_EAFYFILE',
  IMPORT_EMP_EAFYFILE_FAILED: 'HR_SARS_IMPORT_EMP_EAFYFILE_FAILED',
  IMPORT_EMP_EAFYFILE_FULFILLED: 'HR_SARS_IMPORT_EMP_EAFYFILE_FULFILLED',

  IMPORT_EMP_DETAILS_FULFILLED: 'HR_SARS_IMPORT_EMP_DETAILS_FULFILLED',

  loadEmpDetails: () => ({
    type: empDetailActions.LOAD_EMP_DETAILS
  }),
  loadEmpDetailsFulfilled: empDetails => ({
    type: empDetailActions.LOAD_EMP_DETAILS_FULFILLED,
    payload: { empDetails }
  }),

  loadEmpDetailsFailed: error => ({
    type: empDetailActions.LOAD_EMP_DETAILS_FAILED,
    payload: { error }
  }),

  createEmpDetail: empDetail => ({
    type: empDetailActions.CREATE_EMP_DETAIL,
    payload: { empDetail }
  }),

  createEmpDetailFailed: error => ({
    type: empDetailActions.CREATE_EMP_DETAIL_FAILED,
    payload: { error }
  }),

  createEmpDetailFulfilled: empDetail => ({
    type: empDetailActions.CREATE_EMP_DETAIL_FULFILLED,
    payload: { empDetail }
  }),

  removeEmpDetail: empDetail => ({
    type: empDetailActions.REMOVE_EMP_DETAIL,
    payload: { empDetail }
  }),

  removeEmpDetailFailed: error => ({
    type: empDetailActions.REMOVE_EMP_DETAIL_FAILED,
    payload: { error }
  }),

  removeEmpDetailFulfilled: empDetail => ({
    type: empDetailActions.REMOVE_EMP_DETAIL_FULFILLED,
    payload: { empDetail }
  }),

  updateEmpDetail: (id, changes) => ({
    type: empDetailActions.UPDATE_EMP_DETAIL,
    payload: { id, changes }
  }),

  updateEmpDetailFailed: error => ({
    type: empDetailActions.UPDATE_EMP_DETAIL_FAILED,
    payload: { error }
  }),

  updateEmpDetailFulfilled: empDetail => ({
    type: empDetailActions.UPDATE_EMP_DETAIL_FULFILLED,
    payload: { empDetail }
  }),
  importEmpDetailsFulfilled: empDetails => ({
    type: empDetailActions.IMPORT_EMP_DETAILS_FULFILLED,
    payload: { empDetails }
  }),
  importEmpEasyfile: data => ({
    type: empDetailActions.IMPORT_EMP_EAFYFILE,
    payload: { data }
  }),
  importEmpEasyfileFailed: error => ({
    type: empDetailActions.IMPORT_EMP_EAFYFILE_FAILED,
    payload: { error }
  }),

  importEmpEasyfileFulfilled: result => ({
    type: empDetailActions.IMPORT_EMP_EAFYFILE_FULFILLED,
    payload: { result }
  })
};
