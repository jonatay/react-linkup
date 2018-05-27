/*
    Jono : 18 05 20
    SageAccountGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Popover, Button } from 'antd';

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
        Header: 'Val',
        Cell: props => (
          <span>
            <Popover
              content={
                <div>
                  <pre>
                    {JSON.stringify(props.original.validationResult, null, 2)}
                  </pre>
                </div>
              }
            >
              <Button
                type="primary"
                ghost={true}
                size="small"
                shape="circle"
                icon="check-square-o"
                onClick={() =>
                  this.props.validateSageAccount(props.original.id)
                }
              />
            </Popover>
          </span>
        )
      },
      {
        Header: 'Validated',
        accessor: 'validated'
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
        columns: [
          {
            expander: true,
            Header: () => 'Changes',
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
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default SageAccountGrid;
