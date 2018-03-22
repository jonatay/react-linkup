/*
    Jono : 18 02 11
    TransactionsTable : React Class Component
*/
import React from 'react';
import dateFormat from 'dateformat';

import { Table, Button, Modal, Row } from 'antd';

class FleetTransactionsTable extends React.Component {
  componentDidMount() {
    this.props.loadFleetTransactions();
  }

  columns = [
    {
      title: 'date',
      dataIndex: 'transaction_date',
      width: 20,
      render: text => (text === null ? '' : dateFormat(text, 'yy-mm-dd')),
      defaultSortOrder: 'descend',
      sorter: (a, b) =>
        new Date(b.transaction_date) - new Date(a.transaction_date)
    },
    {
      title: 'reg',
      dataIndex: 'registration',
      width: 25
    },
    {
      title: 'vehicle',
      dataIndex: 'vehicle',
      width: 45,
      render: text => (text.length > 18 ? text.substring(0, 18) + '...' : text)
    },
    {
      title: 'driver',
      dataIndex: 'driver',
      width: 35
    },
    {
      title: 'cc',
      dataIndex: 'cost_centre_group',
      width: 20
    },
    {
      title: 'type',
      dataIndex: 'transaction_type',
      width: 20
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
      )
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
      )
    },
    {
      title: 'merchant',
      dataIndex: 'merchant',
      width: 40
    },
    {
      title: 'town',
      dataIndex: 'town',
      width: 30
    }
  ];

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
      />
    );
  }
}

export default FleetTransactionsTable;
