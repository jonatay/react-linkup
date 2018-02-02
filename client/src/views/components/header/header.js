import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Avatar, Icon } from 'antd';
//import './header.css';

const SubMenu = Menu.SubMenu;

const iconCheat = {
  Admin: 'tool',
  Fleet: 'car',
  HR: 'team'
};

const { Header } = Layout;
const AppHeader = ({
  authenticated,
  signOut,
  photoURL,
  navigateTo,
  aclFront,
  currentNavPath
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
        selectedKeys={
          typeof currentNavPath === 'string' ? [currentNavPath.replace('/')] : []
        }
      >
        <SubMenu
          style={{ position: 'absolute', right: -10, top: 8 }}
          key="subUser"
          title={<Avatar src={photoURL} shape="square" size="default" />}
        >
          <Menu.Item key="100">User Profile</Menu.Item>
          <Menu.Item key="signOut">Logout</Menu.Item>
        </SubMenu>

        {aclFront.map(menu => (
          <Menu.Item key={menu.resource.toLowerCase()}>
            <span>
              <Icon type={iconCheat[menu.resource]} />
            </span>
            {menu.resource}
          </Menu.Item>
        ))}
      </Menu>
      <h1>{currentNavPath}</h1>
    </Header>
  );
};

AppHeader.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  photoURL: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
  aclFront: PropTypes.array.isRequired,
  currentNavPath: PropTypes.string.isRequired
};

export default AppHeader;
