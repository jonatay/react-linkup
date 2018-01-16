import { FirebaseList } from 'src/firebase';
import { roleActions } from './role-actions';
import { Role } from './role';
//import { firebaseDb } from "../../firebase/firebase";

//custom storage solution cause node_acl does things differently
class RoleFirebaseList extends FirebaseList {
  unwrapSnapshot(snapshot) {
    let attrs = { users: [] };
    let val = snapshot.val();
    for (let k in val) {
      attrs.users.push({ name: k, val: val[k] });
    }
    attrs.key = snapshot.key;
    attrs.title = snapshot.key;
    // const newRec = new this._modelClass(attrs)
    // console.log( attrs, newRec)
    return new this._modelClass(attrs);
  }

  wrapValue(value) {
    return { key: value.key, ...value.users };
  }

  push(value) {
    super.push(this.wrapValue(value));
  }

  update(key, value) {
    super.update(key, this.wrapValue(value));
  }
}

export const roleList = new RoleFirebaseList(
  {
    onAdd: roleActions.createRoleFulfilled,
    onChange: roleActions.updateRoleFulfilled,
    onLoad: roleActions.loadRolesFulfilled,
    onRemove: roleActions.removeRoleFulfilled
  },
  Role
);
