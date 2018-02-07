/*
    Jono : 18 02 03
    fleet-container : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const FleetContainer = (props) => {
  return (
    <div>Fleet Container</div>
  );
};

FleetContainer.propTypes = {
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FleetContainer)
);