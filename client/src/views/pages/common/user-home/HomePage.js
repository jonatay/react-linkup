/*
    Jono : 18 09 21
    HomePage : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader from "../../../components/common/page-header/PageHeader";

const HomePage = (props) => {
  return (
    <div><PageHeader>home</PageHeader></div>
  );
};

HomePage.propTypes = {

}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);