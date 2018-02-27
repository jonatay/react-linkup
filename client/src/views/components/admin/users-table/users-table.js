/*
    Jono : 18 01 09
    UsersTable : React Class Component
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { List as ImList } from 'immutable';
import { Avatar, Button, List, Popconfirm, Table, Tag, Card } from 'antd';

export class UsersTable extends Component {
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
      title: 'Roles',
      render: (text, record) => (
        <span>
          {record.customClaims && Array.isArray(record.customClaims.roles) ? (
            record.customClaims.roles.map(role => (
              <Tag color="geekblue" key={role}>
                {role}`
              </Tag>
            ))
          ) : (
            <p>none</p>
          )}
        </span>
      )
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
            <List itemLayout="vertical" grid={{ column: 4 }}>
              <List.Item>
                <Card title="created" size="small">
                  <Moment format={'YY-MM-DD'}>{creationTime}</Moment>
                </Card>
              </List.Item>
              <List.Item>
                <Card title="last sign-in">
                  <Moment format={'YY-MM-DD HH:mm'}>{lastSignInTime}</Moment>
                </Card>
              </List.Item>
              <List.Item>
                <Card title="provider">{provider}</Card>
              </List.Item>
            </List>
          );
        }}
        size="small"
      />
    );
  }
}

UsersTable.propTypes = {
  removeUser: PropTypes.func.isRequired,
  users: PropTypes.instanceOf(ImList),
  updateUser: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired
};

export default UsersTable;
/*

 <Button
            onClick={() => this.setIsAdmin(record, !isAdmin)}
            type={!isAdmin ? 'default' : 'danger'}
            icon={!isAdmin ? 'check-square' : 'close-square'}
          >
            {isAdmin ? 'admin' : 'not-admin'}
          </Button>


 */
