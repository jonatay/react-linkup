import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Layout } from 'antd';

import {
  authActions,
  getPhotoURL,
  isAuthenticated,
  navActions
} from 'src/common';

import AppHeader from '../components/header';
import RequireAuthRoute from '../components/require-auth-route';
import RequireUnauthRoute from '../components/require-unauth-route';
import SignInPage from '../pages/sign-in';
import RootPage from '../pages/root';
import AdminUsersPage from '../pages/admin/users';
import AdminRightsPage from '../pages/admin/rights';

import './app.css';

const { Content } = Layout;

const App = ({ authenticated, signOut, photoURL, navigateTo }) => {
  if (!authenticated)
    return (
      <Layout>
        <Content>
          <RequireUnauthRoute
            authenticated={authenticated}
            path="/*"
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
      />
      <Content style={{ padding: '0 10px', marginTop: 60 }}>
        <div style={{ background: '#fff', padding: 5, minHeight: 750 }}>
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path="/"
            component={RootPage}
          />
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path="/admin-users-page"
            component={AdminUsersPage}
          />
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path="/admin-rights-page"
            component={AdminRightsPage}
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
  navigateTo: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => {
  const photoURL = getPhotoURL(state);
  const authenticated = isAuthenticated(state);
  return { authenticated, photoURL };
};

const mapDispatchToProps = {
  signOut: authActions.signOut,
  navigateTo: navActions.navigateTo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
