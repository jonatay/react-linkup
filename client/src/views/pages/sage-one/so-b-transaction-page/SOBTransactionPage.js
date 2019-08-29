import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  soBankTransactionActions,
  getSoBankTransactionFilter,
  soBankAccountActions,
  getSoBankAccountsFiltered,
  getFilteredSoBankTransactions,
  getSoBankAccountFilter
} from "../../../../mid/sage-one";

import PageHeader from "../../../components/common/page-header";

const SOBTransactionPage = props => {
  return (
    <div>
      <PageHeader>SO Bank Transactions</PageHeader>
    </div>
  );
};

SOBTransactionPage.propTypes = {
  soBankAccounts: PropTypes.array.isRequired,
  soBankAccountFilter: PropTypes.object.isRequired,
  loadSoBankAccounts: PropTypes.func.isRequired,
  setSoBankAccountFilter: PropTypes.func.isRequired,
  soBankTransactions: PropTypes.array.isRequired,
  soBankTransactionFilter: PropTypes.object.isRequired,
  loadSoBankTransactions: PropTypes.func.isRequired,
  setSoBankTransactionFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  soBankAccounts: getSoBankAccountsFiltered(state),
  soBankAccountFilter: getSoBankAccountFilter(state),
  soBankTransactions: getFilteredSoBankTransactions(state),
  soBankTransactionFilter: getSoBankTransactionFilter(state)
});

const mapDispatchToProps = {
  loadSoBankAccounts: soBankAccountActions.loadSoBankAccounts,
  setSoBankAccountFilter: soBankAccountActions.setSoBankAccountFilter,
  loadSoBankTransactions: soBankTransactionActions.loadSoBankTransactions,
  setSoBankTransactionFilter:
    soBankTransactionActions.setFilterSoBankTransaction
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SOBTransactionPage)
);
