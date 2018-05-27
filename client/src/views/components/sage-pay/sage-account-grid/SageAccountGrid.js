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
        accessor: 'acc_ref',
        width: 100,
        Footer: <span>{this.props.sageAccounts.length}</span>
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 200
      },
      {
        Header: 'Acc Nbr',
        accessor: 'account_number',
        width: 120
      },
      {
        Header: 'Branch Code',
        accessor: 'branch_code',
        width: 100
      },
      {
        Header: 'Bank Name',
        accessor: 'bank_name',
        width: 120
      },
      {
        Header: 'Type',
        accessor: 'account_type',
        width: 30
      },
      {
        Header: 'Beneficiary Ref',
        accessor: 'beneficiary_ref',
        width: 180
      },
      {
        Header: 'Sage Bank',
        accessor: 'sageBank.bank_name'
      },
      {
        Header: 'Sage BBranch',
        accessor: 'sageBBranch.branch_name'
      },
      {
        Header: 'Changes',
        columns: [
          {
            expander: true,
            Header: () => <strong>More</strong>,
            width: 65,
            Expander: ({ isExpanded, ...rest }) => (
              <div>
                {isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
              </div>
            ),
            style: {
              cursor: 'pointer',
              fontSize: 25,
              padding: '0',
              textAlign: 'center',
              userSelect: 'none'
            },
            Footer: () => <span>&hearts;</span>
          }
        ]
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
          filterable
          defaultSorted={[
            {
              id: 'acc_ref',
              desc: false
            }
          ]}
          SubComponent={row => (
            <div style={{ padding: '2px' }}>
              <h4>{row.original.id}</h4>
              <pre>{row.original.changes}</pre>
            </div>
          )}
        />
      </div>
    );
  }
}

export default SageAccountGrid;
