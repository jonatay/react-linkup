/*
    Jono : 18 05 17
    BankAccountsPage : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../../components/common/page-header/';
import SageBankGrid from '../../../components/sage-pay/sage-bank-grid';
import SageBBranchGrid from '../../../components/sage-pay/sage-bbranch-grid';
import {
  sageBankActions,
  getSageBanks,
  sageBBranchActions,
  getSageBBranches
} from '../../../../mid/sage-pay';

import { Col, Row, Button } from 'antd';

class BanksAndBranchesPage extends React.Component {
  componentDidMount() {
    this.props.loadSageBanks();
    this.props.loadSageBBranches();
  }

  render() {
    return (
      <div>
        <PageHeader>sage-pay/banks-and-branches </PageHeader>
        <Row>
          <Col span={8}>
            <Button onClick={() => this.props.importSageBanks()}>
              import Banks from Sage Pay API
            </Button>
            <SageBankGrid {...this.props} />
          </Col>{' '}
          <Col span={16}>
            <Button onClick={() => this.props.importSageBBranches()}>
              import Bank Branches from Sage Pay API
            </Button>
            <SageBBranchGrid {...this.props} />
          </Col>
        </Row>
      </div>
    );
  }
}

BanksAndBranchesPage.propTypes = {
  //sage banks
  loadSageBanks: PropTypes.func.isRequired,
  importSageBanks: PropTypes.func.isRequired,
  sageBanks: PropTypes.array.isRequired,
  // sage branches
  loadSageBBranches: PropTypes.func.isRequired,
  importSageBBranches: PropTypes.func.isRequired,
  sageBBranches: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  sageBanks: getSageBanks(state),
  sageBBranches: getSageBBranches(state)
});

const mapDispatchToProps = {
  loadSageBanks: sageBankActions.loadSageBanks,
  importSageBanks: sageBankActions.importSageBanks,
  loadSageBBranches: sageBBranchActions.loadSageBBranches,
  importSageBBranches: sageBBranchActions.importSageBBranches
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BanksAndBranchesPage)
);
