/*
    Jono : 18 04 06
    FleetVehiclesPage : Stateless Functional Component
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Icon, Tabs } from 'antd';

import {
  fleetTransactionActions,
  getVisibleFleetTransactions,
  getFleetTransactionFilter,
  getFleetTransactionsPageCount,
  getFilteredFleetTransactions,
  getFleetTransactions,
  getListParams,
  getListOptions,
  getFleetTransactionSummary,
  getFleetTransactionChartData,
  getFleetTransactionPeriods,
  getFleetTransactionTypes
} from 'src/mid/fleet';

import PageHeader from 'src/views/components/common/page-header';
import FleetTransactionGrid from '../../../components/fleet/fleet-transaction-grid';
import FleetTransactionFilter from '../../../components/fleet/fleet-transaction-filter';
import FleetTransactionSummary from '../../../components/fleet/fleet-transaction-summary';
import FleetTransactionChart from '../../../components/fleet/fleet-transaction-chart';
import Cookies from 'js-cookie';

const TabPane = Tabs.TabPane;

const FleetTransactionsPage = class FleetTransactionsPage extends Component {
  state = {
    activeKey: Cookies.get('fleetTransactionsActiveKey') || 'transactions'
  };

  render() {
    return (
      <div>
        <PageHeader>fleet-transactions</PageHeader>
        <FleetTransactionFilter {...this.props} />
        <Tabs
          hideAdd
          theme="dark"
          type="editable-card"
          activeKey={this.state.activeKey}
          onChange={activeKey => {
            Cookies.set('fleetTransactionsActiveKey', activeKey, {
              expires: 7
            });
            this.setState({ activeKey });
          }}
        >
          <TabPane
            key="transactions"
            closable={false}
            tab={
              <span>
                <Icon type="table" /> transactions
              </span>
            }
          >
            <FleetTransactionGrid {...this.props} />
          </TabPane>
          <TabPane
            key="summary"
            closable={false}
            tab={
              <span>
                <Icon type="calculator" /> summary
              </span>
            }
          >
            <FleetTransactionSummary {...this.props} />
          </TabPane>
          <TabPane
            key="chart"
            closable={false}
            tab={
              <span>
                <Icon type="area-chart" /> chart
              </span>
            }
          >
            <FleetTransactionChart {...this.props} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
};

FleetTransactionsPage.propTypes = {
  loadFleetTransactions: PropTypes.func.isRequired,
  filterFleetTransactions: PropTypes.func.isRequired,
  fleetTransactions: PropTypes.instanceOf(Array).isRequired,
  fleetTransactionFilter: PropTypes.instanceOf(Object).isRequired,
  fleetTransactionsPageCount: PropTypes.number.isRequired,
  filteredFleetTransactions: PropTypes.instanceOf(List).isRequired,
  allFleetTransactions: PropTypes.instanceOf(List).isRequired,
  listParams: PropTypes.instanceOf(Object).isRequired,
  listOptions: PropTypes.instanceOf(Object).isRequired,
  fleetTransactionSummary: PropTypes.instanceOf(Array).isRequired,
  fleetTransactionPeriods: PropTypes.instanceOf(Array).isRequired,
  fleetTransactionTypes: PropTypes.instanceOf(Array).isRequired,
  fleetTransactionChartData: PropTypes.instanceOf(Array).isRequired
};

const mapStateToProps = state => ({
  fleetTransactions: getVisibleFleetTransactions(state),
  fleetTransactionFilter: getFleetTransactionFilter(state),
  fleetTransactionsPageCount: getFleetTransactionsPageCount(state),
  filteredFleetTransactions: getFilteredFleetTransactions(state),
  allFleetTransactions: getFleetTransactions(state),
  listParams: getListParams(state),
  listOptions: getListOptions(state),
  fleetTransactionSummary: getFleetTransactionSummary(state),
  fleetTransactionChartData: getFleetTransactionChartData(state),
  fleetTransactionPeriods: getFleetTransactionPeriods(state),
  fleetTransactionTypes: getFleetTransactionTypes(state)
});

const mapDispatchToProps = {
  loadFleetTransactions: fleetTransactionActions.loadFleetTransactions,
  filterFleetTransactions: fleetTransactionActions.filterFleetTransactions
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FleetTransactionsPage)
);
