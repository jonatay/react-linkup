/*
    Jono : 19 01 16
    EmpMasterTable : Stateless Functional Component
*/
import React from 'react';
import { Table } from 'antd';
import EmpDetailTable from '../emp-detail-table';

const EmpMasterTable = props => {
  const expandedRowRender = (rec, idx) => (
    <EmpDetailTable
      empDetails={props.empDetails.filter(edr => edr.emp_master_id === rec.id)}
      empCodes={props.empCodes.filter(ecr => ecr.emp_master_id === rec.id)}
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
      title: 'When Created',
      dataIndex: 'when_create',
      key: 'when_create'
    }
  ];
  return (
    <Table
      dataSource={props.empMasters}
      columns={columns}
      rowKey="id"
      size="small"
      expandedRowRender={expandedRowRender}
      pagination={false}
    />
  );
};

export default EmpMasterTable;
