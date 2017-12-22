import React from 'react';

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

const AppMenu = () => (
  <div>
    <Menu theme="dark" mode="inline">
      <SubMenu
        key="subUser"
        title={
          <span>
          <Icon type="user"/>
          <span>User</span>
        </span>
        }
      >
        <Menu.Item key="100">User Profile</Menu.Item>
        <Menu.Item key="101">Logout</Menu.Item>
      </SubMenu>

      <SubMenu
        key="subHr"
        title={
          <span>
          <Icon type="team"/>
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
          <Icon type="car"/>
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
          <Icon type="tool"/>
          <span>Admin</span>
        </span>
        }
      >
        <Menu.Item key="9">Users</Menu.Item>
        <Menu.Item key="10">Rights</Menu.Item>
      </SubMenu>
    </Menu>
  </div>
);

export default AppMenu;
