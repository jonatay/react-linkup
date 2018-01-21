/*
    Jono : 18 01 21
    AclEditUserUsers : React Class Component
*/
import React from 'react';

import { Row, Col, Input, Button, Select } from 'antd';

class AclEditUserUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '', roles: [] };
  }
  render() {
    const roleOptions = this.props.roles.map(role => (
      <Select.Option key={role}>{role}</Select.Option>
    ));
    return (
      <Row>
        <Row style={{ lineHeight: 0 }}>
          <Col span={5} style={{ paddingLeft: 5 }}>
            <h5>user:</h5>
          </Col>
          <Col span={6} style={{ paddingLeft: 5 }}>
            <h5>roles to add/remove:</h5>
          </Col>
          <Col span={4} style={{ paddingLeft: 5 }} />
          <Col span={7}>
            <p>{'<-'} use comma [,] to delimit lists</p>
          </Col>
        </Row>
        <Row>
          <Input.Group>
            <Col span={5}>
              <Input
                value={this.state.user}
                placeholder="user"
                onChange={e =>
                  this.setState({ ...this.state, user: e.target.value })
                }
              />
            </Col>
            <Col span={10}>
              <Select
                mode="tags"
                value={this.state.roles}
                style={{ width: '100%' }}
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
                  this.props.aclAddUserRoles(
                    this.state.user.uid,
                    this.state.roles
                  );
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
                // onClick={this.handleRemoveUserParents.bind(this)}
                type="danger"
                disabled={
                  this.state.user.length === 0 || this.state.roles.length === 0
                }
              >
                remove
              </Button>
            </Col>
          </Input.Group>
        </Row>
      </Row>
    );
  }
}

export default AclEditUserUsers;
