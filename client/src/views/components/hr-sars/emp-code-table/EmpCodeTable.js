/*
    Jono : 19 01 17
    EmpCodeTable : Stateless Functional Component
*/
import React from 'react';

import { Table } from 'antd';

const EmpCodeTable = props => {
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
      pagination={false}
      rowKey="id"
    />
  );
};

export default EmpCodeTable;
