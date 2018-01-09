import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userActions, getVisibleUsers } from 'src/admin';
import { getAuthUser } from "src/auth";

import UserTable from 'src/components/admin/UserTable';

const AdminUsersPage = ({ users,authUser, removeUser,updateUser }) => {
  return (
<UserTable users={users} authUser={authUser} removeUser={removeUser} updateUser={updateUser}/>
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
  updateUser: userActions.updateUser
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminUsersPage)
);
