import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Avatar, Icon } from 'antd';
//import './header.css';

const SubMenu = Menu.SubMenu;

const iconCheat = {
  Admin:'tool',
  Fleet:'car',
  HR:'team'
}

const { Header } = Layout;
const AppHeader = ({
  authenticated,
  signOut,
  photoURL,
  navigateTo,
  aclFront
}) => {
  const handleMenuClick = ({ key }) => {
    if (key === 'signOut') {
      signOut();
    } else {
      navigateTo(`/${key}`);
    }
  };
  return (
    <Header
      style={{
        position: 'fixed',
        width: '100%',
        lineHeight: 40,
        height: 40,
        zIndex: 999
      }}
    >
      {/*<div className="logo" />*/}
      <Menu
        onClick={handleMenuClick}
        mode="horizontal"
        style={{ position: 'fixed', width: '100%', left: 0 }}
      >
        <SubMenu
          style={{ position: 'absolute', right: -10, top: 8 }}
          key="subUser"
          title={<Avatar src={photoURL} shape="square" size="default" />}
        >
          <Menu.Item key="100">User Profile</Menu.Item>
          <Menu.Item key="signOut">Logout</Menu.Item>
        </SubMenu>

        {aclFront.map(subMenu => (
          <SubMenu
            key={subMenu.resource}
            title={
              <span>
                <span><Icon type={iconCheat[subMenu.resource]} /></span>
                <span>{subMenu.resource.toLowerCase()}</span>
              </span>
            }
          >
            {subMenu.children.map(menu => (
              <Menu.Item key={`${subMenu.resource.toLowerCase()}/${menu.toLowerCase()}`}>{menu}</Menu.Item>
            ))}
          </SubMenu>
        ))}

        {/*<SubMenu*/}
        {/*key="subHr"*/}
        {/*title={*/}
        {/*<span>*/}
        {/*<Icon type="team" />*/}
        {/*<span>HR</span>*/}
        {/*</span>*/}
        {/*}*/}
        {/*>*/}
        {/*<Menu.Item key="3">Employees</Menu.Item>*/}
        {/*<Menu.Item key="4">Shifts</Menu.Item>*/}
        {/*<Menu.Item key="5">Leave</Menu.Item>*/}
        {/*<Menu.Item key="6">Advances</Menu.Item>*/}
        {/*</SubMenu>*/}
        {/*<SubMenu*/}
        {/*key="subFleet"*/}
        {/*title={*/}
        {/*<span>*/}
        {/*<Icon type="car" />*/}
        {/*<span>Fleet</span>*/}
        {/*</span>*/}
        {/*}*/}
        {/*>*/}
        {/*<Menu.Item key="7">Vehicles</Menu.Item>*/}
        {/*<Menu.Item key="8">Transactions</Menu.Item>*/}
        {/*</SubMenu>*/}
        {/*<SubMenu*/}
        {/*key="subAdmin"*/}
        {/*title={*/}
        {/*<span>*/}
        {/*<Icon type="tool" />*/}
        {/*<span>Admin</span>*/}
        {/*</span>*/}
        {/*}*/}
        {/*>*/}
        {/*<Menu.Item key={modules.navToAdminUsers.name}>Users</Menu.Item>*/}
        {/*<Menu.Item key={modules.navToAdminRights.name}>Rights</Menu.Item>*/}
        {/*</SubMenu>*/}
      </Menu>
    </Header>
  );
};

AppHeader.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  photoURL: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired
};

export default AppHeader;
