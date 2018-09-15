import { aclActions } from './acl-actions';
import { FirebaseAclData } from "src/mid/firebase/index";

export const aclData = new FirebaseAclData({
  onLoad: aclActions.aclLoadedOk,
  onAclAllow: aclActions.aclAllowOk,
  onAclDeny: aclActions.aclDenyOk,
  onAdd: aclActions.aclOnAdd,
  onChange: aclActions.aclOnChange,
  onRemove: aclActions.aclOnRemove
});
