/*
    Jono : 18 07 20
    AccessPage : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AttendLogFilter from 'src/views/components/attend/attend-log-filter';
import AttendLogTable from 'src/views/components/attend/attend-log-table';

import {
  attendUserActions,
  attendDeptActions,
  attendLogActions,
  getAttendUsers,
  getAttendDepts,
  // getAttendLogs,
  getAttendLogsVis,
  getAttendUsersWithDeptLog,
  getAttendLogListParams,
  getAttendLogsPeriods,
  getAttendLogTableData
} from 'src/mid/attend';

const AttendPage = props => {
  return (
    <div>
      <AttendLogFilter {...props} />
      <AttendLogTable {...props} />
    </div>
  );
};

AttendPage.propTypes = {
  attendDepts: PropTypes.array.isRequired,
  attendUsers: PropTypes.array.isRequired,
  attendLogs: PropTypes.array.isRequired,
  attendLogVis: PropTypes.array.isRequired,
  listParams: PropTypes.object.isRequired,
  attendLogPeriods: PropTypes.array.isRequired,
  attendLogTableData: PropTypes.array.isRequired,
  loadAttendDepts: PropTypes.func.isRequired,
  loadAttendUsers: PropTypes.func.isRequired,
  loadAttendLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  attendUsers: getAttendUsers(state),
  attendDepts: getAttendDepts(state),
  attendLogs: getAttendUsersWithDeptLog(state),
  attendLogVis: getAttendLogsVis(state),
  listParams: getAttendLogListParams(state),
  attendLogPeriods: getAttendLogsPeriods(state),
  attendLogTableData: getAttendLogTableData(state)
});

const mapDispatchToProps = {
  loadAttendUsers: attendUserActions.loadAttendUsers,
  loadAttendDepts: attendDeptActions.loadAttendDepts,
  loadAttendLogs: attendLogActions.loadAttendLogs
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AttendPage)
);
