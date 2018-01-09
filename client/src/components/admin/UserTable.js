/*
    Jono : 18 01 09
    UserTable : React Class Component
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { List as ImList } from 'immutable';
import { Avatar, Button, Popconfirm, Table } from 'antd';

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
      title: 'Created',
      dataIndex: 'metadata.creationTime',
      render: text => <Moment format={'YY-MM-DD'}>{text}</Moment>
    },
    {
      title: 'Last Access',
      dataIndex: 'metadata.lastSignInTime',
      render: text => <Moment format={'YY-MM-DD HH:mm'}>{text}</Moment>
    },
    {
      title: 'Provider',
      dataIndex: 'providerData[0].providerId'
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
                {!record.disabled ? 'active' : 'disabled'}
              </Button>
            </div>
          )}
        </div>
      )
    },
    {
      dataIndex: 'customClaims',
      render: (text, record) => {
        const isAdmin = text ? text.admin : false;
        return (
          <Button
            onClick={() => this.setIsAdmin(record, !isAdmin)}
            type={!isAdmin ? 'default' : 'danger'}
            icon={!isAdmin ? 'check-square' : 'close-square'}
          >
            {isAdmin ? 'admin' : 'not-admin'}
          </Button>
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
    this.props.updateUser(user, { isAdmin: isAdmin });
  }

  render() {
    const { users } = this.props;
    return (
      <Table
        dataSource={users.toArray()}
        columns={this.columns}
        rowKey="uid"
        size="small"
      />
    );
  }
}

// const UserTable = ({ removeUser, users, updateUser, authUser }) => {
//   return <Table dataSource={users.toArray()} columns={columns} rowKey="uid" />;
// };

UserTable.propTypes = {
  removeUser: PropTypes.func.isRequired,
  users: PropTypes.instanceOf(ImList),
  updateUser: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired
};

export default UserTable;

/*

      <List.Item key={user.uid}>
        <List.Item.Meta
          avatar={<Avatar src={user.photoURL} />}
          title={user.displayName}
          description={user.email === null ? '<no-email>' : user.email}
        />
        <div>
          {authUser.uid === user.uid ? (
            ''
          ) : (
            <div>
              <Button
                onClick={this.toggleDisabled}
                type={!user.disabled ? 'default' : 'danger'}
                icon={!user.disabled ? 'check-square' : 'close-square'}
              >
                {!user.disabled ? 'active' : 'disabled'}
              </Button>
              <Popconfirm
                title="Are you SURE you want to delete this user?"
                onConfirm={this.remove}
              >
                <Button type="danger" icon="delete" />
              </Popconfirm>
            </div>
          )}
        </div>
      </List.Item>
 */
