/*
    Jono : 18 04 06
    FleetDriversPage : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../../components/common/page-header/PageHeader';

const FleetDriversPage = props => {
  return (
    <div>
      <PageHeader>fleet-drivers</PageHeader>
    </div>
  );
};

FleetDriversPage.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetDriversPage)
);
