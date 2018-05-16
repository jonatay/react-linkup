/*
    Jono : 18 03 04
    FimsPeriodTable : React Class Component
*/
import React from 'react';

import { Table, Button, Modal, Row, Icon } from 'antd';

import dateFormat from 'dateformat';

class FimsPeriodTable extends React.Component {
  totalsMatch = rec =>
    Math.round(rec.batch_total) === Math.round(rec.transactions_total);
  checkTot = rec => (
    <span style={{ marginLeft: 5 }}>
      {Math.round(rec.check_total) === Math.round(rec.batch_total) ? (
        <Icon type="check" style={{ color: 'green' }} />
      ) : (
        <Icon type="close" style={{ color: 'red' }} />
      )}
      {Math.round(rec.check_total) === Math.round(rec.transactions_total) ? (
        <Icon type="check" style={{ color: 'green' }} />
      ) : (
        <Icon type="close" style={{ color: 'red' }} />
      )}
    </span>
  );
  yrMtnToInt(fimsPeriod) {
    return fimsPeriod.cal_year * 12 + fimsPeriod.cal_month;
  }
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
            : this.yrMtnToInt(a) - this.yrMtnToInt(b),
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
      style: { textAlign: 'right' },
      render: (text, record) => (
        <span
          style={{
            fontWeight: 'bold',
            color: this.totalsMatch(record) ? 'green' : 'red'
          }}
        >
          {new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 0 }).format(
            text
          )}
        </span>
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
      render: (text, record) => (
        <span
          style={{
            fontWeight: 'bold',
            color: this.totalsMatch(record) ? 'green' : 'red'
          }}
        >
          {new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 0 }).format(
            text
          )}
        </span>
      )
    },
    {
      title: 'check tot',
      width: 80,
      dataIndex: 'check_total',
      render: (text, record) => (
        <span>
          {new Intl.NumberFormat('en-ZA', {
            maximumFractionDigits: 0
          }).format(text)}
          {this.checkTot(record)}
        </span>
      )
    },
    {
      width: 100,
      align: 'right',
      title: (
        <Button
          style={{ margin: 5, marginRight: 10, float: 'left' }}
          type="primary"
          ghost={false}
          size="small"
          // shape="square"
          icon="rocket"
          onClick={() => {
            this.props.importFimsPeriodBatch(
              this.props.fimsPeriods
                .sort(
                  (a, b) =>
                    a.cal_year === 0
                      ? 1
                      : b.cal_year === 0
                        ? -1
                        : this.yrMtnToInt(a) - this.yrMtnToInt(b)
                )
                .reverse()
                .map(r => ({
                  id: r.id
                }))
            );
          }}
          disabled={!this.props.fimsPeriodIsAvailable}
        >
          Import All
        </Button>
      ),
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
            disabled={!this.props.fimsPeriodIsAvailable}
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
            disabled={!this.props.fimsPeriodIsAvailable}
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
