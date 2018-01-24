/*
    Jono : 18 01 19
    AclAllowDeny : React Class Component
*/
import React from 'react';
import { Input, Col, Button, Row, Select } from 'antd';
const InputGroup = Input.Group;

class AclAllowDeny extends React.Component {
  constructor(props) {
    super(props);
    this.state = { roles: [], resources: [], permissions: [] };
  }

  handleInputChange(e) {
    let val = e.target.value.split(',');
    this.setState({
      [e.target.placeholder]: val,
      [e.target.placeholder + '_array']: val.filter(n => n !== '')
    });
  }
  handleAddPermissions() {
    const { roles, resources, permissions } = this.state;
    this.props.aclAllow(roles, resources, permissions);
    this.setState({ roles: [], resources: [], permissions: [] });
  }
  handleRemovePermissions() {
    const { roles, resources, permissions } = this.state;
    if (roles.length === 0) {
      this.props.aclRemoveResources(resources);
    } else {
      this.props.aclDeny(roles, resources, permissions);
    }
    this.setState({ roles: [], resources: [], permissions: [] });
  }

  render() {
    const roleOptions = this.props.roles.map(role => (
      <Select.Option key={role}>{role}</Select.Option>
    ));
    const resourceOptions = this.props.resources.map(resource => (
      <Select.Option key={resource}>{resource}</Select.Option>
    ));
    const permissionOptions = this.props.permissions.map(permission => (
      <Select.Option key={permission}>{permission}</Select.Option>
    ));
    const state = this.state;
    const { roles, resources, permissions } = state;
    return (
      <Row style={{ paddingBottom: 15 }}>
        <Row style={{ lineHeight: 0 }}>
          <Col span={5} style={{ paddingLeft: 5 }}>
            <h5>allow/deny [roles]:</h5>
          </Col>
          <Col span={6} style={{ paddingLeft: 5 }}>
            <h5>[resources]:</h5>
          </Col>
          <Col span={4} style={{ paddingLeft: 5 }}>
            <h5>[permissions]:</h5>
          </Col>
          <Col span={7}>
            <p>{'<-'} use comma [,] to delimit [lists]</p>
          </Col>
        </Row>
        <Row>
          <InputGroup>
            <Col span={5}>
              <Select
                mode="tags"
                value={roles}
                style={{ width: '100%' }}
                placeholder="[roles]"
                onChange={value => this.setState({ ...state, roles: value })}
                tokenSeparators={[',']}
              >
                {roleOptions}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                mode="tags"
                value={resources}
                style={{ width: '100%' }}
                placeholder="[resources]"
                onChange={value =>
                  this.setState({ ...state, resources: value })
                }
                tokenSeparators={[',']}
              >
                {resourceOptions}
              </Select>
            </Col>
            <Col span={4}>
              <Select
                mode="tags"
                value={permissions}
                style={{ width: '100%' }}
                placeholder="[permissions]"
                onChange={value =>
                  this.setState({ ...state, permissions: value })
                }
                tokenSeparators={[',']}
              >
                {permissionOptions}
              </Select>
            </Col>
            <Col span={3}>
              <Button
                size="small"
                icon="plus-circle-o"
                onClick={this.handleAddPermissions.bind(this)}
                type="primary"
                disabled={
                  roles.length === 0 ||
                  resources.length === 0 ||
                  permissions.length === 0
                }
              >
                allow
              </Button>
            </Col>
            <Col span={3}>
              <Button
                size="small"
                icon="minus-circle-o"
                onClick={this.handleRemovePermissions.bind(this)}
                type="danger"
                disabled={
                  (roles.length === 0 ||
                    permissions.length === 0 ||
                    resources.length === 0) &&
                  !(
                    roles.length === 0 &&
                    permissions.length === 0 &&
                    resources.length > 0
                  )
                }
              >
                {roles.length === 0 &&
                permissions.length === 0 &&
                resources.length > 0
                  ? 'remove resources'
                  : 'remove'}
              </Button>
            </Col>
          </InputGroup>
        </Row>
      </Row>
    );
  }
}

export default AclAllowDeny;
