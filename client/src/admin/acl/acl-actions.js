export const aclActions = {
  ACL_LOAD_DATA: 'ACL_LOAD_DATA',
  aclLoadData: payload => ({
    type: aclActions.ACL_LOAD_DATA,
    payload: { payload }
  }),
  ACL_CLEAR_DATA: 'ACL_CLEAR_DATA',
  alcClearData: payclear => ({
    type: aclActions.ACL_CLEAR_DATA,
    payclear: { payclear }
  }),
  
  ACL_REMOVE_RESOURCES: 'ACL_REMOVE_RESOURCES',
  aclRemoveResources: resources => ({
    type: aclActions.ACL_REMOVE_RESOURCES,
    payload: { resources }
  }),

  ACL_REMOVE_RESOURCE: 'ACL_REMOVE_RESOURCE',
  ACL_REMOVE_RESOURCE_OK: 'ACL_REMOVE_RESOURCE_OK',
  ACL_REMOVE_RESOURCE_FAIL: 'ACL_REMOVE_RESOURCE_FAIL',
  aclRemoveResource: resource => ({
    type: aclActions.ACL_REMOVE_RESOURCE,
    payload: { resource }
  }),
  aclRemoveResourceOk: payload => ({
    type: aclActions.ACL_REMOVE_RESOURCE_OK,
    payload: { payload }
  }),
  aclRemoveResourceFail: payload => ({
    type: aclActions.ACL_REMOVE_RESOURCE_FAIL,
    payload: { payload }
  }),

  ACL_REMOVE_ROLES: 'ACL_REMOVE_ROLES',
  aclRemoveRoles: roles => ({
    type: aclActions.ACL_REMOVE_ROLES,
    payload: { roles }
  }),

  ACL_REMOVE_ROLE: 'ACL_REMOVE_ROLE',
  ACL_REMOVE_ROLE_OK: 'ACL_REMOVE_ROLE_OK',
  ACL_REMOVE_ROLE_FAIL: 'ACL_REMOVE_ROLE_FAIL',
  aclRemoveRole: role => ({
    type: aclActions.ACL_REMOVE_ROLE,
    payload: { role }
  }),
  aclRemoveRoleOk: payload => ({
    type: aclActions.ACL_REMOVE_ROLE_OK,
    payload: { payload }
  }),
  aclRemoveRoleFail: payload => ({
    type: aclActions.ACL_REMOVE_ROLE_FAIL,
    payload: { payload }
  }),

  ACL_ADD_USER_ROLES: 'ACL_ADD_USER_ROLES',
  ACL_ADD_USER_ROLES_OK: 'ACL_ADD_USER_ROLES_OK',
  ACL_ADD_USER_ROLES_FAIL: 'ACL_ADD_USER_ROLES_FAIL',
  aclAddUserRoles: (uid, roles) => ({
    type: aclActions.ACL_ADD_USER_ROLES,
    payload: { uid, roles }
  }),
  aclAddUserRolesOk: payload => ({
    type: aclActions.ACL_ADD_USER_ROLES_OK,
    payload: { payload }
  }),
  aclAddUserRolesFail: payload => ({
    type: aclActions.ACL_ADD_USER_ROLES_FAIL,
    payload: { payload }
  }),

  ACL_REMOVE_USER_ROLES: 'ACL_REMOVE_USER_ROLES',
  ACL_REMOVE_USER_ROLES_OK: 'ACL_REMOVE_USER_ROLES_OK',
  ACL_REMOVE_USER_ROLES_FAIL: 'ACL_REMOVE_USER_ROLES_FAIL',
  aclRemoveUserRoles: (uid, roles) => ({
    type: aclActions.ACL_REMOVE_USER_ROLES,
    payload: { uid, roles }
  }),
  aclRemoveUserRolesOk: payload => ({
    type: aclActions.ACL_REMOVE_USER_ROLES_OK,
    payload: { payload }
  }),
  aclRemoveUserRolesFail: payload => ({
    type: aclActions.ACL_REMOVE_USER_ROLES_FAIL,
    payload: { payload }
  }),

  ACL_ADD_ROLE_PARENTS: 'ACL_ADD_ROLE_PARENTS',
  aclAddRoleParents: (role, parents) => ({
    type: aclActions.ACL_ADD_ROLE_PARENTS,
    payload: { role, parents }
  }),
  ACL_ADD_ROLE_PARENTS_OK: 'ACL_ADD_ROLE_PARENTS_OK',
  aclAddRoleParentsOk: payload => ({
    type: aclActions.ACL_ADD_ROLE_PARENTS_OK,
    payload: { payload }
  }),
  ACL_ADD_ROLE_PARENTS_FAIL: 'ACL_ADD_ROLE_PARENTS_FAIL',
  aclAddRoleParentsFail: payload => ({
    type: aclActions.ACL_ADD_ROLE_PARENTS_FAIL,
    payload: { payload }
  }),
  ACL_REMOVE_ROLE_PARENTS: 'ACL_REMOVE_ROLE_PARENTS',
  aclRemoveRoleParents: (role, parents) => ({
    type: aclActions.ACL_REMOVE_ROLE_PARENTS,
    payload: { role, parents }
  }),
  ACL_REMOVE_ROLE_PARENTS_OK: 'ACL_REMOVE_ROLE_PARENTS_OK',
  aclRemoveRoleParentsOk: payload => ({
    type: aclActions.ACL_REMOVE_ROLE_PARENTS_OK,
    payload: { payload }
  }),
  ACL_REMOVE_ROLE_PARENTS_FAIL: 'ACL_REMOVE_ROLE_PARENTS_FAIL',
  aclRemoveRoleParentsFail: payload => ({
    type: aclActions.ACL_REMOVE_ROLE_PARENTS_FAIL,
    payload: { payload }
  }),

  ACL_LOADED_OK: 'ACL_LOADED_OK',
  aclLoadedOk: acl => ({
    type: aclActions.ACL_LOADED_OK,
    payload: { acl }
  }),
  ACL_ON_ADD: 'ACL_ON_ADD',
  aclOnAdd: data => ({
    type: aclActions.ACL_ON_ADD,
    payload: { data }
  }),
  ACL_ON_CHANGE: 'ACL_ON_CHANGE',
  aclOnChange: data => ({
    type: aclActions.ACL_ON_CHANGE,
    payload: { data }
  }),
  ACL_ON_REMOVE: 'ACL_ON_REMOVE',
  aclOnRemove: data => ({
    type: aclActions.ACL_ON_REMOVE,
    payload: { data }
  }),
  ACL_ALLOW: 'ACL_ALLOW',
  aclAllow: (roles, resources, permissions) => ({
    type: aclActions.ACL_ALLOW,
    payload: { roles, resources, permissions }
  }),
  ACL_ALLOW_OK: 'ACL_ALLOW_OK',
  aclAllowOk: payload => ({
    type: aclActions.ACL_ALLOW_OK,
    payload: { payload }
  }),
  ACL_ALLOW_FAIL: 'ACL_ALLOW_FAIL',
  aclAllowFail: payload => ({
    type: aclActions.ACL_ALLOW_FAIL,
    payload: { payload }
  }),
  ACL_DENY: 'ACL_DENY',
  aclDeny: (roles, resources, permissions) => ({
    type: aclActions.ACL_DENY,
    payload: { roles, resources, permissions }
  }),
  ACL_DENY_OK: 'ACL_DENY_OK',
  aclDenyOk: payload => ({
    type: aclActions.ACL_DENY_OK,
    payload: { payload }
  }),
  ACL_DENY_FAIL: 'ACL_DENY_FAIL',
  aclDenyFail: payload => ({
    type: aclActions.ACL_DENY_FAIL,
    payload: { payload }
  })
};
