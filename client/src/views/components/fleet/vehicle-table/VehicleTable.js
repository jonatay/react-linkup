/*
    Jono : 18 02 11
    VehiclesTable : React Class Component
*/
import React from 'react';

import { Table, Tag, Button, Modal } from 'antd';

import './style.css';

class VehicleTable extends React.Component {
  state = {
    data: []
  };

  componentWillReceiveProps = nextProps => {
    const { vehicles } = nextProps;
    this.setState({ data: vehicles.toArray() });
  };

  showDeleteConfirm = (vehicle, removeVehicle) => {
    Modal.confirm({
      title: 'Are you sure delete this vehicle?',
      content: `reg: ${vehicle.registration} name: ${vehicle.name}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeVehicle(vehicle);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
      sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    },
    {
      title: 'Registration',
      dataIndex: 'registration',
      width: 100,
      defaultSortOrder: 'ascend',
      sorter: (a, b) =>
        a.registration.toLowerCase().localeCompare(b.registration.toLowerCase())
    },
    {
      title: 'Cost Centres',
      dataIndex: 'cost_centres',
      render: (text, record) => (
        <div>
          {record.cost_centres.map(cc => <Tag key={cc.vccId}>{cc.name}</Tag>)}
        </div>
      )
    },
    {
      title: 'Fims Driver(s)',
      dataIndex: 'fims_drivers',
      width: 200,
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
    return (
      <Table
        size="small"
        rowKey="id"
        dataSource={data}
        columns={this.columns}
      />
    );
  }
}

export default VehicleTable;
