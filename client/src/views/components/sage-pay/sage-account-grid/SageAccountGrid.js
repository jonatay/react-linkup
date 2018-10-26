/*
    Jono : 18 05 20
    SageAccountGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Popover, Button } from 'antd';
import dateFormat from 'dateformat';

const extractAccountDtls = acc => ({
  account_number: acc.account_number,
  branch_code: acc.branch_code,
  account_type: acc.account_type,
  sage_bank: acc.sageBank.bank_name
});

class SageAccountGrid extends React.Component {
  state = { updateSageId: 0, updateCubitId: 0 };
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
                type={
                  props.original.validationResult
                    ? props.original.validationResult.valid
                      ? 'primary'
                      : 'danger'
                    : 'default'
                }
                //ghost={true}
                size="small"
                shape="circle"
                icon="check-square-o"
                onClick={() =>
                  this.props.validateSageAccount(props.original.id)
                }
              />
            </Popover>{' '}
            {props.original.jdata && props.original.jdata.update ? (
              props.original.id !== this.state.updateSageId &&
              props.original.id !== this.state.updateCubitId ? (
                //Update Sage Acc
                <span>
                  <Popover
                    content={
                      <div>
                        <h3>Click to update SAGE ACCOUNT with:</h3>
                        <pre>
                          {JSON.stringify(props.original.jdata.update, null, 2)}
                        </pre>
                      </div>
                    }
                  >
                    <Button
                      type="primary"
                      ghost={true}
                      size="small"
                      shape="circle"
                      icon="upload"
                      onClick={() =>
                        this.setState({ updateSageId: props.original.id })
                      }
                    />
                  </Popover>
                  {' '}
                  <Popover
                    content={
                      <div>
                        <h3>Click to update CUBIT with:</h3>
                        <pre>
                          {JSON.stringify(
                            extractAccountDtls(props.original),
                            null,
                            2
                          )}
                        </pre>
                      </div>
                    }
                  >
                    <Button
                      type="primary"
                      ghost={true}
                      size="small"
                      shape="circle"
                      icon="download"
                      onClick={() =>
                        this.setState({ updateCubitId: props.original.id })
                      }
                    />
                  </Popover>
                </span>
              ) : (
                // confirm or cancel
                <Popover
                  content={
                    <div>
                      <h3>Are you sure?</h3>
                      {props.original.id === this.state.updateSageId ? (
                        <pre>
                          {JSON.stringify(props.original.jdata.update, null, 2)}
                        </pre>
                      ) : (
                        <pre>
                          {JSON.stringify(
                            extractAccountDtls(props.original),
                            null,
                            2
                          )}
                        </pre>
                      )}
                    </div>
                  }
                >
                  <Button
                    type="primary"
                    ghost={true}
                    size="small"
                    shape="circle"
                    icon="warning"
                    onClick={() =>
                      this.setState({ updateSageId: props.original.id })
                    }
                  />{' '}
                  <Button
                    type="danger"
                    ghost={true}
                    size="small"
                    shape="circle"
                    icon="close-circle-o"
                    onClick={() =>
                      this.setState({ updateSageId: 0, updateCubitId: 0 })
                    }
                  />
                </Popover>
              )
            ) : (
              ''
            )}
          </span>
        )
      },
      {
        Header: 'Validated',
        accessor: 'validated',
        Cell: props => (
          <span>{dateFormat(props.value, 'yy-mm-dd [HH:MM]')}</span>
        ),
        minWidth: 100,
        maxWidth: 120
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
      // {
      //   Header: 'Bank Name',
      //   accessor: 'bank_name',
      //   width: 120
      // },
      {
        Header: 'Type',
        accessor: 'account_type',
        width: 30
      },
      // {
      //   Header: 'Beneficiary Ref',
      //   accessor: 'beneficiary_ref',
      //   width: 180
      // },
      {
        Header: 'Sage Bank',
        accessor: 'sageBank.bank_name'
      },
      // {
      //   Header: 'Sage BBranch',
      //   accessor: 'sageBBranch.branch_name'
      // },
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
            }
            // Footer: () => <span>&hearts;</span>
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
