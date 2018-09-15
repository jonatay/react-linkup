/*
    Jono : 18 09 12
    AttendLogFilter : React Class Component
*/
import React from 'react';

class AttendLogFilter extends React.Component {
  componentDidMount() {
    this.props.loadAttendUsers();
    this.props.loadAttendDepts();
    this.props.loadAttendLogs(this.props.listParams);
  }
  render() {
    return <div>Attend Log Filter</div>;
  }
}

export default AttendLogFilter;
