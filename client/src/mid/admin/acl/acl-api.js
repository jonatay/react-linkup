import { ApiBase } from 'src/mid/api/index';

class AclApi extends ApiBase {
  aclAllow(payload) {
    return this.customApiCall(null, 'acl-allow', payload, 'POST');
  }

  aclDeny(payload) {
    return this.customApiCall(null, 'acl-deny', payload, 'DELETE');
  }

  aclAddRoleParents(payload) {
    return this.customApiCall(null, 'add-role-parents', payload, 'POST');
  }

  aclRemoveRoleParents(payload) {
    return this.customApiCall(null, 'remove-role-parents', payload, 'DELETE');
  }

  aclAddUserRoles(payload) {
    return this.customApiCall(null, 'add-user-roles', payload, 'POST');
  }
  aclRemoveUserRoles(payload) {
    return this.customApiCall(null, 'remove-user-roles', payload, 'DELETE');
  }
  aclRemoveRole(payload) {
    return this.customApiCall(null, 'remove-role', payload, 'DELETE');
  }
  aclRemoveResource(payload) {
    return this.customApiCall(null, 'remove-resource', payload, 'DELETE');
  }
  
}

export const aclApi = new AclApi();
