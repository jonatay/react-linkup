/*
    Jono : 18 02 03
    fleet-container : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { driverActions, getVisibleDrivers } from 'src/fleet/index';

import VehicleContainer from '../vehicle-container';
import DriversTable from '../../../components/fleet/drivers-table/index';
import TransactionsTable from '../../../components/fleet/transactions-table/index';
import FleetSettings from '../fleet-settings';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

class FleetContainer extends React.Component {
  state = { activeKey: 'vehicles' };
  componentDidMount() {
    this.props.loadDrivers();
  }

  render() {
    const { drivers, loadDrivers } = this.props;
    return (
      <Tabs
        theme="dark"
        size="small"
        onChange={activeKey => {
          switch (activeKey) {
            case 'drivers':
              loadDrivers();
              break;
            default:
              break;
          }
          this.setState({ activeKey });
        }}
      >
        <TabPane
          key="vehicles"
          tab={
            <span>
              <Icon type="car" />Vehicles
            </span>
          }
        >
          <VehicleContainer />
        </TabPane>
        <TabPane
          key="drivers"
          tab={
            <span>
              <Icon type="idcard" />Drivers
            </span>
          }
        >
          <DriversTable drivers={drivers} />
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
        <TabPane
          key="settings"
          tab={
            <span>
              <Icon type="setting" />Settings
            </span>
          }
        >
          <FleetSettings />
        </TabPane>
      </Tabs>
    );
  }
}

FleetContainer.propTypes = {
  drivers: PropTypes.instanceOf(List).isRequired,
  loadDrivers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  drivers: getVisibleDrivers(state)
});

const mapDispatchToProps = {
  loadDrivers: driverActions.loadDrivers
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetContainer)
);
