/*
    Jono : 18 04 25
    CostCentreGroupGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button, Input, Modal } from 'antd';
const _ = require('lodash');

class CostCentreGroupGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      editing: []
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  componentDidMount() {
    this.props.loadCostCentreGroups();
  }

  static getDerivedStateFromProps({ costCentreGroups }, prevState) {
    return { ...prevState, data: costCentreGroups };
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
        onKeyDown={k => {
          switch (k.keyCode) {
            case 27:
              this.onCancelEdit(cellInfo.original.id);
              break;
            case 13:
              this.onPostEdit(cellInfo.original.id);
              break;
            default:
              break;
          }
        }}
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
      title: 'Are you sure you want to delete this CCG?',
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

  onCancelEdit(id) {
    this.setState({
      editing: this.state.editing.filter(r => r.id !== id),
      data:
        id !== 'add'
          ? this.state.data
          : this.state.data.filter(r => r.id !== 'add')
    });
  }

  onPostEdit(id) {
    if (id === 'add') {
      this.props.createCostCentreGroup(this.findEditRow(id));
    } else {
      this.props.updateCostCentreGroup(id, this.findEditRow(id));
    }
    this.setState({
      data: this.state.data.filter(r => r.id !== 'add'),
      editing: this.state.editing.filter(r => r.id !== id)
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
            Add
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
                    this.onPostEdit(original.id);
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
                    this.onCancelEdit(original.id);
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
                    this.onDeleteRow(
                      original,
                      this.props.removeCostCentreGroup
                    );
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
              id: 'name',
              desc: false
            }
          ]}
        />
      </div>
    );
  }
}

export default CostCentreGroupGrid;

/*
 {
                  const data = [...this.state.data];
                  data[index].isEditing = true;
                  this.setState({ data });

              }
 */
// contentEditable
// suppressContentEditableWarning
// onBlur={e => {
//   const data = [...this.state.data];
//   data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
//   this.setState({ data });
// }}
// dangerouslySetInnerHTML={{
//   __html: this.state.data[cellInfo.index][cellInfo.column.id]
// }}
