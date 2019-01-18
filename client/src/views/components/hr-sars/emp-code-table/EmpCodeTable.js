/*
    Jono : 19 01 17
    EmpCodeTable : Stateless Functional Component
*/
import React from 'react';

import { Table } from 'antd';
import FormatNumber from '../../common/format-number';

const EmpCodeTable = props => {
  const columns = [
    {
      title: 'Code',
      dataIndex: 'emp_code',
      key: 'emp_code'
    },
    {
      title: 'Value',
      dataIndex: 'emp_value',
      key: 'emp_value',
      Cell: value => (
        <FormatNumber
          {...value}
          decimals={2}
          style={{ color: 'navy', fontWeight: 'bold' }}
        />
      )
    },
    {
      title: 'Month',
      dataIndex: 'tax_month',
      key: 'tax_month'
    },
    {
      title: 'Dr',
      dataIndex: 'sum_debit',
      key: 'sum_debit'
    },
    {
      title: 'Cr',
      dataIndex: 'sum_credit',
      key: 'sum_credit'
    }
  ];
  return (
    <Table
      dataSource={props.empCodes}
      columns={columns}
      size="small"
      pagination={false}
      rowKey="id"
    />
  );
};

export default EmpCodeTable;
