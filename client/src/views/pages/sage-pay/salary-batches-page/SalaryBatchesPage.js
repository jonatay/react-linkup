/*
    Jono : 18 05 17
    BankAccountsPage : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  sageBatchActions,
  getSageBatches,
  getSageBatchInstructions
} from '../../../../mid/sage-pay/sage-batch';

import PageHeader from '../../../components/common/page-header/';
import SageBatchGrid from '../../../components/sage-pay/sage-batch-grid';
import NewSageBatch from '../../../components/sage-pay/new-sage-batch';

class SalaryBatchesPage extends React.Component {
  componentDidMount() {
    this.props.loadSageBatches();
  }

  render() {
    return (
      <div>
        <PageHeader>sage-pay/salary-batches </PageHeader>
        <NewSageBatch {...this.props} />
        <SageBatchGrid {...this.props} />
      </div>
    );
  }
}

SalaryBatchesPage.propTypes = {
  sageBatches: PropTypes.array.isRequired,
  sageBatchInstructions: PropTypes.array.isRequired,
  loadSageBatches: PropTypes.func.isRequired,
  createSageBatch: PropTypes.func.isRequired,
  deleteSageBatch: PropTypes.func.isRequired,
  submitSageBatch: PropTypes.func.isRequired,
  querySageBatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sageBatches: getSageBatches(state),
  sageBatchInstructions: getSageBatchInstructions()
});

const mapDispatchToProps = {
  loadSageBatches: sageBatchActions.loadSageBatches,
  createSageBatch: sageBatchActions.createSageBatch,
  deleteSageBatch: sageBatchActions.deleteSageBatch,
  submitSageBatch: sageBatchActions.submitSageBatch,
  querySageBatch: sageBatchActions.querySageBatch
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SalaryBatchesPage)
);
