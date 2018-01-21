/*
    Jono : 18 01 19
    AclAllowDeny : React Class Component
*/
import React from 'react';
import { Input, Col, Button, Row } from 'antd';
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
    this.props.aclAllow(
      this.state.roles_array,
      this.state.resources_array,
      this.state.permissions_array
    );
    //this.setState({ roles: '', resources: '', permissions: '' });
  }
  handleRemovePermissions() {
    this.props.aclDeny(
      this.state.roles,
      this.state.resources,
      this.state.permissions
    );
    //this.setState({ roles: '', resources: '', permissions: '' });
  }

  render() {
    return (
      <Row style={{ paddingBottom: 15 }}>
        <Row style={{ lineHeight: 0 }}>
          <Col span={5} style={{ paddingLeft: 5 }}>
            <h5>allow/deny roles:</h5>
          </Col>
          <Col span={6} style={{ paddingLeft: 5 }}>
            <h5>resources:</h5>
          </Col>
          <Col span={4} style={{ paddingLeft: 5 }}>
            <h5>permissions:</h5>
          </Col>
          <Col span={7}>
            <p>{'<-'} use comma [,] to delimit lists</p>
          </Col>
        </Row>
        <Row>
          <InputGroup>
            <Col span={5}>
              <Input
                placeholder="roles"
                value={this.state.roles}
                onChange={this.handleInputChange.bind(this)}
              />
            </Col>
            <Col span={6}>
              <Input
                placeholder="resources"
                value={this.state.resources}
                onChange={this.handleInputChange.bind(this)}
              />
            </Col>
            <Col span={4}>
              <Input
                placeholder="permissions"
                value={this.state.permissions}
                onChange={this.handleInputChange.bind(this)}
              />
            </Col>
            <Col span={3}>
              <Button
                size="small"
                icon="plus-circle-o"
                onClick={this.handleAddPermissions.bind(this)}
                type="primary"
                disabled={
                  this.state.roles.length === 0 ||
                  this.state.resources.length === 0 ||
                  this.state.permissions.length === 0
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
                  this.state.roles.length === 0 ||
                  this.state.resources.length === 0 ||
                  this.state.permissions.length === 0
                }
              >
                deny
              </Button>
            </Col>
          </InputGroup>
        </Row>
      </Row>
    );
  }
}

export default AclAllowDeny;
