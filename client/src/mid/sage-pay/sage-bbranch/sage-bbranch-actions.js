export const sageBBranchActions = {
  LOAD_SAGE_BBRANCHES: 'SAGE_PAY_LOAD_SAGE_BBRANCHES',
  LOAD_SAGE_BBRANCHES_FULFILLED: 'SAGE_PAY_LOAD_SAGE_BBRANCHES_FULFILLED',
  LOAD_SAGE_BBRANCHES_FAILED: 'SAGE_PAY_LOAD_SAGE_BBRANCHES_FAILED',

  IMPORT_SAGE_BBRANCHES: 'SAGE_PAY_IMPORT_SAGE_BBRANCHES',
  IMPORT_SAGE_BBRANCHES_FULFILLED: 'SAGE_PAY_IMPORT_SAGE_BBRANCHES_FULFILLED',
  IMPORT_SAGE_BBRANCHES_FAILED: 'SAGE_PAY_IMPORT_SAGE_BBRANCHES_FAILED',

  loadSageBBranches: () => ({
    type: sageBBranchActions.LOAD_SAGE_BBRANCHES
  }),
  loadSageBBranchesFulfilled: sageBBranches => ({
    type: sageBBranchActions.LOAD_SAGE_BBRANCHES_FULFILLED,
    payload: { sageBBranches }
  }),
  loadSageBBranchesFailed: error => ({
    type: sageBBranchActions.LOAD_SAGE_BBRANCHES_FAILED,
    payload: { error }
  }),

  importSageBBranches: () => ({
    type: sageBBranchActions.IMPORT_SAGE_BBRANCHES
  }),
  importSageBBranchesFulfilled: sageBBranches => ({
    type: sageBBranchActions.IMPORT_SAGE_BBRANCHES_FULFILLED,
    payload: { sageBBranches }
  }),
  importSageBBranchesFailed: error => ({
    type: sageBBranchActions.IMPORT_SAGE_BBRANCHES_FAILED,
    payload: { error }
  })
};
