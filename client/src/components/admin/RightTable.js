/*
    Jono : 18 01 09
    RightTable : React Class Component
*/
import React from 'react';
import PropTypes from 'prop-types';


import { List as ImList } from 'immutable';

import { Table } from 'antd';

class RightTable extends React.Component {

  columns = [{
    title: 'Name',
    dataIndex: 'name'
  }]

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
