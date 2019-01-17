export const empMasterActions = {
  LOAD_EMP_MASTERS: 'HR_SARS_LOAD_EMP_MASTERS',
  LOAD_EMP_MASTERS_FULFILLED: 'HR_SARS_LOAD_EMP_MASTERS_FULFILLED',
  LOAD_EMP_MASTERS_FAILED: 'HR_SARS_LOAD_EMP_MASTERS_FAILED',

  CREATE_EMP_MASTER: 'HR_SARS_CREATE_EMP_MASTER',
  CREATE_EMP_MASTER_FAILED: 'HR_SARS_CREATE_EMP_MASTER_FAILED',
  CREATE_EMP_MASTER_FULFILLED:
    'HR_SARS_CREATE_EMP_MASTER_FULFILLED',

  REMOVE_EMP_MASTER: 'HR_SARS_REMOVE_EMP_MASTER',
  REMOVE_EMP_MASTER_FAILED: 'HR_SARS_REMOVE_EMP_MASTER_FAILED',
  REMOVE_EMP_MASTER_FULFILLED:
    'HR_SARS_REMOVE_EMP_MASTER_FULFILLED',

  UPDATE_EMP_MASTER: 'HR_SARS_UPDATE_EMP_MASTER',
  UPDATE_EMP_MASTER_FAILED: 'HR_SARS_UPDATE_EMP_MASTER_FAILED',
  UPDATE_EMP_MASTER_FULFILLED:
    'HR_SARS_UPDATE_EMP_MASTER_FULFILLED',

  loadEmpMasters: () => ({
    type: empMasterActions.LOAD_EMP_MASTERS
  }),
  loadEmpMastersFulfilled: empMasters => ({
    type: empMasterActions.LOAD_EMP_MASTERS_FULFILLED,
    payload: { empMasters }
  }),

  loadEmpMastersFailed: error => ({
    type: empMasterActions.LOAD_EMP_MASTERS_FAILED,
    payload: { error }
  }),

  createEmpMaster: empMaster => ({
    type: empMasterActions.CREATE_EMP_MASTER,
    payload: { empMaster }
  }),

  createEmpMasterFailed: error => ({
    type: empMasterActions.CREATE_EMP_MASTER_FAILED,
    payload: { error }
  }),

  createEmpMasterFulfilled: empMaster => ({
    type: empMasterActions.CREATE_EMP_MASTER_FULFILLED,
    payload: { empMaster }
  }),

  removeEmpMaster: empMaster => ({
    type: empMasterActions.REMOVE_EMP_MASTER,
    payload: { empMaster }
  }),

  removeEmpMasterFailed: error => ({
    type: empMasterActions.REMOVE_EMP_MASTER_FAILED,
    payload: { error }
  }),

  removeEmpMasterFulfilled: empMaster => ({
    type: empMasterActions.REMOVE_EMP_MASTER_FULFILLED,
    payload: { empMaster }
  }),

  updateEmpMaster: (id, changes) => ({
    type: empMasterActions.UPDATE_EMP_MASTER,
    payload: { id, changes }
  }),

  updateEmpMasterFailed: error => ({
    type: empMasterActions.UPDATE_EMP_MASTER_FAILED,
    payload: { error }
  }),

  updateEmpMasterFulfilled: empMaster => ({
    type: empMasterActions.UPDATE_EMP_MASTER_FULFILLED,
    payload: { empMaster }
  })
};
