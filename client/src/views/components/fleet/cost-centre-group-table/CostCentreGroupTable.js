/*
    Jono : 18 02 23
    CostCentreGroupTable : React Class Component
*/
import React from 'react';
import { Table } from 'antd';

import './style.css';

class CostCentreGroupTable extends React.Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.props.loadCostCentreGroups();
  }

  componentWillReceiveProps = nextProps => {
    const { costCentreGroups } = nextProps;
    this.setState({ data: costCentreGroups });
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      width: 240
    },
    {
      title: 'Description',
      dataIndex: 'description',
      defaultSortOrder: 'ascend',
      sorter: (a, b) =>
        a.description.toLowerCase().localeCompare(b.description.toLowerCase()),
      width: 240
    }
  ];

  render() {
    const { data } = this.state;
    return (
      <Table
        size="middle"
        rowKey="id"
        dataSource={data}
        columns={this.columns}
        scroll={{ y: 590, x: 800 }}
        rowClassName={record => record.name}
        pagination={{
          size: 'small',
          showSizeChanger: true,
          pageSize: 16,
          pageSizeOptions: ['16', '32', '64', '128', '256'],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} cost centres`
        }}
      />
    );
  }
}

export default CostCentreGroupTable;
