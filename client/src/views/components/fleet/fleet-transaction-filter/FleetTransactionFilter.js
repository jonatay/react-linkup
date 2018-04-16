/*
    Jono : 18 04 12
    FleetTransactionFilter : React Class Component
*/
import React from 'react';
import { DatePicker, Row, Col, Select } from 'antd';
const { RangePicker } = DatePicker;
const Option = Select.Option;

class FleetTransactionFilter extends React.Component {
  onDateRangeChange(date, dateString) {
    console.log(date, dateString);
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
              value={this.props.dateRange}
              onChange={this.onDateRangeChange}
            />
          </Col>
        </Col>
      </Row>
    );
  }
}

export default FleetTransactionFilter;
