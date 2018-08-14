/*
    Jono : 18 04 06
    FleetVehiclesPage : Stateless Functional Component
*/
import React from 'react';
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
  getFleetTransactionPeriods
} from 'src/fleet';

import PageHeader from 'src/views/components/common/page-header';
import FleetTransactionGrid from '../../../components/fleet/fleet-transaction-grid';
import FleetTransactionFilter from '../../../components/fleet/fleet-transaction-filter';
import FleetTransactionSummary from '../../../components/fleet/fleet-transaction-summary';

const TabPane = Tabs.TabPane;

const FleetTransactionsPage = props => {
  return (
    <div>
      <PageHeader>fleet-transactions</PageHeader>
      <FleetTransactionFilter {...props} />
      <Tabs hideAdd theme="dark" type="editable-card">
        <TabPane
          key="transactions"
          closable={false}
          tab={
            <span>
              <Icon type="table" /> transactions
            </span>
          }
        >
          <FleetTransactionGrid {...props} />
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
          <FleetTransactionSummary {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
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
  fleetTransactionPeriods: PropTypes.instanceOf(Array).isRequired
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
  fleetTransactionPeriods: getFleetTransactionPeriods(state)
});

const mapDispatchToProps = {
  loadFleetTransactions: fleetTransactionActions.loadFleetTransactions,
  filterFleetTransactions: fleetTransactionActions.filterFleetTransactions
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetTransactionsPage)
);
