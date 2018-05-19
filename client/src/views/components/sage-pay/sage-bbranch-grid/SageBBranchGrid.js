/*
    Jono : 18 05 19
    SageBankGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class SageBBranchGrid extends React.Component {
  render() {
    const columns = [
      {
        Header: 'Bank Name',
        accessor: 'bank_name',
        width: 120
      },
      {
        Header: 'Branch Name',
        accessor: 'branch_name'
      },
      {
        Header: 'Branch Code',
        accessor: 'branch_code',
        width: 100
      },
      {
        Header: 'Sage Bank',
        accessor: 'sage_bank.bank_name',
        width: 220
      }
    ];
    return (
      <div>
        <ReactTable
          data={this.props.sageBBranches}
          columns={columns}
          defaultPageSize={18}
          showPaginationTop={false}
          showPaginationBottom={true}
          defaultSorted={[
            {
              id: 'bank_name',
              desc: false
            },
            {
              id: 'branch_name',
              desc: false
            }
          ]}
        />
      </div>
    );
  }
}

export default SageBBranchGrid;
