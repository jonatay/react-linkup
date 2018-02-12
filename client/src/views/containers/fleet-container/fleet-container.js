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

import VehiclesTable from 'src/views/components/fleet/vehicles-table';
import DriversTable from '../../components/fleet/drivers-table';
import TransactionsTable from '../../components/fleet/transactions-table';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

class FleetContainer extends React.Component {
  componentDidMount() {
    this.props.loadVehicles();
    this.props.loadDrivers();
  }

  render() {
    const { vehicles, drivers } = this.props;
    return (
      <Tabs
        // defaultActiveKey="rights"
        theme="dark"
        size="small"
        // onChange={tab => {
        //   switch (tab) {
        //     case 'users':
        //       props.loadUsers();
        //       break;
        //     default:
        //       break;
        //   }
        // }}
      >
        <TabPane
          key="vehicles"
          tab={
            <span>
              <Icon type="car" />Vehicles
            </span>
          }
        >
          <VehiclesTable vehicles={vehicles} />
        </TabPane>
        <TabPane
          key="drivers"
          tab={
            <span>
              <Icon type="idcard" />Drivers
            </span>
          }
        >
          <DriversTable />
        </TabPane>
        <TabPane
          key="transactions"
          tab={
            <span>
              <Icon type="pay-circle-o" />Transactions
            </span>
          }
        >
          <TransactionsTable />
        </TabPane>
      </Tabs>
    );
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
