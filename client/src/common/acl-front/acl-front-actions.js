export const aclFrontActions = {
  ACL_FRONT_ON_SET_UID: 'ACL_FRONT_ON_SET_UID',
  aclOnSetUid: uid => ({
    type: aclFrontActions.ACL_FRONT_ON_SET_UID,
    payload: { uid }
  }),
  ACL_FRONT_ON_LOAD: 'ACL_FRONT_ON_LOAD',
  aclOnLoad: acl => ({
    type: aclFrontActions.ACL_FRONT_ON_LOAD,
    payload: { acl }
  }),
  ACL_FRONT_ON_ADD: 'ACL_FRONT_ON_ADD',
  aclOnAdd: data => ({
    type: aclFrontActions.ACL_FRONT_ON_ADD,
    payload: { data }
  }),
  ACL_FRONT_ON_CHANGE: 'ACL_FRONT_ON_CHANGE',
  aclOnChange: data => ({
    type: aclFrontActions.ACL_FRONT_ON_CHANGE,
    payload: { data }
  }),
  ACL_FRONT_ON_REMOVE: 'ACL_FRONT_ON_REMOVE',
  aclOnRemove: data => ({
    type: aclFrontActions.ACL_FRONT_ON_REMOVE,
    payload: { data }
  })
};
