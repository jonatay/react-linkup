import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Avatar, Icon } from 'antd';
import './header.css';

const SubMenu = Menu.SubMenu;

const iconCheat = {
  Admin: 'tool',
  Fleet: 'car',
  HR: 'team',
  Drivers: 'idcard',
  Vehicles: 'car',
  Transactions: 'table',
  Employees: 'contacts',
  EmpTran: 'table',
  Advances: 'wallet',
  Shifts: 'calendar',
  Leave: 'smile-o',
  Rights: 'lock',
  Users: 'user',
  Attendance: 'clock-circle-o',
  Settings: 'setting'
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
  const mapMenuChildren = parent => {
    return child => (
      <Menu.Item key={`${parent.toLowerCase()}/${child.toLowerCase()}`}>
        <span>
          <Icon type={iconCheat[child]} />
        </span>
        {child}
      </Menu.Item>
    );
  };
  return (
    <Header>
      {/*<div className="logo" />*/}
      <Menu
        onClick={handleMenuClick}
        mode="horizontal"
        // theme="dark"
        style={{ position: 'fixed', width: '100%', left: 0 }}
        selectedKeys={
          typeof currentNavPath === 'string'
            ? [currentNavPath.replace('/', '')]
            : []
        }
      >
        <SubMenu
          style={{ position: 'absolute', right: -1, top: -1 }}
          key="subUser"
          title={
            photoURL ? (
              <Avatar src={photoURL} shape="square" />
            ) : (
              <Avatar style={{ paddingLeft: 7 }} icon="user" />
            )
          }
        >
          <Menu.Item key="100">User Profile</Menu.Item>
          <Menu.Item key="signOut">Logout</Menu.Item>
        </SubMenu>

        {aclFront.map(menu => (
          <SubMenu
            key={menu.resource.toLowerCase()}
            title={
              <span>
                <Icon type={iconCheat[menu.resource]} />
                {menu.resource}
              </span>
            }
          >
            {menu.children.map(mapMenuChildren(menu.resource))}
          </SubMenu>
        ))}
      </Menu>
    </Header>
  );
};

AppHeader.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  photoURL: PropTypes.string,
  navigateTo: PropTypes.func.isRequired,
  aclFront: PropTypes.array.isRequired,
  currentNavPath: PropTypes.string.isRequired
};

export default AppHeader;
