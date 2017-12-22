import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Layout } from 'antd';

import { authActions, getPhotoURL, isAuthenticated } from '../../auth';
import AppHeader from '../components/header';
import RequireAuthRoute from '../components/require-auth-route';
import RequireUnauthRoute from '../components/require-unauth-route';
import SignInPage from '../pages/sign-in';
import RootPage from '../pages/root';

const { Content } = Layout;

const App = ({ authenticated, signOut, photoURL }) => {
  return (
    <Layout>
      {!authenticated ? (
        ''
      ) : (
        <AppHeader
          authenticated={authenticated}
          signOut={signOut}
          photoURL={photoURL}
        />
      )}
      <Content style={{ padding: '0 10px', marginTop: 60 }}>
        <div style={{ background: '#fff', padding: 5, minHeight: 750 }}>
          <RequireAuthRoute
            authenticated={authenticated}
            exact
            path="/"
            component={RootPage}
          />
          <RequireUnauthRoute
            authenticated={authenticated}
            path="/sign-in"
            component={SignInPage}
          />
        </div>
      </Content>
    </Layout>
  );
};

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  photoURL: PropTypes.string
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
  signOut: authActions.signOut
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
