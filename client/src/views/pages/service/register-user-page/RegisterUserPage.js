/*
    Jono : 18 03 05
    RegisterUserPage : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, notification } from 'antd';

import './style.css';

import { authActions, getAuthError } from 'src/mid/common/auth';

import { RegisterUserForm } from 'src/views/components/common/register-user-form';

const openNotification = authError => {
  notification['error']({
    message: authError.code,
    description: JSON.stringify(authError),
    duration: 0,
    style: {
      width: 600,
      marginLeft: 335 - 600
    }
  });
};

const RegisterUserPage = ({authError,registerNewUser }) => {
  return (
    <Row type="flex" justify="center" style={{ paddingTop: 20 }}>
      {authError === null ? '' : openNotification(authError)}
      <Col span={12}>
        <h1 className="sign-in__heading">Register New User</h1>
        <RegisterUserForm onSubmit={registerNewUser} />
      </Col>
    </Row>
  );
};

RegisterUserPage.propTypes = {
  registerNewUser: PropTypes.func.isRequired,
  authError: PropTypes.object
};

const mapStateToProps = state => ({ authError: getAuthError(state) });

const mapDispatchToProps = {
  registerNewUser: authActions.registerNewUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUserPage);
