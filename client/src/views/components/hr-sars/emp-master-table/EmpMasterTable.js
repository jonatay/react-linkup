/*
    Jono : 19 01 16
    EmpMasterTable : Stateless Functional Component
*/
import React from 'react';
import _ from 'lodash';
import { Table } from 'antd';
import EmpDetailTable from '../emp-detail-table';
import FormatNumber from '../../common/format-number';

const incomeCodes = [4102];
const payeCodes = [4102];
const uifCodes = [4141];
const sdlCodes = [4142];

const EmpMasterTable = props => {
  const { empMasters, empDetails, empCodes, codeLkps } = props;
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
  const columns = [
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Tax Period',
      dataIndex: 'tax_year',
      key: 'tax_year',
      render: (text, rec) => (
        <h4>
          {text} - {rec.tax_month}
        </h4>
      )
    },
    {
      title: 'Cubit CC',
      dataIndex: 'cubit_company_code',
      key: 'cubit_company_code'
    },
    {
      title: 'Status',
      dataIndex: 'status_id',
      key: 'status_id'
    },
    {
      title: 'Detail Count',
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
                ecr.emp_master_id === rec.id && payeCodes.includes(ecr.emp_code)
            )
            .reduce((r, ecr) => r + ecr.emp_value, 0)}
          decimals={2}
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
                ecr.emp_master_id === rec.id && uifCodes.includes(ecr.emp_code)
            )
            .reduce((r, ecr) => r + ecr.emp_value, 0)}
          decimals={2}
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
                ecr.emp_master_id === rec.id && sdlCodes.includes(ecr.emp_code)
            )
            .reduce((r, ecr) => r + ecr.emp_value, 0)}
          decimals={2}
          style={{ color: 'brown', fontWeight: 'bold' }}
        />
      )
    },
    {
      title: 'When Created',
      dataIndex: 'when_create',
      key: 'when_create'
    }
  ];
  return (
    <Table
      dataSource={empMasters}
      columns={columns}
      rowKey="id"
      size="small"
      expandedRowRender={expandedRowRender}
      pagination={false}
    />
  );
};

export default EmpMasterTable;
