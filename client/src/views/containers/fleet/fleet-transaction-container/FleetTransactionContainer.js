/*
    Jono : 18 03 15
    FleetTransactionContainer : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const FleetTransactionContainer = (props) => {
  return (
    <div></div>
  );
};

FleetTransactionContainer.propTypes = {
  yadas: PropTypes.PropTypes.instanceOf(List),
  createYada: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  yadas: getVisibleTasks(state)
});

const mapDispatchToProps = {

};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FleetTransactionContainer)
);