/*
    Jono : 18 05 17
    BankAccountsPage : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sageAccountActions, getSageAccounts } from '../../../../mid/sage-pay';

import PageHeader from '../../../components/common/page-header/';
import SageAccountBestImport from '../../../components/sage-pay/sage-account-best-import';
import SageAccountGrid from '../../../components/sage-pay/sage-account-grid';

class BankAccountsPage extends React.Component {
  componentDidMount() {
    this.props.loadSageAccounts();
  }

  render() {
    return (
      <div>
        <PageHeader>sage-pay/bank-accounts </PageHeader>
        <SageAccountGrid {...this.props} />
        <SageAccountBestImport {...this.props} />
      </div>
    );
  }
}

BankAccountsPage.propTypes = {
  sageAccounts: PropTypes.array.isRequired,
  loadSageAccounts: PropTypes.func.isRequired,
  importBestAccounts: PropTypes.func.isRequired,
  importCubitAccounts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sageAccounts: getSageAccounts(state)
});

const mapDispatchToProps = {
  loadSageAccounts: sageAccountActions.loadSageEmpAccounts,
  importBestAccounts: sageAccountActions.importBestAccounts,
  importCubitAccounts: sageAccountActions.importCubitAccounts,
  validateSageAccount: sageAccountActions.validateSageAccount
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BankAccountsPage)
);
