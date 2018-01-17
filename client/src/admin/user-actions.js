export const userActions = {
  CREATE_USER: 'CREATE_USER',
  CREATE_USER_FAILED: 'CREATE_USER_FAILED',
  CREATE_USER_FULFILLED: 'CREATE_USER_FULFILLED',

  REMOVE_USER: 'REMOVE_USER',
  REMOVE_USER_FAILED: 'REMOVE_USER_FAILED',
  REMOVE_USER_FULFILLED: 'REMOVE_USER_FULFILLED',

  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',
  UPDATE_USER_FULFILLED: 'UPDATE_USER_FULFILLED',

  LOAD_USERS: 'LOAD_USERS',
  FILTER_USERS: 'FILTER_USERS',
  LOAD_USERS_FULFILLED: 'LOAD_USERS_FULFILLED',
  LOAD_USERS_FAILED: 'LOAD_USERS_FAILED',

  ADD_USER_ROLES: 'ADD_USER_ROLES',
  ADD_USER_ROLES_FAILED: 'ADD_USER_ROLES_FAILED',
  ADD_USER_ROLES_FULFILLED: 'ADD_USER_ROLES_FULFILLED',

  REMOVE_USER_ROLES: 'REMOVE_USER_ROLES',
  REMOVE_USER_ROLES_FAILED: 'REMOVE_USER_ROLES_FAILED',
  REMOVE_USER_ROLES_FULFILLED: 'REMOVE_USER_ROLES_FULFILLED',


  loadUsers: () => ({
    type: userActions.LOAD_USERS
  }),

  createUser: title => ({
    type: userActions.CREATE_USER,
    payload: { user: { title, completed: false } }
  }),

  createUserFailed: error => ({
    type: userActions.CREATE_USER_FAILED,
    payload: { error }
  }),

  createUserFulfilled: user => ({
    type: userActions.CREATE_USER_FULFILLED,
    payload: { user }
  }),

  removeUser: user => ({
    type: userActions.REMOVE_USER,
    payload: { user }
  }),

  removeUserFailed: error => ({
    type: userActions.REMOVE_USER_FAILED,
    payload: { error }
  }),

  removeUserFulfilled: user => ({
    type: userActions.REMOVE_USER_FULFILLED,
    payload: { user }
  }),

  updateUser: (user, changes) => ({
    type: userActions.UPDATE_USER,
    payload: { user, changes }
  }),

  updateUserFailed: error => ({
    type: userActions.UPDATE_USER_FAILED,
    payload: { error }
  }),

  updateUserFulfilled: user => ({
    type: userActions.UPDATE_USER_FULFILLED,
    payload: { user }
  }),

  filterUsers: filterType => ({
    type: userActions.FILTER_USERS,
    payload: { filterType }
  }),

  loadUsersFulfilled: users => ({
    type: userActions.LOAD_USERS_FULFILLED,
    payload: { users }
  }),

  loadUsersFailed: error => ({
    type: userActions.LOAD_USERS_FAILED,
    payload: { error }
  }),

  addUserRoles: (uid, roles) => ({
    type: userActions.ADD_USER_ROLES,
    payload: { uid, roles }
  }),
  addUserRolesFailed: error => ({
    type: userActions.ADD_USER_ROLES_FAILED,
    payload: { error }
  }),
  addUserRolesFulfilled: roles => ({
    type: userActions.ADD_USER_ROLES_FULFILLED,
    payload: { roles }
  }),

  removeUserRoles: (uid, roles) => ({
    type: userActions.REMOVE_USER_ROLES,
    payload: { uid, roles }
  }),
  removeUserRolesFailed: error => ({
    type: userActions.REMOVE_USER_ROLES_FAILED,
    payload: { error }
  }),
  removeUserRolesFulfilled: roles => ({
    type: userActions.REMOVE_USER_ROLES_FULFILLED,
    payload: { roles }
  })
};
