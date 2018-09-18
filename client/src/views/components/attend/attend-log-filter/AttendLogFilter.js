/*
    Jono : 18 09 12
    AttendLogFilter : React Class Component
*/
import React from 'react';
// import Cookies from 'js-cookie';
import moment from 'moment';

import { DatePicker, Row, Col, TreeSelect, Checkbox } from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const { RangePicker } = DatePicker;
// const Option = Select.Option;

class AttendLogFilter extends React.Component {
  constructor(props) {
    super(props);
    // state has to be here as dates need to be turned into moments
    let params = null; //JSON.parse(Cookies.get('fleetTransactionsFilter'));;

    if (!params) {
      params = {
        dateRange: [moment().subtract(14, 'days'), moment()]
      };
    } else if (params.dateRange) {
      params = {
        dateRange: [moment(params.dateRange[0]), moment(params.dateRange[1])]
      };
    }
    this.state = { params, options: {}, depts: [], excludeWeekends: true };
    this.props.loadAttendLogs(params);
    this.props.loadAttendUsers();
    this.props.loadAttendDepts();
  }

  static getDerivedStateFromProps(
    {
      attendLogFilter: { depts }
    },
    state
  ) {
    return depts ? { ...state, depts } : null;
  }

  onDateRangeChange(dateRange) {
    console.log(dateRange);
    // Cookies.set('fleetTransactionsFilter', JSON.stringify({ dateRange }), {
    //   expires: 7
    // });
    this.props.loadAttendLogs({ dateRange });
  }

  onDeptChange = depts => {
    console.log('onDeptChange ', depts);
    this.setState({ depts });
    this.props.setAttendLogFilter({ depts });
  };

  onExcludeWeekendsChange = excludeWeekends => {
    console.log('onExcludeWeekendsChange', excludeWeekends);
    this.setState({ excludeWeekends });
    this.props.setAttendLogFilter({ excludeWeekends });
  };

  render() {
    const { attendDeptsTree } = this.props;
    const tProps = {
      treeData:
        attendDeptsTree && attendDeptsTree.length === 1
          ? attendDeptsTree[0].children
          : [],
      value: this.state.depts,
      onChange: this.onDeptChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Select Dept',
      treeDefaultExpandAll: true,
      style: {
        width: '100%'
      }
    };
    return (
      <Row style={{ marginBottom: 10 }}>
        <Col span={12}>
          <Col span={4}>
            <p
              style={{
                margin: '5px',
                textAlign: 'right'
              }}
            >
              Branch/Dept:
            </p>
          </Col>
          <Col span={20}>
            <TreeSelect {...tProps} />
          </Col>
        </Col>
        <Col span={8}>
          <Col span={6}>
            <p
              style={{
                margin: '5px',
                textAlign: 'right'
              }}
            >
              Date Range:
            </p>
          </Col>
          <Col span={16}>
            <RangePicker
              value={this.state.params.dateRange}
              onChange={date => this.onDateRangeChange(date)}
              allowClear={false}
            />
          </Col>
        </Col>
        <Col span={4}>
          <Checkbox
            onChange={({ target: { checked } }) =>
              this.onExcludeWeekendsChange(checked)
            }
            checked={this.state.excludeWeekends}
          >
            Exclude Weekends
          </Checkbox>
        </Col>
      </Row>
    );
  }
}

export default AttendLogFilter;
