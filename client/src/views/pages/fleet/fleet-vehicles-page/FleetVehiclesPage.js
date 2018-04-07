/*
    Jono : 18 04 06
    FleetVehiclesPage : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const FleetVehiclesPage = props => {
  return <div>Fleet Vehicles Page</div>;
};

FleetVehiclesPage.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetVehiclesPage)
);
