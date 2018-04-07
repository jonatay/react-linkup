/*
    Jono : 18 04 06
    AdminRightsPage : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const AdminRightsPage = props => {
  return <div>Admin Rights Page</div>;
};

AdminRightsPage.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminRightsPage)
);
