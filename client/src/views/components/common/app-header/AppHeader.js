import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Avatar, Icon } from 'antd';
import './header.css';

const SubMenu = Menu.SubMenu;

const idxCheat = {
  Admin: 999,
  Fleet: 10,
  HR: 20,
  Attend: 5,
  'sage-pay': 50
};

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
  Settings: 'setting',
  'sage-pay': 'cloud-upload-o',
  'bank-accounts': 'credit-card',
  'banks-and-branches': 'shop',
  'salary-batches': 'solution',
  Attend: 'clock-circle-o'
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
    switch (key) {
      case 'signOut':
        signOut();
        break;
      case 'userProfile':
        navigateTo('/user-profile');
        break;
      default:
        navigateTo(`/${key}`);
    }
  };
  const mapMenuChildren = parent => {
    return child => (
      <Menu.Item
        key={`${parent.toLowerCase()}/${child.resource.toLowerCase()}`}
      >
        <span>
          <Icon type={iconCheat[child.resource]} />
        </span>
        {child.label}
      </Menu.Item>
    );
  };
  return (
    <Header
      style={{
        position: 'fixed',
        width: '100%',
        left: 0,
        background: 'white',
        padding: '5px 2px',
        marginBottom: 5
      }}
    >
      {/*<div className="logo" />*/}
      <div
        onClick={() => navigateTo('/home')}
        style={{
          width: 70,
          height: 31,
          // background: 'rgba(255,255,255,.2)',
          // margin: '16px 24px 16px 0',
          // marginTop:5,
          cursor: 'pointer',
          float: 'left'
        }}
      >
        <img src="/img/LULogoBar2.png" alt="" />
      </div>
      <Menu
        onClick={handleMenuClick}
        mode="horizontal"
        // theme="dark"
        selectedKeys={
          typeof currentNavPath === 'string'
            ? [currentNavPath.replace('/', '')]
            : []
        }
      >
        <SubMenu
          style={{ position: 'absolute', right: -1, top: -1, marginTop: -5 }}
          key="subUser"
          title={
            photoURL ? (
              <Avatar src={photoURL} shape="square" />
            ) : (
              <Avatar style={{ paddingLeft: 7 }} icon="user" />
            )
          }
        >
          <Menu.Item key="userProfile">User Profile</Menu.Item>
          <Menu.Item key="signOut">Logout</Menu.Item>
        </SubMenu>

        {aclFront
          .sort(
            (a, b) =>
              idxCheat[a.resource] > idxCheat[b.resource]
                ? 1
                : idxCheat[a.resource] < idxCheat[b.resource]
                  ? -1
                  : 0
          )
          .map(menu => (
            <SubMenu
              style={{ marginTop: -5 }}
              key={menu.resource.toLowerCase()}
              title={
                <span>
                  <Icon type={iconCheat[menu.resource]} />
                  {menu.label}
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
