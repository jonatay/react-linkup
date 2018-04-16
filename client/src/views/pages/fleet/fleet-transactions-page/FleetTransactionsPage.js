/*
    Jono : 18 04 06
    FleetVehiclesPage : Stateless Functional Component
*/
import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fleetTransactionActions,
  getVisibleFleetTransactions,
  getFleetTransactionFilter,
  getFleetTransactionsPageCount,
  getFilteredFleetTransactions,
  getFleetTransactions,
  getDateRange
} from 'src/fleet';

import PageHeader from 'src/views/components/common/page-header';
import FleetTransactionGrid from '../../../components/fleet/fleet-transaction-grid';
import FleetTransactionFilter from '../../../components/fleet/fleet-transaction-filter';

const FleetTransactionsPage = props => {
  return (
    <div>
      <PageHeader>fleet-transactions</PageHeader>
      <FleetTransactionFilter {...props} />
      <FleetTransactionGrid {...props} />
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
  allFleetTransactions: PropTypes.instanceOf(Array).isRequired,
  dateRange: PropTypes.instanceOf(Array).isRequired
};

const mapStateToProps = state => ({
  fleetTransactions: getVisibleFleetTransactions(state),
  fleetTransactionFilter: getFleetTransactionFilter(state),
  fleetTransactionsPageCount: getFleetTransactionsPageCount(state),
  filteredFleetTransactions: getFilteredFleetTransactions(state),
  allFleetTransactions: getFleetTransactions(state),
  dateRange: getDateRange(state)
});

const mapDispatchToProps = {
  loadFleetTransactions: fleetTransactionActions.loadFleetTransactions,
  filterFleetTransactions: fleetTransactionActions.filterFleetTransactions
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetTransactionsPage)
);
