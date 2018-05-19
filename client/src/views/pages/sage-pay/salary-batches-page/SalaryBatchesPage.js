/*
    Jono : 18 05 17
    BankAccountsPage : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../../components/common/page-header/';

const SalaryBatchesPage = props => {
  return (
    <div>
      <PageHeader>sage-pay/salary-batches </PageHeader>
    </div>
  );
};

SalaryBatchesPage.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SalaryBatchesPage)
);
