/*
    Jono : 18 05 20
    SageAccountGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class SageAccountGrid extends React.Component {
  render() {
    const columns = [
      {
        Header: 'Acc Ref',
        accessor: 'acc_ref'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Acc Nbr',
        accessor: 'account_number'
      },
      {
        Header: 'Branch Code',
        accessor: 'branch_code'
      },
      {
        Header: 'Bank Name',
        accessor: 'bank_name'
      }
    ];
    return (
      <div>
        <ReactTable
          data={this.props.sageAccounts}
          columns={columns}
          defaultPageSize={18}
          showPaginationTop={false}
          showPaginationBottom={true}
          defaultSorted={[
            {
              id: 'acc_ref',
              desc: false
            }
          ]}
        />
      </div>
    );
  }
}

export default SageAccountGrid;
