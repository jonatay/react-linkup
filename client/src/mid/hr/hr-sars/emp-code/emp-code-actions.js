export const empCodeActions = {
  LOAD_EMP_CODES: 'HR_SARS_LOAD_EMP_CODES',
  LOAD_EMP_CODES_FULFILLED: 'HR_SARS_LOAD_EMP_CODES_FULFILLED',
  LOAD_EMP_CODES_FAILED: 'HR_SARS_LOAD_EMP_CODES_FAILED',

  CREATE_EMP_CODE: 'HR_SARS_CREATE_EMP_CODE',
  CREATE_EMP_CODE_FAILED: 'HR_SARS_CREATE_EMP_CODE_FAILED',
  CREATE_EMP_CODE_FULFILLED: 'HR_SARS_CREATE_EMP_CODE_FULFILLED',

  REMOVE_EMP_CODE: 'HR_SARS_REMOVE_EMP_CODE',
  REMOVE_EMP_CODE_FAILED: 'HR_SARS_REMOVE_EMP_CODE_FAILED',
  REMOVE_EMP_CODE_FULFILLED: 'HR_SARS_REMOVE_EMP_CODE_FULFILLED',

  UPDATE_EMP_CODE: 'HR_SARS_UPDATE_EMP_CODE',
  UPDATE_EMP_CODE_FAILED: 'HR_SARS_UPDATE_EMP_CODE_FAILED',
  UPDATE_EMP_CODE_FULFILLED: 'HR_SARS_UPDATE_EMP_CODE_FULFILLED',

  IMPORT_EMP_CODES_FULFILLED: 'HR_SARS_IMPORT_EMP_CODES_FULFILLED',

  loadEmpCodes: () => ({
    type: empCodeActions.LOAD_EMP_CODES
  }),
  loadEmpCodesFulfilled: empCodes => ({
    type: empCodeActions.LOAD_EMP_CODES_FULFILLED,
    payload: { empCodes }
  }),

  loadEmpCodesFailed: error => ({
    type: empCodeActions.LOAD_EMP_CODES_FAILED,
    payload: { error }
  }),

  createEmpCode: empCode => ({
    type: empCodeActions.CREATE_EMP_CODE,
    payload: { empCode }
  }),

  createEmpCodeFailed: error => ({
    type: empCodeActions.CREATE_EMP_CODE_FAILED,
    payload: { error }
  }),

  createEmpCodeFulfilled: empCode => ({
    type: empCodeActions.CREATE_EMP_CODE_FULFILLED,
    payload: { empCode }
  }),

  removeEmpCode: empCode => ({
    type: empCodeActions.REMOVE_EMP_CODE,
    payload: { empCode }
  }),

  removeEmpCodeFailed: error => ({
    type: empCodeActions.REMOVE_EMP_CODE_FAILED,
    payload: { error }
  }),

  removeEmpCodeFulfilled: empCode => ({
    type: empCodeActions.REMOVE_EMP_CODE_FULFILLED,
    payload: { empCode }
  }),

  updateEmpCode: (id, changes) => ({
    type: empCodeActions.UPDATE_EMP_CODE,
    payload: { id, changes }
  }),

  updateEmpCodeFailed: error => ({
    type: empCodeActions.UPDATE_EMP_CODE_FAILED,
    payload: { error }
  }),

  updateEmpCodeFulfilled: empCode => ({
    type: empCodeActions.UPDATE_EMP_CODE_FULFILLED,
    payload: { empCode }
  }),

  importEmpCodesFulfilled: empCodes => ({
    type: empCodeActions.IMPORT_EMP_CODES_FULFILLED,
    payload: { empCodes }
  })
};
