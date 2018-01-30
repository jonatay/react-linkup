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
  getAclFront
} from 'src/common';

import AppHeader from '../components/header';
import RequireAuthRoute from '../components/require-auth-route';
import RequireUnauthRoute from '../components/require-unauth-route';
import SignInPage from '../pages/sign-in';
import RootPage from '../pages/root';
import AdminUsersPage from '../pages/admin/users';
import AdminRightsPage from '../pages/admin/rights';
import FleetTransactionsPage from '../pages/fleet/transactions';
import FleetVehiclesPage from '../pages/fleet/vehicles';

import './app.css';

const { Content } = Layout;

const App = ({ authenticated, signOut, photoURL, navigateTo, aclFront }) => {
  if (!authenticated)
    return (
      <Layout style={{ height: '100%' }}>
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
        aclFront={aclFront}
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
            path={navActions.modules.navToAdminUsers.url}
            component={AdminUsersPage}
          />
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path={navActions.modules.navToAdminRights.url}
            component={AdminRightsPage}
          />{' '}
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path={navActions.modules.navToFleetTransactions.url}
            component={FleetTransactionsPage}
          />
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path={navActions.modules.navToFleetVehicles.url}
            component={FleetVehiclesPage}
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

const mapStateToProps = state => ({
  photoURL: getPhotoURL(state),
  authenticated: isAuthenticated(state),
  aclFront: getAclFront(state)
});

const mapDispatchToProps = {
  signOut: authActions.signOut,
  navigateTo: navActions.navigateTo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
