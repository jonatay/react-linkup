/*
    Jono : 18 01 13
    RolesContainer : Stateless Functional Component
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Collapse, Row } from 'antd';

import { getAclTree, getRoles, getResources, getPermissions } from 'src/common';
import { aclActions, getUsersList } from 'src/admin';

import AclAllowDeny from './acl/AclAllowDeny';
import AclEditRoleParents from './acl/AclEditRoleParents';
import AclEditUserRoles from './acl/AclEditUserRoles';
import AclTree from './acl/AclTree';

class RightsContainer extends React.Component {
  render() {
    const { aclTree } = this.props;
    return (
      <Row>
        <Row>
          <Collapse defaultActiveKey="edit_acl">
            <Collapse.Panel key="edit_acl" header={<h4>Edit acl</h4>}>
              <AclEditUserRoles
                users={this.props.users}
                roles={this.props.roles}
                aclAddUserRoles={this.props.aclAddUserRoles}
                aclRemoveUserRoles={this.props.aclRemoveUserRoles}
                aclRemoveRoles={this.props.aclRemoveRoles}
              />
              <AclAllowDeny
                aclAllow={this.props.aclAllow}
                aclDeny={this.props.aclDeny}
                roles={this.props.roles}
                resources={this.props.resources}
                permissions={this.props.permissions}
                aclRemoveResources={this.props.aclRemoveResources}
              />
              <AclEditRoleParents
                aclAddRoleParents={this.props.aclAddRoleParents}
                aclRemoveRoleParents={this.props.aclRemoveRoleParents}
              />
            </Collapse.Panel>
          </Collapse>
        </Row>
        <Row style={{ paddingTop: 10 }}>
          <AclTree aclTree={aclTree} />
        </Row>
      </Row>
    );
  }
}

RightsContainer.propTypes = {
  aclTree: PropTypes.array.isRequired,
  aclAllow: PropTypes.func.isRequired,
  aclDeny: PropTypes.func.isRequired,
  aclAddRoleParents: PropTypes.func.isRequired,
  aclRemoveRoleParents: PropTypes.func.isRequired,
  aclAddUserRoles: PropTypes.func.isRequired,
  aclRemoveUserRoles: PropTypes.func.isRequired,
  aclRemoveRoles: PropTypes.func.isRequired,
  aclRemoveResources: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  aclTree: getAclTree(state),
  roles: getRoles(state),
  users: getUsersList(state),
  resources: getResources(state),
  permissions: getPermissions(state)
});

const mapDispatchToProps = {
  aclAllow: aclActions.aclAllow,
  aclDeny: aclActions.aclDeny,
  aclAddRoleParents: aclActions.aclAddRoleParents,
  aclRemoveRoleParents: aclActions.aclRemoveRoleParents,
  aclAddUserRoles: aclActions.aclAddUserRoles,
  aclRemoveUserRoles: aclActions.aclRemoveUserRoles,
  aclRemoveRoles: aclActions.aclRemoveRoles,
  aclRemoveResources: aclActions.aclRemoveResources
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RightsContainer)
);

/*
const RightsContainer = ({ roles, createRole, removeRole, updateRole }) => {

 */