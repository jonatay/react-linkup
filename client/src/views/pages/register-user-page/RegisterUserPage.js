/*
    Jono : 18 03 05
    RegisterUserPage : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import './style.css';

import { authActions } from 'src/common/auth';

import { RegisterUserForm } from 'src/views/components/common/register-user-form';

const RegisterUserPage = props => {
  return (
    <Row type="flex" justify="center" style={{ paddingTop: 20 }}>
      <Col span={12}>
        <h1 className="sign-in__heading">Register New User</h1>
        <RegisterUserForm onSubmit={props.registerNewUser} />
      </Col>
    </Row>
  );
};

RegisterUserPage.propTypes = {
  registerNewUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  registerNewUser: authActions.registerNewUser
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterUserPage)
);
