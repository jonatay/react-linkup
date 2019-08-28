import React from "react";
import PropTypes from "prop-types";

import PageHeader from "../../../components/common/page-header";

const SOBTransactionPage = props => {
  return (
    <div>
      <PageHeader>SO Bank Accounts</PageHeader>
    </div>
  );
};

SOBTransactionPage.propTypes = {};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SOBTransactionPage)
);
