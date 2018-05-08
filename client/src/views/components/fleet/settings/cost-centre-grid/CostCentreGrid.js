/*
    Jono : 18 04 25
    CostCentreGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button, Input, Modal } from 'antd';
const _ = require('lodash');

class CostCentreGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      editing: [],
      costCentreGroups: []
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  componentDidMount() {
    this.props.loadCostCentres();
    this.props.loadCostCentreGroups();
    this.props.loadTransactionTypes();
  }

  static getDerivedStateFromProps(
    { costCentres, costCentreGroups },
    prevState
  ) {
    return { ...prevState, data: costCentres, costCentreGroups };
  }

  renderEditable(cellInfo) {
    return this.findEditRow(cellInfo.original.id) ? (
      <Input
        autoFocus={cellInfo.column.id === 'name'}
        value={this.findEditRow(cellInfo.original.id)[cellInfo.column.id]}
        onChange={e =>
          this.changeEditData(
            cellInfo.original.id,
            cellInfo.column.id,
            e.target.value
          )
        }
      />
    ) : (
      this.state.data[cellInfo.index][cellInfo.column.id]
    );
  }

  onEditRow(original) {
    this.setState({ editing: [...this.state.editing, _.clone(original)] });
  }

  onDeleteRow(rec, deleteAction) {
    Modal.confirm({
      title: 'Are you sure you want to delete this CC?',
      content: (
        <ul>
          <li>name: {rec.name}</li>
          <li>description: {rec.description}</li>
        </ul>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteAction(rec);
      }
    });
  }

  onCancelEdit(original) {
    this.setState({
      editing: this.state.editing.filter(r => r.id !== original.id),
      data:
        original.id !== 'add'
          ? this.state.data
          : this.state.data.filter(r => r.id !== 'add')
    });
  }

  onPostEdit(original) {
    if (original.id === 'add') {
      this.props.createCostCentre(this.findEditRow(original.id));
    } else {
      this.props.updateCostCentre(original, this.findEditRow(original.id));
    }
    this.setState({
      data: this.state.data.filter(r => r.id !== 'add'),
      editing: this.state.editing.filter(r => r.id !== original.id)
    });
  }

  findEditRow(id) {
    return this.state.editing.find(r => r.id === id);
  }

  changeEditData(id, col, val) {
    let row = this.findEditRow(id);
    row[col] = val;
    this.setState({
      editing: this.state.editing.map(r => (r.id === id ? row : r))
    });
  }

  validateEditing(id) {
    return (
      this.findEditRow(id).name > '' && this.findEditRow(id).description > ''
    );
  }

  onAddRow() {
    const addRow = { id: 'add', name: '', description: '' };
    this.setState({
      data: [...this.state.data.filter(r => r.id !== 'add'), addRow],
      editing: [...this.state.editing.filter(r => r.id !== 'add'), addRow]
    });
  }

  render() {
    const { data } = this.state;
    const columns = [
      {
        Header: 'Cost Centre Group',
        accessor: 'cost_centre_group'
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: this.renderEditable,
        Footer: (
          <Button
            type="primary"
            size="small"
            icon="plus"
            disabled={this.findEditRow('add')}
            onClick={() => {
              this.onAddRow();
            }}
          >
            Add Cost Centre Group
          </Button>
        )
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: this.renderEditable
      },
      {
        sortable: false,
        width: 75,
        Cell: ({ original }) => (
          <span>
            {this.findEditRow(original.id) ? (
              <span>
                <Button
                  type="primary"
                  ghost={true}
                  size="small"
                  shape="circle"
                  icon="check"
                  disabled={!this.validateEditing(original.id)}
                  onClick={() => {
                    this.onPostEdit(original);
                  }}
                />
                {'  '}
                <Button
                  type="danger"
                  ghost={true}
                  size="small"
                  shape="circle"
                  icon="close"
                  onClick={() => {
                    this.onCancelEdit(original);
                  }}
                />
              </span>
            ) : (
              <span>
                <Button
                  type="primary"
                  ghost={true}
                  size="small"
                  shape="circle"
                  icon="edit"
                  onClick={() => {
                    this.onEditRow(original);
                  }}
                />
                {'  '}
                <Button
                  type="danger"
                  ghost={true}
                  size="small"
                  shape="circle"
                  icon="delete"
                  onClick={() => {
                    this.onDeleteRow(original, this.props.removeCostCentre);
                  }}
                />
              </span>
            )}
          </span>
        )
      }
    ];

    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={14}
          showPaginationTop={false}
          showPaginationBottom={true}
          defaultSorted={[
            {
              id: 'cost_centre_group',
              desc: false
            },
            {
              id: 'name',
              desc: false
            }
          ]}
        />
      </div>
    );
  }
}

export default CostCentreGrid;
