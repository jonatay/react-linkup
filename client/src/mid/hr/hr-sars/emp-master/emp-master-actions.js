export const empMasterActions = {
  LOAD_EMP_MASTERS: 'HR_SARS_LOAD_EMP_MASTERS',
  LOAD_EMP_MASTERS_FULFILLED: 'HR_SARS_LOAD_EMP_MASTERS_FULFILLED',
  LOAD_EMP_MASTERS_FAILED: 'HR_SARS_LOAD_EMP_MASTERS_FAILED',

  LOAD_CUBIT_COMPANIES: 'HR_SARS_LOAD_CUBIT_COMPANIES',
  LOAD_CUBIT_COMPANIES_FULFILLED: 'HR_SARS_LOAD_CUBIT_COMPANIES_FULFILLED',
  LOAD_CUBIT_COMPANIES_FAILED: 'HR_SARS_LOAD_CUBIT_COMPANIES_FAILED',

  CREATE_EMP_MASTER: 'HR_SARS_CREATE_EMP_MASTER',
  CREATE_EMP_MASTER_FAILED: 'HR_SARS_CREATE_EMP_MASTER_FAILED',
  CREATE_EMP_MASTER_FULFILLED: 'HR_SARS_CREATE_EMP_MASTER_FULFILLED',

  REMOVE_EMP_MASTER: 'HR_SARS_REMOVE_EMP_MASTER',
  REMOVE_EMP_MASTER_FAILED: 'HR_SARS_REMOVE_EMP_MASTER_FAILED',
  REMOVE_EMP_MASTER_FULFILLED: 'HR_SARS_REMOVE_EMP_MASTER_FULFILLED',

  UPDATE_EMP_MASTER: 'HR_SARS_UPDATE_EMP_MASTER',
  UPDATE_EMP_MASTER_FAILED: 'HR_SARS_UPDATE_EMP_MASTER_FAILED',
  UPDATE_EMP_MASTER_FULFILLED: 'HR_SARS_UPDATE_EMP_MASTER_FULFILLED',

  IMPORT_EMP_MASTER: 'HR_SARS_IMPORT_EMP_MASTER',
  IMPORT_EMP_MASTER_FAILED: 'HR_SARS_IMPORT_EMP_MASTER_FAILED',
  IMPORT_EMP_MASTER_FULFILLED: 'HR_SARS_IMPORT_EMP_MASTER_FULFILLED',

  DOWNLOAD_EMP_501: 'HR_SARS_DOWNLOAD_EMP_501',

  REQUEST_EMP_501_TEXT_DOWNLOAD: 'HR_SARS_REQUEST_EMP_501_TEXT_DOWNLOAD',

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
  loadCubitCompanies: () => ({
    type: empMasterActions.LOAD_CUBIT_COMPANIES
  }),

  loadCubitCompaniesFulfilled: cubitCompanies => ({
    type: empMasterActions.LOAD_CUBIT_COMPANIES_FULFILLED,
    payload: { cubitCompanies }
  }),

  loadCubitCompaniesFailed: error => ({
    type: empMasterActions.LOAD_CUBIT_COMPANIES_FAILED,
    payload: { error }
  }),
  createEmpMaster: data => ({
    type: empMasterActions.CREATE_EMP_MASTER,
    payload: { data }
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
  }),

  importEmpMaster: data => ({
    type: empMasterActions.IMPORT_EMP_MASTER,
    payload: { data }
  }),

  importEmpMasterFailed: error => ({
    type: empMasterActions.IMPORT_EMP_MASTER_FAILED,
    payload: { error }
  }),

  importEmpMasterFulfilled: empMaster => ({
    type: empMasterActions.IMPORT_EMP_MASTER_FULFILLED,
    payload: { empMaster }
  }),

  downloadEmp501: (data, filename, type) => ({
    type: empMasterActions.DOWNLOAD_EMP_501,
    payload: { data, filename, type }
  }),
  requestEmp501TextDownload: id => ({
    type: empMasterActions.REQUEST_EMP_501_TEXT_DOWNLOAD,
    payload: { id }
  })
};
