import React from "react";
// import { List } from 'immutable';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PageHeader from "../../../components/common/page-header";
import SOBankAccountsTable from "../../../components/sage-one/so-bank-accounts-table";
import SOBankAccountFilter from "../../../components/sage-one/so-bank-account-filter";

import {
  soBankAccountActions,
  getSoBankAccountsFiltered,
  getSoBankAccountFilter
} from "../../../../mid/sage-one";

const SOBankAccountsPage = props => {
  return (
    <div>
      <PageHeader>SO Bank Accounts</PageHeader>
      <SOBankAccountFilter {...props} />
      <SOBankAccountsTable {...props} />
    </div>
  );
};

SOBankAccountsPage.propTypes = {
  soBankAccounts: PropTypes.array.isRequired,
  soBankAccountFilter: PropTypes.object.isRequired,
  loadSoBankAccounts: PropTypes.func.isRequired,
  setSoBankAccountFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  soBankAccounts: getSoBankAccountsFiltered(state),
  soBankAccountFilter: getSoBankAccountFilter(state)
});

const mapDispatchToProps = {
  loadSoBankAccounts: soBankAccountActions.loadSoBankAccounts,
  setSoBankAccountFilter: soBankAccountActions.setSoBankAccountFilter
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SOBankAccountsPage)
);
