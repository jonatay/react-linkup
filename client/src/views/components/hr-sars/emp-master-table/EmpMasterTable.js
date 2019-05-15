/*
    Jono : 19 01 16
    EmpMasterTable : Stateless Functional Component
*/
import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Modal, Table } from 'antd';
import EmpDetailTable from '../emp-detail-table';
import FormatNumber from '../../common/format-number';
import dateFormat from 'dateformat';

import './style.css';

const payeCodes = [4102];
const uifCodes = [4141];
const sdlCodes = [4142];

const EmpMasterTable = class EmpMasterTable extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: {
        order: 'descend',
        columnKey: 'period'
      }
    });
  };

  render() {
    const { empMasters, empDetails, empCodes, codeLkps } = this.props;

    const expandedRowRender = (rec, idx) => (
      <EmpDetailTable
        empDetails={_.sortBy(
          empDetails.filter(edr => edr.emp_master_id === rec.id),
          ['employee_code']
        )}
        empCodes={empCodes.filter(ecr => ecr.emp_master_id === rec.id)}
        codeLkps={codeLkps}
      />
    );
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    // filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: 'Period',
        dataIndex: 'period',
        key: 'period',
        sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
        sortOrder: sortedInfo.columnKey === 'period' && sortedInfo.order
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0)
      },
      {
        title: 'Tax Period',
        dataIndex: 'tax_year',
        key: 'tax_year',
        render: (text, rec) => (
          <h4>
            {text} - {rec.tax_month}
          </h4>
        ),
        sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
        sortOrder: sortedInfo.columnKey === 'tax_year' && sortedInfo.order
      },
      {
        title: 'Cubit CC',
        dataIndex: 'cubit_company_code',
        key: 'cubit_company_code'
      },
      // {
      //   title: 'Status',
      //   dataIndex: 'status_id',
      //   key: 'status_id'
      // },
      {
        title: 'Emps',
        dataIndex: 'detail_count',
        key: 'detail_count'
      },
      {
        title: 'PAYE',
        key: 'paye',
        render: rec => (
          <FormatNumber
            value={empCodes
              .filter(
                ecr =>
                  ecr.emp_master_id === rec.id &&
                  payeCodes.includes(ecr.emp_code)
              )
              .reduce((r, ecr) => r + ecr.emp_value, 0)}
            decimals={0}
            style={{ color: 'blue', fontWeight: 'bold' }}
          />
        )
      },
      {
        title: 'UIF',
        key: 'uif',
        render: rec => (
          <FormatNumber
            value={empCodes
              .filter(
                ecr =>
                  ecr.emp_master_id === rec.id &&
                  uifCodes.includes(ecr.emp_code)
              )
              .reduce((r, ecr) => r + ecr.emp_value, 0)}
            decimals={0}
            style={{ color: 'green', fontWeight: 'bold' }}
          />
        )
      },
      {
        title: 'SDL',
        key: 'sdl',
        render: rec => (
          <FormatNumber
            value={empCodes
              .filter(
                ecr =>
                  ecr.emp_master_id === rec.id &&
                  sdlCodes.includes(ecr.emp_code)
              )
              .reduce((r, ecr) => r + ecr.emp_value, 0)}
            decimals={0}
            style={{ color: 'brown', fontWeight: 'bold' }}
          />
        )
      },
      {
        title: 'When Created',
        dataIndex: 'when_create',
        key: 'when_create',
        render: val => <span>{dateFormat(val, 'yy-mm-dd HH:MM')}</span>
      },
      {
        render: rec => (
          <div>
            <Button
              style={{ margin: 5, marginRight: 20 }}
              type="primary"
              ghost={true}
              size="small"
              shape="circle"
              icon="edit"
              onClick={() => this.props.editEmp501(rec.id)}
              // disabled={!this.props.fimsPeriodIsAvailable}
            />{' '}
            <Button
              style={{ margin: 5, marginRight: 20 }}
              type="danger"
              ghost={true}
              size="small"
              shape="circle"
              icon="delete"
              onClick={() => {
                showRemoveEmpMasterConfirm(rec, this.props.removeEmpMaster);
              }}
              // disabled={!this.props.fimsPeriodIsAvailable}
            />{' '}
            <Button
              style={{ margin: 5, marginRight: 20 }}
              type="dashed"
              // ghost={true}
              size="small"
              shape="circle"
              icon="down"
              onClick={() => this.props.requestEmp501TextDownload(rec.id)}
              // disabled={!this.props.fimsPeriodIsAvailable}
            />
          </div>
        )
        // sorter: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
        // sortOrder: sortedInfo.columnKey === 'when_create' && sortedInfo.order
      }
    ];

    const showRemoveEmpMasterConfirm = (empMaster, removeEmpMaster) => {
      Modal.confirm({
        title: 'Are you sure you want to DELETE?',
        content: (
          <div>
            <h3 style={{ color: 'red' }}>
              NB; this will IRRETRIEVABLY DELETE ALL emp_master, emp_employees
              and emp_codes related to THIS period
            </h3>
            <h3>{`year: ${empMaster.tax_year} month: ${
              empMaster.tax_month
            }`}</h3>
          </div>
        ),
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          removeEmpMaster(empMaster);
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    };
    return (
      <Table
        dataSource={empMasters}
        columns={columns}
        rowKey="id"
        size="small"
        expandedRowRender={expandedRowRender}
        pagination={false}
        onChange={this.handleChange}
      />
    );
  }
};

export default EmpMasterTable;
