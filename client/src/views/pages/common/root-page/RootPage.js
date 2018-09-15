import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { authActions } from '../../../../mid/common/auth/index';
// import Button from 'src/views/components/button';

// import './sign-in-page.css';

const RootPage = ({ signOut }) => {
  return (
    <div>
      <h1>react-linkup</h1>
      <p>If you can see menu items, navigate away.</p>
      <p>If no menu, you need rights, ask Jono</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

RootPage.propTypes = {
  signOut: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signOut: authActions.signOut
};

export default withRouter(connect(null, mapDispatchToProps)(RootPage));
