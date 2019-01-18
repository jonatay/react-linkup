export const codeLkpActions = {
  LOAD_CODE_LKPS: 'HR_SARS_LOAD_CODE_LKPS',
  LOAD_CODE_LKPS_FULFILLED: 'HR_SARS_LOAD_CODE_LKPS_FULFILLED',
  LOAD_CODE_LKPS_FAILED: 'HR_SARS_LOAD_CODE_LKPS_FAILED',

  CREATE_CODE_LKP: 'HR_SARS_CREATE_CODE_LKP',
  CREATE_CODE_LKP_FAILED: 'HR_SARS_CREATE_CODE_LKP_FAILED',
  CREATE_CODE_LKP_FULFILLED:
    'HR_SARS_CREATE_CODE_LKP_FULFILLED',

  REMOVE_CODE_LKP: 'HR_SARS_REMOVE_CODE_LKP',
  REMOVE_CODE_LKP_FAILED: 'HR_SARS_REMOVE_CODE_LKP_FAILED',
  REMOVE_CODE_LKP_FULFILLED:
    'HR_SARS_REMOVE_CODE_LKP_FULFILLED',

  UPDATE_CODE_LKP: 'HR_SARS_UPDATE_CODE_LKP',
  UPDATE_CODE_LKP_FAILED: 'HR_SARS_UPDATE_CODE_LKP_FAILED',
  UPDATE_CODE_LKP_FULFILLED:
    'HR_SARS_UPDATE_CODE_LKP_FULFILLED',

  loadCodeLkps: () => ({
    type: codeLkpActions.LOAD_CODE_LKPS
  }),
  loadCodeLkpsFulfilled: codeLkps => ({
    type: codeLkpActions.LOAD_CODE_LKPS_FULFILLED,
    payload: { codeLkps }
  }),

  loadCodeLkpsFailed: error => ({
    type: codeLkpActions.LOAD_CODE_LKPS_FAILED,
    payload: { error }
  }),

  createCodeLkp: codeLkp => ({
    type: codeLkpActions.CREATE_CODE_LKP,
    payload: { codeLkp }
  }),

  createCodeLkpFailed: error => ({
    type: codeLkpActions.CREATE_CODE_LKP_FAILED,
    payload: { error }
  }),

  createCodeLkpFulfilled: codeLkp => ({
    type: codeLkpActions.CREATE_CODE_LKP_FULFILLED,
    payload: { codeLkp }
  }),

  removeCodeLkp: codeLkp => ({
    type: codeLkpActions.REMOVE_CODE_LKP,
    payload: { codeLkp }
  }),

  removeCodeLkpFailed: error => ({
    type: codeLkpActions.REMOVE_CODE_LKP_FAILED,
    payload: { error }
  }),

  removeCodeLkpFulfilled: codeLkp => ({
    type: codeLkpActions.REMOVE_CODE_LKP_FULFILLED,
    payload: { codeLkp }
  }),

  updateCodeLkp: (id, changes) => ({
    type: codeLkpActions.UPDATE_CODE_LKP,
    payload: { id, changes }
  }),

  updateCodeLkpFailed: error => ({
    type: codeLkpActions.UPDATE_CODE_LKP_FAILED,
    payload: { error }
  }),

  updateCodeLkpFulfilled: codeLkp => ({
    type: codeLkpActions.UPDATE_CODE_LKP_FULFILLED,
    payload: { codeLkp }
  })
};
