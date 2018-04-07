import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        <Content />
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
        <div style={{ background: '#fff', padding: 5, minHeight: 700 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
