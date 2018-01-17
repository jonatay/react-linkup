export const roleActions = {
  CREATE_ROLE: 'CREATE_ROLE',
  CREATE_ROLE_FAILED: 'CREATE_ROLE_FAILED',
  CREATE_ROLE_FULFILLED: 'CREATE_ROLE_FULFILLED',

  REMOVE_ROLE: 'REMOVE_ROLE',
  REMOVE_ROLE_FAILED: 'REMOVE_ROLE_FAILED',
  REMOVE_ROLE_FULFILLED: 'REMOVE_ROLE_FULFILLED',

  UPDATE_ROLE: 'UPDATE_ROLE',
  UPDATE_ROLE_FAILED: 'UPDATE_ROLE_FAILED',
  UPDATE_ROLE_FULFILLED: 'UPDATE_ROLE_FULFILLED',

  FILTER_ROLES: 'FILTER_ROLES',
  LOAD_ROLES_FULFILLED: 'LOAD_ROLES_FULFILLED',

  createRole: title => ({
    type: roleActions.CREATE_ROLE,
    payload: { role: { title, completed: false } }
  }),

  createRoleFailed: error => ({
    type: roleActions.CREATE_ROLE_FAILED,
    payload: { error }
  }),

  createRoleFulfilled: role => ({
    type: roleActions.CREATE_ROLE_FULFILLED,
    payload: { role }
  }),

  removeRole: role => ({
    type: roleActions.REMOVE_ROLE,
    payload: { role }
  }),

  removeRoleFailed: error => ({
    type: roleActions.REMOVE_ROLE_FAILED,
    payload: { error }
  }),

  removeRoleFulfilled: role => ({
    type: roleActions.REMOVE_ROLE_FULFILLED,
    payload: { role }
  }),

  updateRole: (role, changes) => ({
    type: roleActions.UPDATE_ROLE,
    payload: { role, changes }
  }),
  updateRoleFailed: error => ({
    type: roleActions.UPDATE_ROLE_FAILED,
    payload: { error }
  }),
  updateRoleFulfilled: role => ({
    type: roleActions.UPDATE_ROLE_FULFILLED,
    payload: { role }
  }),

  filterRoles: filterType => ({
    type: roleActions.FILTER_ROLES,
    payload: { filterType }
  }),

  loadRolesFulfilled: roles => ({
    type: roleActions.LOAD_ROLES_FULFILLED,
    payload: { roles }
  })
};
