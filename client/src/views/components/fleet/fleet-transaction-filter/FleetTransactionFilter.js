/*
    Jono : 18 04 12
    FleetTransactionFilter : React Class Component
*/
import React from 'react';
import moment from 'moment';
import { DatePicker, Row, Col, Select } from 'antd';
import Cookies from 'js-cookie';

const { RangePicker } = DatePicker;
const Option = Select.Option;

class FleetTransactionFilter extends React.Component {
  constructor(props) {
    super(props);
    // state has to be here as dates need to be turned into moments
    let params = null;//JSON.parse(Cookies.get('fleetTransactionsFilter'));;

    if (!params) {
      params = {
        dateRange: [moment().subtract(6, 'months'), moment()]
      };
    } else if (params.dateRange) {
      params = {
        dateRange: [moment(params.dateRange[0]), moment(params.dateRange[1])]
      };
    }
    this.state = { params, options: {} };
  }

  static getDerivedStateFromProps(
    { allFleetTransactions, listParams, listOptions, loadFleetTransactions },
    prevState
  ) {
    //only load transactions here on first show, i.e. comp curr state to incoming
    if (!(listParams.dateRange || listParams.taxYear)) {
      loadFleetTransactions(prevState.params);
      return { params: { ...prevState.params }, options: { ...listOptions } };
    }
    return { params: { ...listParams }, options: { ...listOptions } };
  }

  onDateRangeChange(dateRange) {
    console.log(dateRange);
    Cookies.set('fleetTransactionsFilter', JSON.stringify({ dateRange }), {
      expires: 7
    });
    this.props.loadFleetTransactions({ dateRange });
  }

  onTaxYearChange(taxYear) {
    console.log(taxYear);
    Cookies.set('fleetTransactionsFilter', JSON.stringify({ taxYear }), {
      expires: 7
    });
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
