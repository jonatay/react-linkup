/*
    Jono : 18 02 11
    TransactionsTable : React Class Component
*/
import React from 'react';
import dateFormat from 'dateformat';

import { Table } from 'antd';

class FleetTransactionsTable extends React.Component {
  state = { filterLists: null, filteredInfo: { transaction_date: null } };
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps, prevState);
    return nextProps.fleetTransactions && nextProps.fleetTransactions.length > 0
      ? {
          ...prevState,
          filterLists: nextProps.fleetTransactions.map(ft => ({
            text: dateFormat(ft.transaction_date, 'yy-mm-dd'),
            value: ft.transaction_date
          }))
        }
      : prevState;
  }

  componentDidMount() {
    this.props.loadFleetTransactions();
  }

  columns = [
    {
      title: 'date',
      dataIndex: 'transaction_date',
      width: 20,
      render: text => (text === null ? '' : dateFormat(text, 'yy-mm-dd')),
      // defaultSortOrder: 'descend',
      // sorter: (a, b) =>
      //   new Date(b.transaction_date) - new Date(a.transaction_date),
      filters: this.state.filterLists,
      filteredValue: this.state.filteredInfo.transaction_date || null,
      onFilter: (value, record) => record.transaction_date.includes(value),
      filterMultiple: true
    },
    {
      title: 'reg',
      dataIndex: 'registration',
      width: 25,
      sorter: (a, b) =>
        a.registration > b.registration
          ? 1
          : a.registration < b.registration ? -1 : 0
    },
    {
      title: 'vehicle',
      dataIndex: 'vehicle',
      width: 45,
      render: text => (text.length > 18 ? text.substring(0, 18) + '...' : text),
      sorter: (a, b) =>
        a.vehicle > b.vehicle ? 1 : a.vehicle < b.vehicle ? -1 : 0
    },
    {
      title: 'driver',
      dataIndex: 'driver',
      width: 35,
      sorter: (a, b) => (a.driver > b.driver ? 1 : a.driver < b.driver ? -1 : 0)
    },
    {
      title: 'cc',
      dataIndex: 'cost_centre_group',
      width: 20,
      sorter: (a, b) =>
        a.cost_centre_group > b.cost_centre_group
          ? 1
          : a.cost_centre_group < b.cost_centre_group ? -1 : 0
    },
    {
      title: 'type',
      dataIndex: 'transaction_type',
      width: 20,
      sorter: (a, b) =>
        a.transaction_type > b.transaction_type
          ? 1
          : a.transaction_type < b.transaction_type ? -1 : 0
    },
    {
      title: 'amount',
      dataIndex: 'amount',
      width: 25,
      render: text => (
        <span style={{ width: '100%', textAlign: 'right' }}>
          {new Intl.NumberFormat('en-ZA', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          }).format(text)}
        </span>
      ),
      sorter: (a, b) => new Date(b.amount) - new Date(a.amount)
    },
    {
      title: 'vat',
      dataIndex: 'vat_amount',
      width: 15,
      render: text => (
        <span style={{ textAlign: 'right' }}>
          {new Intl.NumberFormat('en-ZA', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          }).format(text)}
        </span>
      ),
      sorter: (a, b) => new Date(b.vat_amount) - new Date(a.vat_amount)
    },
    {
      title: 'merchant',
      dataIndex: 'merchant',
      width: 40,
      sorter: (a, b) =>
        a.merchant > b.merchant ? 1 : a.merchant < b.merchant ? -1 : 0
    },
    {
      title: 'town',
      dataIndex: 'town',
      width: 30,
      sorter: (a, b) => (a.town > b.town ? 1 : a.town < b.town ? -1 : 0)
    }
  ];

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  render() {
    return (
      <Table
        size="middle"
        rowKey="id"
        dataSource={this.props.fleetTransactions}
        columns={this.columns}
        // rowClassName={(record, index) => (index % 2 === 0 ? 'even' : 'odd')}
        scroll={{ y: 590 }}
        rowClassName={record => record.cost_centre_group}
        pagination={false}
        onChange={this.handleChange}
        footer={pageData => (
          <ul>
            <li>
              tot amount:{' '}
              <strong>
                {pageData.length > 0
                  ? new Intl.NumberFormat('en-ZA', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    }).format(
                      pageData.reduce(
                        (amt, rec) =>
                          amt.amount
                            ? amt.amount + rec.amount
                            : amt + rec.amount
                      )
                    )
                  : '0'}
              </strong>
            </li>
            <li>
              tot VAT:{' '}
              <strong>
                {pageData.length > 0
                  ? new Intl.NumberFormat('en-ZA', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    }).format(
                      pageData.reduce(
                        (amt, rec) =>
                          typeof amt.vat_amount !== 'undefined'
                            ? amt.vat_amount + rec.vat_amount
                            : amt + rec.vat_amount
                      )
                    )
                  : '0'}
              </strong>
            </li>
          </ul>
        )}
      />
    );
  }
}

export default FleetTransactionsTable;
