/*
    Jono : 18 02 03
    fleet-container : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  getVehiclesList,
  vehicleActions,
  getDriversList,
  driverActions
} from 'src/fleet';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

class FleetContainer extends React.Component {
  componentDidMount() {
    this.props.loadVehicles();
    this.props.loadDrivers();
  }

  render() {
    const { vehicles, drivers } = this.props;
    return <div>Fleet Container</div>;
  }
}

FleetContainer.propTypes = {
  vehicles: PropTypes.instanceOf(List).isRequired,
  loadVehicles: PropTypes.func.isRequired,
  drivers: PropTypes.instanceOf(List).isRequired,
  loadDrivers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vehicles: getVehiclesList(state),
  drivers: getDriversList(state)
});

const mapDispatchToProps = {
  loadVehicles: vehicleActions.loadVehicles,
  loadDrivers: driverActions.loadDrivers
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetContainer)
);
