/*
    Jono : 18 04 23
    UserProfile : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const UserProfilePage = (props) => {
  return (
    <div><h1>User Profiule</h1></div>
  );
};

UserProfilePage.propTypes = {
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserProfilePage)
);