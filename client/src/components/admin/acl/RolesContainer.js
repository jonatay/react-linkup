/*
    Jono : 18 01 13
    RolesContainer : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Input, Col, Button, Row } from 'antd';

import { getAclTree, roleActions, aclActions } from 'src/acl';

import RolesTree from './RolesTree';

const InputGroup = Input.Group;

class RolesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { roles: [], resources: [], permissions: [] };
  }

  handleAddPermissions() {
    this.props.aclAllow(
      this.state.roles,
      this.state.resources,
      this.state.permissions
    );
  }
  handleRemovePermissions() {
    this.props.aclDeny(
      this.state.roles,
      this.state.resources,
      this.state.permissions
    );
  }
  handleInputChange(e) {
    let val = e.target.value.split(',');
    console.log(val);
    this.setState({ [e.target.placeholder]: val.filter(n => n !== '') });
  }

  render() {
    const { aclTree } = this.props;
    return (
      <div>
        <Row>
          <Col span={5} style={{ paddingLeft: 5 }}>
            <h4>roles:</h4>
          </Col>
          <Col span={6} style={{ paddingLeft: 5 }}>
            <h4>resources:</h4>
          </Col>
          <Col span={4} style={{ paddingLeft: 5 }}>
            <h4>permissions:</h4>
          </Col>
          <Col span={7}>
            <p>{'<-'} use comma [,] to delimit lists</p>
          </Col>
        </Row>
        <Row>
          <InputGroup size="large">
            <Col span={5}>
              <Input
                placeholder="roles"
                onChange={this.handleInputChange.bind(this)}
              />
            </Col>
            <Col span={6}>
              <Input
                placeholder="resources"
                onChange={this.handleInputChange.bind(this)}
              />
            </Col>
            <Col span={4}>
              <Input
                placeholder="permissions"
                onChange={this.handleInputChange.bind(this)}
              />
            </Col>
            <Col span={3}>
              <Button
                size="large"
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
                size="large"
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
        <RolesTree aclTree={aclTree} />
      </div>
    );
  }
}

RolesContainer.propTypes = {
  aclTree: PropTypes.array.isRequired,
  createRole: PropTypes.func.isRequired,
  removeRole: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
  aclAllow: PropTypes.func.isRequired,
  aclDeny: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  aclTree: getAclTree(state)
});

const mapDispatchToProps = {
  createRole: roleActions.createRole,
  removeRole: roleActions.removeRole,
  updateRole: roleActions.updateRole,
  aclAllow: aclActions.aclAllow,
  aclDeny: aclActions.aclDeny
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RolesContainer)
);

/*
const RolesContainer = ({ roles, createRole, removeRole, updateRole }) => {

 */
