/*
    Jono : 18 03 04
    FimsPeriodTable : React Class Component
*/
import React from 'react';

import { Table, Button, Modal, Row } from 'antd';

import dateFormat from 'dateformat';

class FimsPeriodTable extends React.Component {
  columns = [
    {
      title: 'Period',
      dataIndex: 'cal_year',
      width: 70,
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
      title: 'When Received',
      dataIndex: 'when_received',
      width: 130,
      render: text =>
        text === null ? '' : dateFormat(text, 'yy-mm-dd (HH:MM)')
    },
    {
      title: 'BRws',
      width: 50,
      dataIndex: 'rows_received'
    },
    {
      title: 'B Total',
      dataIndex: 'batch_total',
      width: 80,
      render: text =>
        new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 0 }).format(
          text
        )
    },
    {
      title: 'When Imported',
      dataIndex: 'when_imported',
      width: 130,
      render: text =>
        text === null ? '' : dateFormat(text, 'yy-mm-dd (HH:MM)')
    },
    {
      title: 'TRws',
      width: 70,
      dataIndex: 'rows_transactions'
    },
    {
      title: 'T Total',
      dataIndex: 'transactions_total',
      width: 80,
      render: text =>
        new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 0 }).format(
          text
        )
    },
    {
      width: 100,
      align: 'right',
      render: rec => (
        <Row>
          <Button
            style={{ margin: 5, marginRight: 10 }}
            type="primary"
            ghost={true}
            size="small"
            // shape="square"
            icon="rocket"
            onClick={() => {
              this.props.importFimsPeriod(rec.id);
            }}
          />
          <Button
            style={{ margin: 5, marginRight: 20 }}
            type="danger"
            ghost={true}
            size="small"
            shape="circle"
            icon="delete"
            onClick={() => {
              this.showRemoveFimsPeriodConfirm(
                rec,
                this.props.removeFimsPeriod
              );
            }}
          />
        </Row>
      )
    }
  ];

  showRemoveFimsPeriodConfirm = (fimsPeriod, removeFimsPeriod) => {
    Modal.confirm({
      title: 'Are you sure you want to DELETE?',
      content: (
        <div>
          <h3 style={{ color: 'red' }}>
            NB; this will IRRETRIEVABLY DELETE ALL fims_vouchers and
            fleet_transactions related to THIS period
          </h3>
          <h3>{`year: ${fimsPeriod.cal_year} month: ${
            fimsPeriod.cal_month
          }`}</h3>
        </div>
      ),
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