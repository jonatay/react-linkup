import React from 'react';
import { Layout } from 'antd';

import AppMenu from './AppMenu'

const { /*Header,*/ Content, Footer, Sider } = Layout;

class AppLayout extends React.Component {
  state = {
    collapsed: true,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo"/>
          <AppMenu/>
        </Sider>
        <Layout>
          {/*<Header style={{ background: '#fff', padding: 0 }} />*/}
          <Content style={{ margin: '0 16px' }}>
            {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
            {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
            {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
            {/*</Breadcrumb>*/}
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Home Page
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            react-redux-linkup ©2017
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;