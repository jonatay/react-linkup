import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userActions, getVisibleUsers } from 'src/admin/users';
import { getAuthUser } from 'src/common/auth';
import { UsersTable } from 'src/views/components/admin/users-table';
import AclTree from 'src/views/components/admin/acl-tree';
import { getAclTree, getRoles, getResources, getPermissions } from 'src/common';
import { aclActions, getUsersList } from 'src/admin';

import AclAllowDeny from 'src/views/components/admin/acl-allow-deny';
import AclEditRoleParents from 'src/views/components/admin/acl-edit-role-parents';
import AclEditUserRoles from 'src/views/components/admin/acl-edit-user-roles';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

class AdminContainer extends React.Component {

  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const props = this.props;
    return (
      <div>
        {/*<h3 style={{ paddingLeft: 10, color: '#1890ff' }}>Admin Page</h3>*/}
        <Tabs
          defaultActiveKey="rights"
          theme="dark"
          size="small"
          onChange={tab => {
            switch (tab) {
              case 'users':
                props.loadUsers();
                break;
              default:
                break;
            }
          }}
        >
          <TabPane
            key="rights"
            tab={
              <span>
                <Icon type="key" />Rights
              </span>
            }
          >
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
          </TabPane>
          <TabPane
            key="users"
            tab={
              <span>
                <Icon type="user" />Users
              </span>
            }
          >
            <UsersTable
              users={props.userList}
              authUser={props.authUser}
              removeUser={props.removeUser}
              updateUser={props.updateUser}
            />
          </TabPane>
          <TabPane
            key="acl"
            tab={
              <span>
                <Icon type="cloud-o" />Acl
              </span>
            }
          >
            <AclTree aclTree={props.aclTree} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

AdminContainer.propTypes = {
  aclTree: PropTypes.array.isRequired,
  aclAllow: PropTypes.func.isRequired,
  aclDeny: PropTypes.func.isRequired,
  aclAddRoleParents: PropTypes.func.isRequired,
  aclRemoveRoleParents: PropTypes.func.isRequired,
  aclAddUserRoles: PropTypes.func.isRequired,
  aclRemoveUserRoles: PropTypes.func.isRequired,
  aclRemoveRoles: PropTypes.func.isRequired,
  aclRemoveResources: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  loadUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  aclTree: getAclTree(state),
  roles: getRoles(state),
  users: getUsersList(state),
  resources: getResources(state),
  permissions: getPermissions(state),
  userList: getVisibleUsers(state),
  authUser: getAuthUser(state)
});

const mapDispatchToProps = {
  aclAllow: aclActions.aclAllow,
  aclDeny: aclActions.aclDeny,
  aclAddRoleParents: aclActions.aclAddRoleParents,
  aclRemoveRoleParents: aclActions.aclRemoveRoleParents,
  aclAddUserRoles: aclActions.aclAddUserRoles,
  aclRemoveUserRoles: aclActions.aclRemoveUserRoles,
  aclRemoveRoles: aclActions.aclRemoveRoles,
  aclRemoveResources: aclActions.aclRemoveResources,

  createUser: userActions.createUser,
  filterUsers: userActions.filterUsers,
  removeUser: userActions.removeUser,
  updateUser: userActions.updateUser,
  addUserRoles: userActions.addUserRoles,
  removeUserRoles: userActions.removeUserRoles,
  loadUsers: userActions.loadUsers
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
);
