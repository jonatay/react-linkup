import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { authActions } from '../../../auth';
// import Button from 'src/views/components/button';

// import './sign-in-page.css';


const RootPage = ({signOut}) => {
  return (
    <div>
      <h1>You're inside</h1>
      <button onClick={signOut}>Get out</button>
    </div>
  );
};

RootPage.propTypes = {
  signOut:PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signOut : authActions.signOut
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(RootPage)
);
