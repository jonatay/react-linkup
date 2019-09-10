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
  getSoBankAccountFilter,
  getSoBankTransactionPage,
  getSoAccounts,
  soAccountActions
} from "../../../../mid/sage-one";

import PageHeader from "../../../components/common/page-header";
import SOBankTransactionsFilter from "../../../components/sage-one/so-bank-transaction-filter";
import SOBankTransactionsTable from "../../../components/sage-one/so-bank-transactions-table";

const SOBTransactionPage = props => {
  return (
    <div>
      <PageHeader>SO Bank Transactions</PageHeader>
      <SOBankTransactionsFilter {...props} />
      <SOBankTransactionsTable {...props} />
    </div>
  );
};

SOBTransactionPage.propTypes = {
  //arrs
  soBankAccounts: PropTypes.array.isRequired,
  soAccounts: PropTypes.array.isRequired,
  //objs
  soBankAccountFilter: PropTypes.object.isRequired,
  soBankTransactionFilter: PropTypes.object.isRequired,
  soBankTransactionPage: PropTypes.object.isRequired,
  //funcs
  loadSoBankAccounts: PropTypes.func.isRequired,
  setSoBankAccountFilter: PropTypes.func.isRequired,
  soBankTransactions: PropTypes.array.isRequired,
  loadSoBankTransactions: PropTypes.func.isRequired,
  setSoBankTransactionFilter: PropTypes.func.isRequired,
  setSoBankTransactionPage: PropTypes.func.isRequired,
  loadSoAccounts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  soBankAccounts: getSoBankAccountsFiltered(state),
  soBankAccountFilter: getSoBankAccountFilter(state),
  soBankTransactions: getFilteredSoBankTransactions(state),
  soBankTransactionFilter: getSoBankTransactionFilter(state),
  soBankTransactionPage: getSoBankTransactionPage(state),
  soAccounts: getSoAccounts(state)
});

const mapDispatchToProps = {
  loadSoBankAccounts: soBankAccountActions.loadSoBankAccounts,
  setSoBankAccountFilter: soBankAccountActions.setSoBankAccountFilter,
  loadSoBankTransactions: soBankTransactionActions.loadSoBankTransactions,
  setSoBankTransactionFilter:
    soBankTransactionActions.setFilterSoBankTransaction,
  setSoBankTransactionPage: soBankTransactionActions.setSoBankTransactionPage,
  loadSoAccounts: soAccountActions.loadSoAccounts
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SOBTransactionPage)
);
