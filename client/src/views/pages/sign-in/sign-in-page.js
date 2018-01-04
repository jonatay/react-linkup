import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { authActions } from 'src/auth';
import Button from 'src/views/components/button';

import './sign-in-page.css';

const SignInPage = ({ signInWithGithub, signInWithGoogle, signInWithTwitter, signInWithFacebook }) => {
  return (
    <div className="g-row sign-in">
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
  signInWithFacebook: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signInWithGithub: authActions.signInWithGithub,
  signInWithGoogle: authActions.signInWithGoogle,
  signInWithTwitter: authActions.signInWithTwitter,
  signInWithFacebook: authActions.signInWithFacebook
};

export default withRouter(connect(null, mapDispatchToProps)(SignInPage));
