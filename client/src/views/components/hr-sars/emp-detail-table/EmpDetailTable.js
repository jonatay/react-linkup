/*
    Jono : 19 01 17
    EmpCodeTable : Stateless Functional Component
*/
import React from 'react';

import { Table } from 'antd';

import EmpCodeTable from '../emp-code-table';

const EmpDetailTable = props => {
  const expandedRowRender = (rec, idx) => (
    <EmpCodeTable
      empCodes={props.empCodes.filter(ecr => ecr.emp_employee_id === rec.id)}
    />
  );

  const columns = [
    {
      title: 'Emp Code',
      dataIndex: 'employee_code',
      key: 'employee_code'
    },
    {
      title: 'Name',
      dataIndex: 'surname',
      key: 'surname',
      render: (text, rec) => (
        <div>
          {text}, {rec.first_names}
        </div>
      )
    },
    {
      title: 'Periods Worked',
      dataIndex: 'periods_worked',
      key: 'periods_worked'
    }
  ];
  return (
    <Table
      dataSource={props.empDetails}
      columns={columns}
      size="small"
      expandedRowRender={expandedRowRender}
      pagination={false}
      rowKey="id"
    />
  );
};

export default EmpDetailTable;
