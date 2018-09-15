export const sageBankActions = {
  LOAD_SAGE_BANKS: 'SAGE_PAY_LOAD_SAGE_BANKS',
  LOAD_SAGE_BANKS_FULFILLED: 'SAGE_PAY_LOAD_SAGE_BANKS_FULFILLED',
  LOAD_SAGE_BANKS_FAILED: 'SAGE_PAY_LOAD_SAGE_BANKS_FAILED',

  IMPORT_SAGE_BANKS: 'SAGE_PAY_IMPORT_SAGE_BANKS',
  IMPORT_SAGE_BANKS_FULFILLED: 'SAGE_PAY_IMPORT_SAGE_BANKS_FULFILLED',
  IMPORT_SAGE_BANKS_FAILED: 'SAGE_PAY_IMPORT_SAGE_BANKS_FAILED',

  loadSageBanks: () => ({
    type: sageBankActions.LOAD_SAGE_BANKS
  }),
  loadSageBanksFulfilled: sageBanks => ({
    type: sageBankActions.LOAD_SAGE_BANKS_FULFILLED,
    payload: { sageBanks }
  }),
  loadSageBanksFailed: error => ({
    type: sageBankActions.LOAD_SAGE_BANKS_FAILED,
    payload: { error }
  }),

  importSageBanks: () => ({
    type: sageBankActions.IMPORT_SAGE_BANKS
  }),
  importSageBanksFulfilled: sageBanks => ({
    type: sageBankActions.IMPORT_SAGE_BANKS_FULFILLED,
    payload: { sageBanks }
  }),
  importSageBanksFailed: error => ({
    type: sageBankActions.IMPORT_SAGE_BANKS_FAILED,
    payload: { error }
  })
};
