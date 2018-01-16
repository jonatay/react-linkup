/*
    Jono : 18 01 13
    RolesContainer : Stateless Functional Component
*/
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getVisibleRoles, roleActions } from "../../../acl";

import RolesTree from './RolesTree';

const RolesContainer = ({ roles, createRole, removeRole, updateRole }) => {
  return (
    <RolesTree roles={roles}/>
  );
};

RolesContainer.propTypes = {
  roles: PropTypes.instanceOf(List),
  createRole: PropTypes.func.isRequired,
  removeRole: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  roles: getVisibleRoles(state)
});

const mapDispatchToProps = {
  createRole: roleActions.createRole,
  removeRole: roleActions.removeRole,
  updateRole: roleActions.updateRole
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RolesContainer)
);