/*
    Jono : 19 07 03
    Employees : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../../components/common/page-header';
import {
  spEmployeeActions,
  getSpEmployees,
  payPointActions,
  getPayPoints
} from 'src/mid/simple-pay';
import EmployeeGrid from '../../../components/hr/employee-grid';

const EmployeePage = props => {
  return (
    <div>
      <PageHeader>Employees</PageHeader>
      <EmployeeGrid {...props} />
    </div>
  );
};

EmployeePage.propTypes = {
  //props
  spEmployees: PropTypes.array.isRequired,
  payPoints: PropTypes.array.isRequired,
  //funcs
  loadSpEmployees: PropTypes.func.isRequired,
  loadPayPoints: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  spEmployees: getSpEmployees(state),
  payPoints: getPayPoints(state)
});

const mapDispatchToProps = {
  loadSpEmployees: spEmployeeActions.loadSpEmployees,
  loadPayPoints: payPointActions.loadPayPoints
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmployeePage)
);
