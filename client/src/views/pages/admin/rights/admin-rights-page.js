import React from 'react';
import { Tabs, Icon } from 'antd';

import RolesContainer from 'src/components/admin/acl/RolesContainer';

const TabPane = Tabs.TabPane;

// const callback = key => {
//   console.log(key);
// };

const AdminRightsPage = () => {
  return (
    <Tabs defaultActiveKey="roles">
      <TabPane
        tab={
          <span>
            <Icon type="folder-open" />roles
          </span>
        }
        key="roles"
      >
        <RolesContainer />
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type="file" />resources
          </span>
        }
        key="resources"
      >
        Content of Tab Pane 2
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type="team" />users
          </span>
        }
        key="users"
      >
        Content of Tab Pane 3
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type="lock" />rights
          </span>
        }
        key="rights"
      >
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};
//
// AdminRightsPage.propTypes = {
//
// };
//
// //=====================================
// //  CONNECT
// //-------------------------------------
//
// const mapStateToProps = state => ({
//
// });
//
// const mapDispatchToProps = {
//
// };
//
// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(AdminRightsPage)
// );
export default AdminRightsPage;