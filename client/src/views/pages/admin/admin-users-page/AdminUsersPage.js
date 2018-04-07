/*
    Jono : 18 04 06
    AdminUsersPage : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const AdminUsersPage = props => {
  return <div>Admin User Page</div>;
};

AdminUsersPage.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminUsersPage)
);
