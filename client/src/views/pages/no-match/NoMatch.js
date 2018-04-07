/*
    Jono : 18 04 06
    NoMatch : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const NoMatch = props => {
  return <div />;
};

NoMatch.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NoMatch)
);
