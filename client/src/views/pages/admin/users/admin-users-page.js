import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userActions, getVisibleUsers } from 'src/admin';

import UserList from 'src/components/admin/UserList';

const AdminUsersPage = ({ users,removeUser,updateUser }) => {
  return (
<UserList users={users} removeUser={removeUser} updateUser={updateUser}/>
  );
};

const mapStateToProps = state => ({
  users: getVisibleUsers(state)
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
