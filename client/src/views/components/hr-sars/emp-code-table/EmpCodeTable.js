/*
    Jono : 19 01 17
    EmpCodeTable : Stateless Functional Component
*/
import React from 'react';

import { Table } from 'antd';
import FormatNumber from '../../common/format-number';

const EmpCodeTable = props => {
  const { empCodes, codeLkps } = props;
  const columns = [
    {
      title: 'Code',
      dataIndex: 'emp_code',
      key: 'emp_code'
    },
    {
      title: 'Code Name',
      dataIndex: 'emp_code',
      key: 'emp_name',
      render: text =>
        codeLkps.find(cl => cl.emp_code === text)
          ? codeLkps.find(cl => cl.emp_code === text).name
          : 'unknown'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Acc Name',
      dataIndex: 'accname',
      key: 'accname'
    },
    {
      title: 'Value',
      dataIndex: 'emp_value',
      key: 'emp_value',
      render: (text, rec) =>
        rec.sum_credit > 0 ? (
          <FormatNumber
            value={parseFloat(text)}
            decimals={2}
            style={{ color: 'navy', fontWeight: 'bold' }}
          />
        ) : (
          <FormatNumber
            value={parseFloat(text)}
            decimals={2}
            style={{ color: 'red', fontWeight: 'bold' }}
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
      key: 'sum_debit',
      render: (text, rec) => (
        <FormatNumber
          value={parseFloat(text)}
          decimals={2}
          style={{ color: 'red', fontWeight: 'bold' }}
        />
      )
    },
    {
      title: 'Cr',
      dataIndex: 'sum_credit',
      key: 'sum_credit',
      render: (text, rec) => (
        <FormatNumber
          value={parseFloat(text)}
          decimals={2}
          style={{ color: 'navy', fontWeight: 'bold' }}
        />
      )
    }
  ];
  return (
    <Table
      dataSource={empCodes}
      columns={columns}
      size="small"
      pagination={false}
      rowKey="id"
    />
  );
};

export default EmpCodeTable;
