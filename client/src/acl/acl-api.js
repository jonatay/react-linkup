import { ApiBase } from 'src/api';

class AclApi extends ApiBase {
  aclAllow(payload) {
    return this.customApiCall(null, 'acl-allow', payload, 'POST');
  }

  aclDeny(payload) {
    return this.customApiCall(null, 'acl-deny', payload, 'DELETE');
  }
}

export const aclApi = new AclApi();
