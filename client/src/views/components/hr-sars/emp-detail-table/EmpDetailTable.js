/*
    Jono : 19 01 17
    EmpCodeTable : Stateless Functional Component
*/
import React from 'react';
import _ from 'lodash';
import { Table } from 'antd';

import EmpCodeTable from '../emp-code-table';
import FormatNumber from '../../common/format-number';

const payeCodes = [4102];
const uifCodes = [4141];
const sdlCodes = [4142];

const EmpDetailTable = props => {
  const { empCodes, empDetails, codeLkps } = props;
  const expandedRowRender = (rec, idx) => (
    <EmpCodeTable
      empCodes={_.sortBy(
        empCodes.filter(ecr => ecr.emp_employee_id === rec.id),
        ['emp_code', 'tax_month']
      )}
      codeLkps={codeLkps}
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
      title: 'PAYE',
      key: 'paye',
      render: rec => (
        <FormatNumber
          value={empCodes
            .filter(
              ecr =>
                ecr.emp_employee_id === rec.id &&
                payeCodes.includes(ecr.emp_code)
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
                ecr.emp_employee_id === rec.id &&
                uifCodes.includes(ecr.emp_code)
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
                ecr.emp_employee_id === rec.id &&
                sdlCodes.includes(ecr.emp_code)
            )
            .reduce((r, ecr) => r + ecr.emp_value, 0)}
          decimals={2}
          style={{ color: 'brown', fontWeight: 'bold' }}
        />
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
      dataSource={empDetails}
      columns={columns}
      size="small"
      expandedRowRender={expandedRowRender}
      pagination={false}
      rowKey="id"
    />
  );
};

export default EmpDetailTable;
