/*
    Jono : 18 04 12
    FleetTransactionFilter : React Class Component
*/
import React from 'react';
import { DatePicker, Row, Col } from 'antd';
const { RangePicker } = DatePicker;
// const Option = Select.Option;

class FleetTransactionFilter extends React.Component {
  state = {
    params: {
      dateRange: []
    }
  };

  static getDerivedStateFromProps(
    { allFleetTransactions, listParams, loadFleetTransactions },
    prevState
  ) {
    if (
      prevState.params &&
      prevState.params.dateRange &&
      prevState.params.dateRange.length === 0 &&
      listParams.dateRange.length === 2
    ) {
      loadFleetTransactions(listParams);
    }
    return { params: { ...listParams } };
  }

  onDateRangeChange(date) {
    console.log(date);
    this.props.loadFleetTransactions({ dateRange: date });
  }

  render() {
    return (
      <Row style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Col span={8}>
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
      </Row>
    );
  }
}

export default FleetTransactionFilter;
