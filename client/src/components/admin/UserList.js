import React from 'react';
import { List as ImList } from 'immutable';
import PropTypes from 'prop-types';

import { List } from 'antd';

import UserItem from './UserItem';

const UserList = ({ removeUser, users, updateUser, authUser }) => {
  let userItems = users.map((user, index) => {
    return (
      <UserItem
        removeUser={removeUser}
        key={index}
        user={user}
        updateUser={updateUser}
        authUser={authUser}
      />
    );
  });

  return <List itemLayout="horizontal">{userItems}</List>;
};

UserList.propTypes = {
  removeUser: PropTypes.func.isRequired,
  users: PropTypes.instanceOf(ImList),
  updateUser: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired
};

export default UserList;
