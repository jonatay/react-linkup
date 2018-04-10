/*
    Jono : 18 04 06
    AdminUsersPage : Stateless Functional Component
*/
import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userActions, getVisibleUsers } from 'src/admin/users';
import { getAuthUser } from 'src/common/auth';
import { UsersTable } from 'src/views/components/admin/users-table';
import PageHeader from '../../../components/common/page-header/PageHeader';

const AdminUsersPage = ({ userList, authUser, removeUser, updateUser }) => {
  return (
    <div>
      <PageHeader>admin-users</PageHeader>
      <UsersTable
        users={userList}
        authUser={authUser}
        removeUser={removeUser}
        updateUser={updateUser}
      />
    </div>
  );
};

AdminUsersPage.propTypes = {
  userList: PropTypes.instanceOf(List).isRequired,
  authUser: PropTypes.object.isRequired,
  loadUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userList: getVisibleUsers(state),
  authUser: getAuthUser(state)
});

const mapDispatchToProps = {
  createUser: userActions.createUser,
  filterUsers: userActions.filterUsers,
  removeUser: userActions.removeUser,
  updateUser: userActions.updateUser,
  addUserRoles: userActions.addUserRoles,
  removeUserRoles: userActions.removeUserRoles,
  loadUsers: userActions.loadUsers
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminUsersPage)
);
