import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Layout } from 'antd';

import {
  authActions,
  getPhotoURL,
  isAuthenticated,
  navActions,
  getAclFront,
  getCurrentLocation
} from 'src/common';

import AppHeader from '../components/common/app-header';
import RequireAuthRoute from '../components/common/require-auth-route';
import RequireUnauthRoute from '../components/common/require-unauth-route';
import SignInPage from '../pages/sign-in-page';
import RegisterUserPage from '../pages/register-user-page';
import RootPage from '../pages/root';

import AdminPage from '../pages/admin-page';
import FleetPage from '../pages/fleet-page';
import HRPage from '../pages/hr-page';

import './app.css';

const { Content } = Layout;

const App = ({
  authenticated,
  signOut,
  photoURL,
  navigateTo,
  aclFront,
  currentNavPath
}) => {
  if (!authenticated)
    return (
      <Layout style={{ height: '100%' }}>
        <Content>
          <RequireUnauthRoute
            authenticated={authenticated}
            path="/register"
            component={RegisterUserPage}
          />
          <RequireUnauthRoute
            authenticated={authenticated}
            path="/sign-in"
            component={SignInPage}
          />
        </Content>
      </Layout>
    );
  return (
    <Layout>
      <AppHeader
        authenticated={authenticated}
        signOut={signOut}
        photoURL={photoURL}
        navigateTo={navigateTo}
        aclFront={aclFront}
        currentNavPath={currentNavPath}
      />
      <Content style={{ padding: '0 10px', marginTop: 60 }}>
        <div style={{ background: '#fff', padding: 5, minHeight: 700 }}>
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path="/"
            component={RootPage}
          />
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path="/admin"
            component={AdminPage}
          />
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path="/fleet"
            component={FleetPage}
          />
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path="/hr"
            component={HRPage}
          />
        </div>
      </Content>
    </Layout>
  );
};

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  photoURL: PropTypes.string,
  navigateTo: PropTypes.func.isRequired,
  currentNavPath: PropTypes.string.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  photoURL: getPhotoURL(state),
  authenticated: isAuthenticated(state),
  aclFront: getAclFront(state),
  currentNavPath: getCurrentLocation(state)
});

const mapDispatchToProps = {
  signOut: authActions.signOut,
  navigateTo: navActions.navigateTo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
