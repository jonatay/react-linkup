import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { notification } from 'antd';

import { authActions, getAuthError } from 'src/auth';
import Button from 'src/views/components/button';

import './sign-in-page.css';

const openNotification = authError => {
  notification['error']({
    message: authError.code,
    description: JSON.stringify(authError),
    duration: 10,
    style: {
      width: 600,
      marginLeft: 335 - 600
    }
  });
};

const SignInPage = ({
  authError,
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
  signInWithFacebook
}) => {
  return (
    <div className="g-row sign-in">
      {authError === null ? '' : openNotification(authError)}
      <div className="g-col">
        <h1 className="sign-in__heading">Sign in</h1>
        <Button className="sign-in__button" onClick={signInWithGithub}>
          GitHub
        </Button>
        <Button className="sign-in__button" onClick={signInWithGoogle}>
          Google
        </Button>
        <Button className="sign-in__button" onClick={signInWithTwitter}>
          Twitter
        </Button>
        <Button className="sign-in__button" onClick={signInWithFacebook}>
          Facebook
        </Button>
      </div>
    </div>
  );
};

SignInPage.propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired,
  authError: PropTypes.object
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  authError: getAuthError(state)
});

const mapDispatchToProps = {
  signInWithGithub: authActions.signInWithGithub,
  signInWithGoogle: authActions.signInWithGoogle,
  signInWithTwitter: authActions.signInWithTwitter,
  signInWithFacebook: authActions.signInWithFacebook
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignInPage)
);
