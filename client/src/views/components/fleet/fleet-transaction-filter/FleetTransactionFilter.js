/*
    Jono : 18 04 12
    FleetTransactionFilter : React Class Component
*/
import React from 'react';
import moment from 'moment';
import { DatePicker, Row, Col, Select } from 'antd';

const { RangePicker } = DatePicker;
const Option = Select.Option;

class FleetTransactionFilter extends React.Component {
  state = {
    params: {
      // dateRange: []
    },
    options: {}
  };

  static getDerivedStateFromProps(
    { allFleetTransactions, listParams, listOptions, loadFleetTransactions },
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
    return { params: { ...listParams }, options: { ...listOptions } };
  }

  onDateRangeChange(dateRange) {
    console.log(dateRange);
    this.props.loadFleetTransactions({ dateRange });
  }

  onTaxYearChange(taxYear) {
    console.log(taxYear);
    this.props.loadFleetTransactions({ taxYear });
  }

  render() {
    return (
      <Row style={{ marginBottom: 10 }}>
        <Col span={5}>
          <Col span={8}>
            <p
              style={{
                margin: '5px',
                textAlign: 'right'
              }}
            >
              Tax Year:
            </p>
          </Col>
          <Col span={16}>
            <Select
              style={{ width: 80 }}
              value={this.state.params.taxYear}
              onChange={taxYear => this.onTaxYearChange(taxYear)}
            >
              {this.state.options.taxYears.map(ty => (
                <Option key={ty}>{ty}</Option>
              ))}
            </Select>
          </Col>
        </Col>
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
