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

  // componentWillReceiveProps = nextProps => {
  //   const { vehicles } = nextProps;
  //   this.setState({ data: vehicles.toArray() });
  // };

  showToggleVehicleActiveConfirm = (vehicle, toggleVehicleIsActive) => {
    Modal.confirm({
      title: 'Are you sure toggle active on this vehicle?',
      content: `reg: ${vehicle.registration} name: ${vehicle.name}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        toggleVehicleIsActive(vehicle);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  columns = [
    {
      title: 'Reg.',
      dataIndex: 'registration',
      width: 100,
      defaultSortOrder: 'ascend',
      //fixed: 'left',
      sorter: (a, b) =>
        a.registration.toLowerCase().localeCompare(b.registration.toLowerCase())
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 250,
      sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    },

    {
      title: 'Cost Centre Groups',
      dataIndex: 'cost_centre_groups',
      render: (text, record) => (
        <div>
          {record.cost_centre_groups.map(ccg => (
            <Tag key={ccg.id}>
              {ccg.name.length < 13 ? ccg.name : ccg.name.substr(0, 13) + '...'}
            </Tag>
          ))}
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
      //fixed: 'right',
      width: 70,
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            ghost={true}
            size="small"
            shape="circle"
            icon="edit"
            onClick={() => this.props.onEditVehicle(record)}
          />
          <Button
            style={{ marginLeft: 5 }}
            type={record.is_active ? 'danger' : 'primary'}
            ghost={true}
            size="small"
            shape="circle"
            icon={record.is_active ? 'delete' : 'plus-circle-o'}
            onClick={() =>
              this.showToggleVehicleActiveConfirm(
                record,
                this.props.toggleVehicleIsActive
              )
            }
          />
        </span>
      )
    }
  ];
  render() {
    return (
      <Table
        size="middle"
        rowKey="id"
        dataSource={this.props.vehicles}
        columns={this.columns}
        scroll={{ y: 590 }}
        // rowClassName={(record, index) => (index % 2 === 0 ? "even" : "odd")}
        rowClassName={record =>
          record.cost_centre_groups[0] ? record.cost_centre_groups[0].name : ''
        }
        pagination={false}
        // pagination={{
        //   size: 'small',
        //   showSizeChanger: true,
        //   pageSize: pageSize,
        //   pageSizeOptions: ['16', '32', '64', '128', '256'],
        //   showTotal: (total, range) =>
        //     `${range[0]}-${range[1]} of ${total} vehicles`
        // }}
      />
    );
  }
}

export default VehicleTable;
