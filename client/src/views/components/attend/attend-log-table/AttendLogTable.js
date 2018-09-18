/*
    Jono : 18 09 08
    AttendLogTable : React Class Component
*/
import React from 'react';
import dateFormat from 'dateformat';
import moment from 'moment';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Tag, Popover } from 'antd';
import './style.css';

// import _ from 'lodash';

// import selectTableHOC from 'react-table/lib/hoc/selectTable';
// import treeTableHOC from 'react-table/lib/hoc/treeTable';
//
// const SelectTreeTable = selectTableHOC(treeTableHOC(ReactTable));

class AttendLogTable extends React.Component {
  state = {
    data: [],
    perCols: [],
    tableRowCount: 20
  };

  static getDerivedStateFromProps(
    { attendLogTableData, attendLogPeriods },
    state
  ) {
    // console.log({ attendLogTableData, attendLogPeriods });
    return {
      ...state,
      data: attendLogTableData,
      perCols: attendLogPeriods,
      tableRowCount:
        attendLogTableData.length > 0
          ? attendLogTableData.length
          : state.tableRowCount
    };
  }
  render() {
    const { data, perCols } = this.state;
    const columns = [
      {
        Header: 'Branch',
        accessor: 'parentDept.name',
        // aggregate: (values, rows) => _.round(_.mean(values)),
        // Aggregated: row => <span>row.value (avg)</span>,
        width: 80
        // Cell: props => <span>{dateFormat(props.value, 'GMT:ddd (mm-dd) HH:MM')}</span>
      },
      {
        Header: 'Dept',
        accessor: 'dept.name',
        // aggregate: (values, rows) => _.round(_.mean(values)),
        // Aggregated: row => <span>row.value (avg)</span>,
        width: 100
        // Cell: props => <span>{dateFormat(props.value, 'GMT:ddd (mm-dd) HH:MM')}</span>
      },
      {
        Header: 'Who',
        accessor: 'name',
        width: 150
      },
      ...perCols.map(p => ({
        Header: dateFormat(p, 'mm-dd ddd'),
        className: 'tdLogPeriod',
        accessor: p,
        width: 100,
        Cell: ({ value }) =>
          !value ? (
            ''
          ) : (
            <span>
              {value && value.length === 0 ? (
                moment(p).day() === 0 || moment(p).day() === 6 ? (
                  ' '
                ) : (
                  <Tag color="red">none</Tag>
                )
              ) : value.length === 1 ? (
                <Tag color="orange" className="tdLogTab">
                  {dateFormat(value[0].log_time, 'GMT:H:MM')}
                </Tag>
              ) : value.length === 2 ? (
                <span>
                  <Tag color="green" className="tdLogTab">
                    {dateFormat(value[0].log_time, 'GMT:H:MM')}
                  </Tag>
                  <Tag color="blue" className="tdLogTab">
                    {dateFormat(value[1].log_time, 'GMT:H:MM')}
                  </Tag>
                </span>
              ) : (
                <span>
                  <Tag color="green" className="tdLogTab">
                    {dateFormat(value[0].log_time, 'GMT:H:MM')}
                  </Tag>
                  <Popover
                    content={<pre>{JSON.stringify(value, null, 2)}</pre>}
                    title="Log Times"
                  >
                    <Tag color="pink" className="tdLogTab">
                      {value.length - 2}
                    </Tag>
                  </Popover>
                  <Tag color="blue" className="tdLogTab">
                    {dateFormat(value[value.length - 1].log_time, 'GMT:H:MM')}
                  </Tag>
                </span>
              )}
            </span>
          )
      }))
    ];
    return (
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={18}
        style={{
          height: window.innerHeight - 140 // This will force the table body to overflow and scroll, since there is not enough room
        }}
        sort={['parentDept.name', 'dept.name', 'name']}
        className="-striped -highlight"
        // showPaginationBottom={false}
        // pivotBy={['parentDept.name', 'dept.name']}
      />
    );
  }
}

export default AttendLogTable;

/*




{
        Header: 'Attend',
        accessor: 'attend',
        // Cell: props => <pre>{JSON.stringify(props.value, null, 2)}</pre>
        Cell: props => (
          <span>
            {props.value.map(item => (
              <span key={'main_' + props.original.id + '_' + item.log_time}>
                <Tag
                  key={'day_' + props.original.id + '_' + item.log_time}
                  color="blue"
                >
                  {dateFormat(item.log_time, 'GMT:mm-dd ddd')}{' '}
                </Tag>
                <Tag
                  key={'entry_' + props.original.id + '_' + item.entry_time}
                  color="green"
                >
                  {dateFormat(item.entry_time, 'GMT:HH:MM')}{' '}
                </Tag>
                {item.entry_time === item.exit_time ? (
                  <Tag
                    key={
                      'no_exit_' +
                      props.original.id +
                      '_' +
                      item.exit_time +
                      1.1
                    }
                    color="red"
                  >
                    --:--
                  </Tag>
                ) : (
                  <Tag
                    key={'exit_' + props.original.id + '_' + item.exit_time}
                    color="orange"
                  >
                    {dateFormat(item.exit_time, 'GMT:H:MM')}{' '}
                  </Tag>
                )}
              </span>
            ))}
          </span>
        )
      }



const treeUsers = node =>
  node.users && node.users.length > 0
    ? node.users.map(user => (
        <TreeNode
          style={{ width: '100%' }}
          title={
            <span style={{ width: 500 }}>
              <h4>{user.name}</h4>
            </span>
          }
          key={'user_' + user.id}
        />
      ))
    : '';

const treeNode = node =>
  node.children && node.children.length > 0 ? (
    <TreeNode title={node.name} key={node.id}>
      {node.children.map(child => treeNode(child))}
      {treeUsers(node)}
    </TreeNode>
  ) : (
    <TreeNode title={node.name} key={node.id}>
      {treeUsers(node)}
    </TreeNode>
  );


      <Tree defaultExpandAll defaultExpandParent>
        {this.props.attendLogVis.map(log => treeNode(log))}
      </Tree>
      <Row>
        <Col span={6}>
          <pre>
            <pre>{JSON.stringify(this.props.attendUsers, null, 2)}</pre>
          </pre>
        </Col>
        <Col span={6}>
          <pre>
            <pre>{JSON.stringify(this.props.attendDepts, null, 2)}</pre>
          </pre>
        </Col>
        <Col span={12}>
          <pre>
            <pre>{JSON.stringify(this.props.attendLogVis, null, 2)}</pre>
          </pre>
        </Col>
      </Row>


 */
