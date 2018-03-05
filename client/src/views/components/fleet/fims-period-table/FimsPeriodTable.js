/*
    Jono : 18 03 04
    FimsPeriodTable : React Class Component
*/
import React from 'react';

import { Table } from 'antd';

class FimsPeriodTable extends React.Component {
  columns = [
    {
      title: 'Period',
      dataIndex: 'cal_year',
      width: 100,
      defaultSortOrder: 'descend',
      sorter: (a, b) =>
        a.cal_year === 0
          ? 1
          : b.cal_year === 0
            ? -1
            : a.cal_year * 12 + a.cal_month - (b.cal_year * 12 + b.cal_month),
      render: (text, record) => (
        <h4 style={{ padding: 2, marginBottom: 0 }}>
          {text} - {record.cal_month}
        </h4>
      )
    },
    {
      title: 'Last Update',
      dataIndex: 'when_received'
    },
    {
      title: 'Rowcount',
      dataIndex: 'rows_received'
    },
    {
      title: 'Batch Total',
      dataIndex: 'batch_total'
    }
  ];

  render() {
    const { fimsPeriods } = this.props;
    return (
      <Table
        size="middle"
        rowKey="id"
        dataSource={fimsPeriods}
        columns={this.columns}
        rowClassName={(record, index) => (index % 2 === 0 ? 'even' : 'odd')}
        // rowClassName={record => record.cost_centre_groups[0].name}
        pagination={false}
      />
    );
  }
}

export default FimsPeriodTable;
