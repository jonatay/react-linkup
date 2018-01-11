/*
    Jono : 18 01 09
    RightTable : React Class Component
*/
import React from 'react';
import PropTypes from 'prop-types';

import { List as ImList } from 'immutable';

import { Table, Popconfirm, Button } from 'antd';

import EditTagGroup from './EditTagGroup';
import EditCell from './EditCell';

class RightTable extends React.Component {
  handleRightChange(right, changes) {
    this.props.updateRight(right, changes);
  }

  columns = [
    {
      title: 'Resource',
      dataIndex: 'name',
      render: (text, record) => (
        <EditCell
          value={text}
          handleValueChange={name => {
            console.log(name);
          }}
        />
      )
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      render: (text, record) => (
        <EditTagGroup
          tagName="Role"
          tags={record.roles}
          handleTagsChange={roles => this.handleRightChange(record, { roles })}
        />
      )
    },
    {
      title: 'Assigned',
      dataIndex: 'assigned'
    },
    {
      dataIndex: 'key',
      render: (text, record) => (
        <Popconfirm
          title="Are you SURE you want to delete this Right?"
          onConfirm={() => this.remove(record)}
        >
          <Button type="danger" icon="delete" />
        </Popconfirm>
      )
    }
  ];

  remove(right) {
    this.props.removeRight(right);
  }

  render() {
    const { rights } = this.props;
    return <Table dataSource={rights.toArray()} columns={this.columns} />;
  }
}

RightTable.propTypes = {
  removeRight: PropTypes.func.isRequired,
  rights: PropTypes.instanceOf(ImList),
  updateRight: PropTypes.func.isRequired
};

export default RightTable;
