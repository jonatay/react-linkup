/*
    Jono : 18 04 25
    CostCentreGroupGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button, Input } from 'antd';

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
    return this.findEditRow(cellInfo.original.id)
      ? <Input value={}/>
      : this.state.data[cellInfo.index][cellInfo.column.id];
  }

  onEditRow(original) {
    this.setState({ editing: [...this.state.editing, original] });
  }

  onCancelEdit(original) {
    this.setState({
      editing: this.state.editing.filter(r => r.id !== original.id)
    });
  }

  onPostEdit(original) {
    this.setState({
      editing: this.state.editing.filter(r => r.id !== original.id)
    });
  }

  findEditRow(id) {
    return this.state.editing.find(r => r.id === id);
  }

  render() {
    const { data, editing } = this.state;
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: this.renderEditable
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: this.renderEditable
      },
      {
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
            )}
          </span>
        )
      }
    ];

    return (
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={10}
        showPaginationTop={false}
        showPaginationBottom={true}
      />
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
