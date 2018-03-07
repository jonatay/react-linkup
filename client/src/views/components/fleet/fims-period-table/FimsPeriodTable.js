/*
    Jono : 18 03 04
    FimsPeriodTable : React Class Component
*/
import React from 'react';

import { Table, Button, Modal } from 'antd';

import dateFormat from 'dateformat';

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
      dataIndex: 'when_received',
      width: 200,
      render: text => dateFormat(text, 'yy-mm-dd (HH:MM:ss)')
    },
    {
      title: 'Rowcount',
      width: 100,
      dataIndex: 'rows_received'
    },
    {
      title: 'Batch Total',
      dataIndex: 'batch_total',
      width: 100,
      render: text => new Intl.NumberFormat().format(text)
    },
    {
      width: 100,
      align: 'right',
      render: rec => (
        <Button
          style={{ margin: 5, marginRight: 20 }}
          type="danger"
          ghost={true}
          size="small"
          shape="circle"
          icon="delete"
          onClick={() => {
            this.showRemoveFimsPeriodConfirm(rec, this.props.removeFimsPeriod);
          }}
        />
      )
    }
  ];

  showRemoveFimsPeriodConfirm = (fimsPeriod, removeFimsPeriod) => {
    Modal.confirm({
      title: 'Are you sure you want to DELETE this fimsPeriod?',
      content: `year: ${fimsPeriod.cal_year} month: ${fimsPeriod.cal_month}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeFimsPeriod(fimsPeriod.id);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  render() {
    const { fimsPeriods } = this.props;
    return (
      <Table
        size="middle"
        rowKey="id"
        dataSource={fimsPeriods}
        columns={this.columns}
        rowClassName={(record, index) => (index % 2 === 0 ? 'even' : 'odd')}
        scroll={{ y: 590 }}
        // rowClassName={record => record.cost_centre_groups[0].name}
        pagination={false}
      />
    );
  }
}

export default FimsPeriodTable;
