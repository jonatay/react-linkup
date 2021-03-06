import { aclFrontActions } from './acl-front-actions';
import { FirebaseAclData } from 'src/mid/firebase/index';

export const aclFrontData = new FirebaseAclData({
  onLoad: aclFrontActions.aclOnLoad,
  onAdd: aclFrontActions.aclOnAdd,
  onChange: aclFrontActions.aclOnChange,
  onRemove: aclFrontActions.aclOnRemove
});
