export const aclActions = {
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
