/*
    Jono : 18 02 23
    TransactionTypeTable : React Class Component
*/
import React from 'react';
import { Table } from 'antd';

import './style.css';

class TransactionTypeTable extends React.Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.props.loadTransactionTypes();
  }

  componentWillReceiveProps = nextProps => {
    const { transactionTypes } = nextProps;
    this.setState({ data: transactionTypes });
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      width: 240
    },
    {
      title: 'Fims Purchase Types',
      dataIndex: 'fims_purchase_types',
      defaultSortOrder: 'ascend',
      sorter: (a, b) =>
        a.description.toLowerCase().localeCompare(b.description.toLowerCase()),
      width: 240
    },
    {
      title: 'Vat',
      dataIndex: 'vat_rate'
    }
  ];

  render() {
    const { data } = this.state;
    return (
      <Table
        size="middle"
        rowKey="id"
        dataSource={data}
        columns={this.columns}
        scroll={{ y: 590, x: 800 }}
        rowClassName={record => record.name}
        pagination={{
          size: 'small',
          showSizeChanger: true,
          pageSize: 16,
          pageSizeOptions: ['16', '32', '64', '128', '256'],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} cost centres`
        }}
      />
    );
  }
}

export default TransactionTypeTable;
