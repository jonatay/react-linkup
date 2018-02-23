/*
    Jono : 18 02 22
    FleetSettings : Stateless Functional Component
*/
import React from 'react';
//import { List } from 'immutable';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const FleetSettings = (props) => {
  return (
    <div><h1>FleetSettings</h1></div>
  );
};

FleetSettings.propTypes = {
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FleetSettings)
);