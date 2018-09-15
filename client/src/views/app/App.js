import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import { privateRoutes, serviceRoutes } from '../../routes';
import RequireAuthRoute from '../components/common/require-auth-route';
import RequireUnauthRoute from '../components/common/require-unauth-route';

import {
  authActions,
  getPhotoURL,
  isAuthenticated,
  navActions,
  getAclFront,
  getCurrentLocation
} from '../../mid/common';

import NoMatch from '../pages/common/no-match';
import AppHeader from '../components/common/app-header';

import './app.css';

import { Layout } from 'antd';
const { Content } = Layout;

const App = ({
  authenticated,
  signOut,
  photoURL,
  navigateTo,
  aclFront,
  currentNavPath,
  location
}) => {
  if (!authenticated)
    return (
      <Layout>
        <Content>
          <Switch>
            {serviceRoutes.map((route, idx) => (
              <RequireUnauthRoute
                key={idx}
                path={route.path}
                component={route.component}
                {...authenticated}
              />
            ))}
            <Redirect
              to={{
                pathname: '/sign-in',
                state: { from: location }
              }}
            />
          </Switch>
        </Content>
      </Layout>
    );
  return (
    <Layout style={{height:"inherit"}}>
      <AppHeader
        authenticated={authenticated}
        signOut={signOut}
        photoURL={photoURL}
        navigateTo={navigateTo}
        aclFront={aclFront}
        currentNavPath={currentNavPath}
      />
      <Content style={{ padding: '0 10px', marginTop: 60 }}>
        <div style={{ background: '#fff', padding: 5 }}>
          <Switch>
            {privateRoutes.map((route, idx) => (
              <RequireAuthRoute
                key={idx}
                path={route.path}
                component={route.component}
                authenticated={authenticated}
              />
            ))}
            <Route component={NoMatch} />
          </Switch>
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
