/*
    Jono : 18 04 06
    FleetVehiclesPage : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fleetTransactionActions, getFleetTransactions } from 'src/fleet';

import PageHeader from 'src/views/components/common/page-header';
import FleetTransactionGrid from '../../../components/fleet/fleet-transaction-grid/FleetTransactionGrid';

const FleetTransactionsPage = props => {
  return (
    <div>
      <PageHeader>fleet-transactions</PageHeader>
      <FleetTransactionGrid {...props} />
    </div>
  );
};

FleetTransactionsPage.propTypes = {
  loadFleetTransactions: PropTypes.func.isRequired,
  fleetTransactions: PropTypes.instanceOf(Array).isRequired
};

const mapStateToProps = state => ({
  fleetTransactions: getFleetTransactions(state)
});

const mapDispatchToProps = {
  loadFleetTransactions: fleetTransactionActions.loadFleetTransactions
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetTransactionsPage)
);
