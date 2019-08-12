/*
    Jono : 18 07 20
    AccessPage : Stateless Functional Component
*/
import React from "react";
// import { List } from 'immutable';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AttendLogFilter from "src/views/components/attend/attend-log-filter";
import AttendLogTable from "src/views/components/attend/attend-log-table";
// import PdfAttendLog from 'src/pdf/attend/PdfAttendLog';

import {
  attendUserActions,
  attendDeptActions,
  attendLogActions,
  getAttendLogListParams,
  getAttendLogsPeriods,
  getAttendLogTableData,
  getAttendDeptsTree,
  getAttendBranchesTree,
  getAttendLogFilter,
  getAttendDepts,
  getBlobUrl
} from "src/mid/attend";

const AttendPage = props => {
  return (
    <div>
      <AttendLogFilter {...props} />
      <AttendLogTable {...props} />
    </div>
  );
};

AttendPage.propTypes = {
  attendDeptsTree: PropTypes.array.isRequired,
  attendBranchesTree: PropTypes.array.isRequired,
  attendDepts: PropTypes.array.isRequired,
  attendLogListParams: PropTypes.object.isRequired,
  attendLogPeriods: PropTypes.array.isRequired,
  attendLogTableData: PropTypes.array.isRequired,
  loadAttendDepts: PropTypes.func.isRequired,
  loadAttendUsers: PropTypes.func.isRequired,
  loadAttendLogs: PropTypes.func.isRequired,
  setAttendLogFilter: PropTypes.func.isRequired,
  attendLogFilter: PropTypes.object.isRequired,
  // PdfAttendLog : PropTypes.func.isRequired,
  loadAttendLogPdf: PropTypes.func.isRequired,
  blobUrl: PropTypes.string,
  clearAttendLogPdf: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  attendDeptsTree: getAttendDeptsTree(state),
  attendBranchesTree: getAttendBranchesTree(state),
  attendDepts: getAttendDepts(state),
  attendLogListParams: getAttendLogListParams(state),
  attendLogPeriods: getAttendLogsPeriods(state),
  attendLogTableData: getAttendLogTableData(state),
  attendLogFilter: getAttendLogFilter(state),
  // PdfAttendLog: PdfAttendLog
  blobUrl: getBlobUrl(state)
});

const mapDispatchToProps = {
  loadAttendUsers: attendUserActions.loadAttendUsers,
  loadAttendDepts: attendDeptActions.loadAttendDepts,
  loadAttendLogs: attendLogActions.loadAttendLogs,
  setAttendLogFilter: attendLogActions.filterAttendLogs,
  loadAttendLogPdf: attendLogActions.loadAttendLogPdf,
  clearAttendLogPdf: attendLogActions.clearAttendLogPdf
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AttendPage)
);
