/*
    Jono : 18 02 11
    VehiclesTable : React Class Component
*/
import React from 'react';

import { Table, Tag, Button } from 'antd';

import './style.css';

class VehicleTable extends React.Component {
  state = {
    data: []
  };

  componentWillReceiveProps = nextProps => {
    const { vehicles } = nextProps;
    this.setState({ data: vehicles.toArray() });
  };

  columns = [
    {
      title: 'name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    },
    {
      title: 'reg',
      dataIndex: 'registration',
      defaultSortOrder: 'ascend',
      sorter: (a, b) =>
        a.registration.toLowerCase().localeCompare(b.registration.toLowerCase())
    },
    {
      title: 'make:model:year',
      dataIndex: 'make',
      render: (text, record) => (
        <div>
          {record.make ? (
            record.make
          ) : (
            <Tag color="magenta">
              {record.fims_names[0]
                .split(' ')[0]
                .toLowerCase()
                .replace(/^(.)|\s(.)/g, $1 => $1.toUpperCase())}
            </Tag>
          )}
          :{record.model ? (
            record.model
          ) : (
            <Tag color="magenta">
              {record.fims_names[0]
                .split(' ')
                .slice(1)
                .map(str =>
                  str
                    .toLowerCase()
                    .replace(/^(.)|\s(.)/g, $1 => $1.toUpperCase())
                )
                .join(' ')}
            </Tag>
          )}:{record.year}
        </div>
      )
    },
    {
      title: 'Fims Driver(s)',
      dataIndex: 'fims_drivers',
      render: (text, record) => <p>{text.join(',')}</p>
    },
    {
      render: (text, record) => (
        <Button
          type="primary"
          ghost={true}
          size="small"
          shape="circle"
          icon="edit"
          onClick={() => this.props.onEditVehicle(record)}
        />
      )
    }
  ];
  render() {
    const { data } = this.state;
    return <Table rowKey="id" dataSource={data} columns={this.columns} />;
  }
}

export default VehicleTable;
