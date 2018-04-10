/*
    Jono : 18 04 06
    AdminRightsPage : Stateless Functional Component
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AclTree from 'src/views/components/admin/acl-tree';
import { getAclTree, getRoles, getResources, getPermissions } from 'src/common';
import { aclActions, getUsersList } from 'src/admin';

import AclAllowDeny from 'src/views/components/admin/acl-allow-deny';
import AclEditRoleParents from 'src/views/components/admin/acl-edit-role-parents';
import AclEditUserRoles from 'src/views/components/admin/acl-edit-user-roles';

import PageHeader from 'src/views/components/common/page-header';

const AdminRightsPage = props => {
  return (
    <div>
      <PageHeader>admin-rights</PageHeader>
      <AclEditUserRoles
        users={props.users}
        roles={props.roles}
        aclAddUserRoles={props.aclAddUserRoles}
        aclRemoveUserRoles={props.aclRemoveUserRoles}
        aclRemoveRoles={props.aclRemoveRoles}
      />
      <AclAllowDeny
        aclAllow={props.aclAllow}
        aclDeny={props.aclDeny}
        roles={props.roles}
        resources={props.resources}
        permissions={props.permissions}
        aclRemoveResources={props.aclRemoveResources}
      />
      <AclEditRoleParents
        aclAddRoleParents={props.aclAddRoleParents}
        aclRemoveRoleParents={props.aclRemoveRoleParents}
      />
      <AclTree aclTree={props.aclTree} />
    </div>
  );
};

AdminRightsPage.propTypes = {
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
  connect(mapStateToProps, mapDispatchToProps)(AdminRightsPage)
);
