import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userActions, getVisibleUsers } from 'src/admin/users/index';
import { getAuthUser } from 'src/common/auth';

import UserTable from 'src/components/admin/UserTable';

const AdminUsersPage = ({
  users,
  authUser,
  removeUser,
  updateUser,
  addUserRoles,
  removeUserRoles
}) => {
  return (
    <UserTable
      users={users}
      authUser={authUser}
      removeUser={removeUser}
      updateUser={updateUser}
      addUserRoles={addUserRoles}
      removeUserRoles={removeUserRoles}
    />
  );
};

const mapStateToProps = state => ({
  users: getVisibleUsers(state),
  authUser: getAuthUser(state)
});

const mapDispatchToProps = {
  createUser: userActions.createUser,
  filterUsers: userActions.filterUsers,
  removeUser: userActions.removeUser,
  updateUser: userActions.updateUser,
  addUserRoles: userActions.addUserRoles,
  removeUserRoles: userActions.removeUserRoles
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminUsersPage)
);
