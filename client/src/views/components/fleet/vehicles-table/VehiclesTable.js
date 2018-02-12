/*
    Jono : 18 02 11
    VehiclesTable : React Class Component
*/
import React from 'react';

import { Table } from 'antd';

class VehiclesTable extends React.Component {
  columns = [
    {
      title: 'Vehicle Name',
      dataIndex: 'name'
    },
    {
      title: 'Registration',
      dataIndex: 'registration'
    },
    {
      title: 'MMY',
      dataIndex: 'make',
      render: (text, record) => (
        <p>
          {record.make}:{record.model}:{record.year}
        </p>
      )
    }
  ];
  render() {
    return (
      <Table
        rowKey="id"
        dataSource={this.props.vehicles.toArray()}
        columns={this.columns}
      />
    );
  }
}

export default VehiclesTable;
