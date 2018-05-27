/*
    Jono : 18 05 27
    SageBatchGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class SageBatchGrid extends React.Component {
  render() {
    const columns = [
      { Header: 'Date', accessor: 'action_date' },
      {
        Header: 'Tax Period',
        Cell: props => (
          <span>
            {props.original.tax_year} / {props.original.tax_month}
          </span>
        )
      },
      { Header: 'Name', accessor: 'batch_name' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Tran Count', accessor: 'tran_count' },
      { Header: 'Batch Sum', accessor: 'tran_sum' }
    ];
    return (
      <ReactTable
        data={this.props.sageBatches}
        columns={columns}
        defaultPageSize={18}
        showPaginationTop={false}
        showPaginationBottom={true}
        filterable
        defaultSorted={[
          {
            id: 'tax_year',
            desc: true
          },
          {
            id: 'tax_month',
            desc: true
          }
        ]}
        className="-striped -highlight"
      />
    );
  }
}

export default SageBatchGrid;
