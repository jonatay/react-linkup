import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Avatar, Icon } from 'antd';
//import './header.css';
import {navActions} from "../../../admin";

const SubMenu = Menu.SubMenu;
const modules = navActions.modules;

const { Header } = Layout;
const AppHeader = ({ authenticated, signOut, photoURL, navigateTo }) => {
  const handleMenuClick = ({ key }) => {
     switch (key) {
      case 'signOut':
        signOut();
        break;
       case 'admin-users-page':
         navigateTo(modules.navToAdminUsers);
         break;
      default:
        console.log(key);
    }
  };
  return (
      <Header
        style={{ position: 'fixed', width: '100%', lineHeight: 40, height: 40 }}
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

          <SubMenu
            key="subHr"
            title={
              <span>
                <Icon type="team" />
                <span>HR</span>
              </span>
            }
          >
            <Menu.Item key="3">Employees</Menu.Item>
            <Menu.Item key="4">Shifts</Menu.Item>
            <Menu.Item key="5">Leave</Menu.Item>
            <Menu.Item key="6">Advances</Menu.Item>
          </SubMenu>
          <SubMenu
            key="subFleet"
            title={
              <span>
                <Icon type="car" />
                <span>Fleet</span>
              </span>
            }
          >
            <Menu.Item key="7">Vehicles</Menu.Item>
            <Menu.Item key="8">Transactions</Menu.Item>
          </SubMenu>
          <SubMenu
            key="subAdmin"
            title={
              <span>
                <Icon type="tool" />
                <span>Admin</span>
              </span>
            }
          >
            <Menu.Item key="admin-users-page">Users</Menu.Item>
            <Menu.Item key="10">Rights</Menu.Item>
          </SubMenu>
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

