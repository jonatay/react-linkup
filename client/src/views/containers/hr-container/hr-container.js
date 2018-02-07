/*
    Jono : 18 02 03
    hr-container : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const HRContainer = props => {
  return <div>HR Container</div>;
};

HRContainer.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HRContainer)
);
