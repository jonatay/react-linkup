/*
    Jono : 18 01 09
    UserTable : React Class Component
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { List as ImList } from 'immutable';
import { Avatar, Button, List, Popconfirm, Table } from 'antd';

import EditTagGroup from './EditTagGroup';

export class UserTable extends Component {
  constructor() {
    super(...arguments);

    this.state = { editing: false };

    this.edit = this.edit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.remove = this.remove.bind(this);
    this.toggleDisabled = this.toggleDisabled.bind(this);
  }

  columns = [
    {
      dataIndex: 'photoURL',
      render: text => <Avatar src={text} />
    },
    {
      title: 'Name',
      dataIndex: 'displayName',
      render: (text, record) => <strong>{record.displayName}</strong>
    },
    {
      title: 'E-Mail',
      dataIndex: 'email'
    },
    {
      title: 'Status',
      dataIndex: 'disabled',
      render: (text, record) => (
        <div>
          {record.uid === this.props.authUser.uid ? (
            ''
          ) : (
            <div>
              <Button
                onClick={() => this.toggleDisabled(record)}
                type={!record.disabled ? 'default' : 'danger'}
                icon={!record.disabled ? 'check-square' : 'close-square'}
              >
                {/*{!record.disabled ? 'active' : 'disabled'}*/}
              </Button>
            </div>
          )}
        </div>
      )
    },
    {
      dataIndex: 'customClaims',
      render: (text, record) => {
        return (
          <EditTagGroup
            tagName="Role"
            tags={record.customClaims.roles || []}
            handleTagsChange={roles => this.handleRolesChange(record, roles)}
          />
        );
      }
    },
    {
      dataIndex: 'uid',
      render: (text, record) => (
        <div>
          {record.uid === this.props.authUser.uid ? (
            ''
          ) : (
            <Popconfirm
              title="Are you SURE you want to delete this user?"
              onConfirm={() => this.remove(record)}
            >
              <Button type="danger" icon="delete" />
            </Popconfirm>
          )}
        </div>
      )
    }
  ];

  edit() {
    this.setState({ editing: true });
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.save(event);
    } else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  remove(user) {
    this.props.removeUser(user);
  }

  toggleDisabled(user) {
    //const { user } = this.props;
    this.props.updateUser(user, { disabled: !user.disabled });
  }

  setIsAdmin(user, isAdmin) {
    this.props.updateUser(user, { admin: isAdmin });
  }
  handleRolesChange(user, roles) {
    //this.props.updateUser(user, { roles: roles });
    const oldRoles =
      user.customClaims && user.customClaims.roles
        ? user.customClaims.roles
        : [];
    // console.log(oldRoles, roles);
    let addRoles = roles.filter(x => !oldRoles.includes(x));
    let delRoles = oldRoles.filter(x => !roles.includes(x));
    // console.log(addRoles, delRoles);
    if (addRoles.length > 0) {
      this.props.addUserRoles(user.uid, addRoles);
    }
    if (delRoles.length > 0) {
      this.props.removeUserRoles(user.uid, delRoles);
    }
  }

  render() {
    const { users } = this.props;
    return (
      <Table
        rowKey="uid"
        dataSource={users.toArray()}
        columns={this.columns}
        expandedRowRender={record => {
          const creationTime = record.metadata.creationTime;
          const lastSignInTime = record.metadata.lastSignInTime;
          const provider = record.providerData[0].providerId;
          return (
            <List itemLayout="vertical" grid={{ gutter: 5, column: 6 }}>
              <List.Item>
                <List.Item.Meta title="user created:" />
                <Moment format={'YY-MM-DD'}>{creationTime}</Moment>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="last sign-in:" />
                <Moment format={'YY-MM-DD HH:mm'}>{lastSignInTime}</Moment>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="provider:" />
                {provider}
              </List.Item>
              <List.Item>
                <List.Item.Meta title="roles" />
                <EditTagGroup
                  tagName="Role"
                  tags={record.customClaims.roles || []}
                  handleTagsChange={roles =>
                    this.handleRolesChange(record, roles)
                  }
                />
              </List.Item>
            </List>
          );
        }}
        size="small"
      />
    );
  }
}

UserTable.propTypes = {
  removeUser: PropTypes.func.isRequired,
  users: PropTypes.instanceOf(ImList),
  updateUser: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
  addUserRoles: PropTypes.func.isRequired,
  removeUserRoles: PropTypes.func.isRequired
};

export default UserTable;
/*

 <Button
            onClick={() => this.setIsAdmin(record, !isAdmin)}
            type={!isAdmin ? 'default' : 'danger'}
            icon={!isAdmin ? 'check-square' : 'close-square'}
          >
            {isAdmin ? 'admin' : 'not-admin'}
          </Button>


 */
