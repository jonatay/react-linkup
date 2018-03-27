/*
    Jono : 18 03 15
    FleetTransactionContainer : Stateless Functional Component
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fleetTransactionActions,
  getFleetTransactions
} from 'src/fleet';

import FleetTransactionsTable from '../../../components/fleet/fleet-transactions-table';

const FleetTransactionContainer = props => {
  return (
    <div>
      <FleetTransactionsTable {...props} />
    </div>
  );
};

FleetTransactionContainer.propTypes = {
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
  connect(mapStateToProps, mapDispatchToProps)(FleetTransactionContainer)
);
