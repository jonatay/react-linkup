export const spEmployeeActions = {
  LOAD_SP_EMPLOYEES: 'SIMPLE_PAY_LOAD_SP_EMPLOYEES',
  LOAD_SP_EMPLOYEES_FULFILLED: 'SIMPLE_PAY_LOAD_SP_EMPLOYEES_FULFILLED',
  LOAD_SP_EMPLOYEES_FAILED: 'SIMPLE_PAY_LOAD_SP_EMPLOYEES_FAILED',

  CREATE_SP_EMPLOYEE: 'SIMPLE_PAY_CREATE_SP_EMPLOYEE',
  CREATE_SP_EMPLOYEE_FAILED: 'SIMPLE_PAY_CREATE_SP_EMPLOYEE_FAILED',
  CREATE_SP_EMPLOYEE_FULFILLED:
    'SIMPLE_PAY_CREATE_SP_EMPLOYEE_FULFILLED',

  REMOVE_SP_EMPLOYEE: 'SIMPLE_PAY_REMOVE_SP_EMPLOYEE',
  REMOVE_SP_EMPLOYEE_FAILED: 'SIMPLE_PAY_REMOVE_SP_EMPLOYEE_FAILED',
  REMOVE_SP_EMPLOYEE_FULFILLED:
    'SIMPLE_PAY_REMOVE_SP_EMPLOYEE_FULFILLED',

  UPDATE_SP_EMPLOYEE: 'SIMPLE_PAY_UPDATE_SP_EMPLOYEE',
  UPDATE_SP_EMPLOYEE_FAILED: 'SIMPLE_PAY_UPDATE_SP_EMPLOYEE_FAILED',
  UPDATE_SP_EMPLOYEE_FULFILLED:
    'SIMPLE_PAY_UPDATE_SP_EMPLOYEE_FULFILLED',

  loadSpEmployees: () => ({
    type: spEmployeeActions.LOAD_SP_EMPLOYEES
  }),
  loadSpEmployeesFulfilled: spEmployees => ({
    type: spEmployeeActions.LOAD_SP_EMPLOYEES_FULFILLED,
    payload: { spEmployees }
  }),

  loadSpEmployeesFailed: error => ({
    type: spEmployeeActions.LOAD_SP_EMPLOYEES_FAILED,
    payload: { error }
  }),

  createSpEmployee: spEmployee => ({
    type: spEmployeeActions.CREATE_SP_EMPLOYEE,
    payload: { spEmployee }
  }),

  createSpEmployeeFailed: error => ({
    type: spEmployeeActions.CREATE_SP_EMPLOYEE_FAILED,
    payload: { error }
  }),

  createSpEmployeeFulfilled: spEmployee => ({
    type: spEmployeeActions.CREATE_SP_EMPLOYEE_FULFILLED,
    payload: { spEmployee }
  }),

  removeSpEmployee: spEmployee => ({
    type: spEmployeeActions.REMOVE_SP_EMPLOYEE,
    payload: { spEmployee }
  }),

  removeSpEmployeeFailed: error => ({
    type: spEmployeeActions.REMOVE_SP_EMPLOYEE_FAILED,
    payload: { error }
  }),

  removeSpEmployeeFulfilled: spEmployee => ({
    type: spEmployeeActions.REMOVE_SP_EMPLOYEE_FULFILLED,
    payload: { spEmployee }
  }),

  updateSpEmployee: (id, changes) => ({
    type: spEmployeeActions.UPDATE_SP_EMPLOYEE,
    payload: { id, changes }
  }),

  updateSpEmployeeFailed: error => ({
    type: spEmployeeActions.UPDATE_SP_EMPLOYEE_FAILED,
    payload: { error }
  }),

  updateSpEmployeeFulfilled: spEmployee => ({
    type: spEmployeeActions.UPDATE_SP_EMPLOYEE_FULFILLED,
    payload: { spEmployee }
  })
};
