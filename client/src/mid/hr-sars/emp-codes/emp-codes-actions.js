export const empCodesActions = {
  LOAD_EMP_CODESS: 'HR_SARS_LOAD_EMP_CODESS',
  LOAD_EMP_CODESS_FULFILLED: 'HR_SARS_LOAD_EMP_CODESS_FULFILLED',
  LOAD_EMP_CODESS_FAILED: 'HR_SARS_LOAD_EMP_CODESS_FAILED',

  CREATE_EMP_CODES: 'HR_SARS_CREATE_EMP_CODES',
  CREATE_EMP_CODES_FAILED: 'HR_SARS_CREATE_EMP_CODES_FAILED',
  CREATE_EMP_CODES_FULFILLED:
    'HR_SARS_CREATE_EMP_CODES_FULFILLED',

  REMOVE_EMP_CODES: 'HR_SARS_REMOVE_EMP_CODES',
  REMOVE_EMP_CODES_FAILED: 'HR_SARS_REMOVE_EMP_CODES_FAILED',
  REMOVE_EMP_CODES_FULFILLED:
    'HR_SARS_REMOVE_EMP_CODES_FULFILLED',

  UPDATE_EMP_CODES: 'HR_SARS_UPDATE_EMP_CODES',
  UPDATE_EMP_CODES_FAILED: 'HR_SARS_UPDATE_EMP_CODES_FAILED',
  UPDATE_EMP_CODES_FULFILLED:
    'HR_SARS_UPDATE_EMP_CODES_FULFILLED',

  loadEmpCodess: () => ({
    type: empCodesActions.LOAD_EMP_CODESS
  }),
  loadEmpCodessFulfilled: empCodess => ({
    type: empCodesActions.LOAD_EMP_CODESS_FULFILLED,
    payload: { empCodess }
  }),

  loadEmpCodessFailed: error => ({
    type: empCodesActions.LOAD_EMP_CODESS_FAILED,
    payload: { error }
  }),

  createEmpCodes: empCodes => ({
    type: empCodesActions.CREATE_EMP_CODES,
    payload: { empCodes }
  }),

  createEmpCodesFailed: error => ({
    type: empCodesActions.CREATE_EMP_CODES_FAILED,
    payload: { error }
  }),

  createEmpCodesFulfilled: empCodes => ({
    type: empCodesActions.CREATE_EMP_CODES_FULFILLED,
    payload: { empCodes }
  }),

  removeEmpCodes: empCodes => ({
    type: empCodesActions.REMOVE_EMP_CODES,
    payload: { empCodes }
  }),

  removeEmpCodesFailed: error => ({
    type: empCodesActions.REMOVE_EMP_CODES_FAILED,
    payload: { error }
  }),

  removeEmpCodesFulfilled: empCodes => ({
    type: empCodesActions.REMOVE_EMP_CODES_FULFILLED,
    payload: { empCodes }
  }),

  updateEmpCodes: (id, changes) => ({
    type: empCodesActions.UPDATE_EMP_CODES,
    payload: { id, changes }
  }),

  updateEmpCodesFailed: error => ({
    type: empCodesActions.UPDATE_EMP_CODES_FAILED,
    payload: { error }
  }),

  updateEmpCodesFulfilled: empCodes => ({
    type: empCodesActions.UPDATE_EMP_CODES_FULFILLED,
    payload: { empCodes }
  })
};
