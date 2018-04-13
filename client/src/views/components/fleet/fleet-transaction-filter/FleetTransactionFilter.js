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
  onVehicleFilterChange(value) {
    console.log(value);
  }
  onFimsFilterChange(value) {
    console.log(value);
  }
  render() {
    return (
      <Row style={{ marginBottom: 10 }}>
        <Col span={5}>
          <Col span={12}>
            <p
              style={{
                margin: '5px',
                textAlign: 'right'
              }}
            >
              FIMS Period Filter:
            </p>
          </Col>
          <Col span={12}>
            <Select
              style={{ width: '100%' }}
              onChange={this.onFimsFilterChange}
            >
              <Option key="all">All</Option>
            </Select>
          </Col>
        </Col>
        <Col span={6}>
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
            <RangePicker onChange={this.onDateRangeChange} />
          </Col>
        </Col>
        <Col span={6}>
          <Col span={8}>
            <p
              style={{
                margin: '5px',
                textAlign: 'right'
              }}
            >
              Vehicle Filter:
            </p>
          </Col>
          <Col span={16}>
            <Select
              style={{ width: '100%' }}
              onChange={this.onVehicleFilterChange}
            >
              <Option key="all">All</Option>
            </Select>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default FleetTransactionFilter;
