/*
    Jono : 18 01 21
    AclEditUserUsers : React Class Component
*/
import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Input, Button, Select } from 'antd';

class AclEditUserUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '', roles: [] };
  }
  handleRemoveUserParents() {
    if (this.state.user.length > 0) {
      this.props.aclRemoveUserRoles(this.state.user, this.state.roles);
    } else {
      this.props.aclRemoveRoles(this.state.roles);
    }
    this.setState({ ...this.state, user: '', roles: [] });
  }
  render() {
    const roleOptions = this.props.roles.map(role => (
      <Select.Option key={role}>{role}</Select.Option>
    ));
    const userOptions = this.props.users.map(user => (
      <Select.Option key={user.uid}>{user.name}</Select.Option>
    ));
    return (
      <Row style={{ paddingBottom: 15 }}>
        <Row style={{ lineHeight: 0 }}>
          <Col span={5} style={{ paddingLeft: 5 }}>
            <h5>user:</h5>
          </Col>
          <Col span={6} style={{ paddingLeft: 5 }}>
            <h5>[roles] to add/remove:</h5>
          </Col>
          <Col span={4} style={{ paddingLeft: 5 }} />
          <Col span={7}>
            <p>{'<-'} use comma [,] to delimit [lists]</p>
          </Col>
        </Row>
        <Row>
          <Input.Group>
            <Col span={5}>
              <Select
                placeholder="user"
                style={{ width: '100%' }}
                value={this.state.user}
                onChange={value =>
                  this.setState({ ...this.state, user: value })
                }
              >
                {userOptions}
              </Select>
              {/*/>*/}
            </Col>
            <Col span={10}>
              <Select
                mode="tags"
                value={this.state.roles}
                style={{ width: '100%' }}
                placeholder="[roles]"
                onChange={value =>
                  this.setState({ ...this.state, roles: value })
                }
                tokenSeparators={[',']}
              >
                {roleOptions}
              </Select>
            </Col>
            <Col span={3}>
              <Button
                size="small"
                icon="plus-circle-o"
                onClick={() => {
                  this.props.aclAddUserRoles(this.state.user, this.state.roles);
                  this.setState({ user: '', roles: [] });
                }}
                type="primary"
                disabled={
                  this.state.user.length === 0 || this.state.roles.length === 0
                }
              >
                add
              </Button>
            </Col>
            <Col span={3}>
              <Button
                size="small"
                icon="minus-circle-o"
                onClick={this.handleRemoveUserParents.bind(this)}
                type="danger"
                disabled={this.state.roles.length === 0}
              >
                {this.state.user.length > 0
                  ? 'remove roles'
                  : 'remove user roles'}
              </Button>
            </Col>
          </Input.Group>
        </Row>
      </Row>
    );
  }
}

AclEditUserUsers.propTypes = {
  aclAddUserRoles: PropTypes.func.isRequired,
  aclRemoveUserRoles: PropTypes.func.isRequired,
  aclRemoveRoles: PropTypes.func.isRequired
};

export default AclEditUserUsers;
