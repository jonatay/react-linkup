import { ApiList } from 'src/api/index';
import { userActions } from './user-actions';
import { User } from './user';

const userPath = 'admin/users';

class UserApiList extends ApiList {
  addUserRoles(uid, roles) {
    return this.customApiCall(uid, 'add-user-roles', roles, 'POST')
      .then(res => res)
      .catch(e => e);
  }
  removeUserRoles(uid, roles) {
    return this.customApiCall(uid, 'remove-user-roles', roles, 'DELETE')
      .then(res => res)
      .catch(e => e);
  }
}

export const userList = new UserApiList(
  {
    onAdd: userActions.createUserFulfilled,
    onChange: userActions.updateUserFulfilled,
    onLoad: userActions.loadUsersFulfilled,
    onRemove: userActions.removeUserFulfilled
    // onAddUserRoles: userActions.addUserRolesFulfilled,
    // onRemoveUserRoles: userActions.removeUserRolesFulfilled
  },
  User,
  userPath
);
