/*
    Jono : 18 05 27
    SageBatchGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

import { Button } from 'antd';

const FormatNumber = ({ value, decimals, style = {} }) => (
  <span style={{ float: 'right', ...style }}>
    {new Intl.NumberFormat('en-ZA', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    }).format(value)}
  </span>
);

class SageBatchGrid extends React.Component {
  render() {
    const columns = [
      {
        Header: 'Date',
        accessor: 'action_date',
        Cell: props => moment(props.original.action_date).format('YY-MM-DD')
      },
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
      {
        Header: 'Batch Sum',
        accessor: 'tran_sum',
        Cell: props => (
          <FormatNumber
            value={props.value / 100}
            decimals={2}
            style={{ color: 'navy', fontWeight: 'bold' }}
          />
        )
      },
      {
        Cell: props => (
          <span>
            <Button
              type="danger"
              ghost={true}
              size="small"
              shape="circle"
              icon="delete"
              onClick={() => this.props.deleteSageBatch(props.original.id)}
            />
          </span>
        )
      },
      {
        columns: [
          {
            expander: true,
            // Header: () => 'Changes',
            // width: 65,
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
    const btColumns = [
      {
        Header: 'Index',
        accessor: 'index'
      },      {
        Header: 'Acc Ref',
        accessor: 'account_reference'
      },
      {
        Header: 'Name',
        accessor: 'account_name'
      },
      {
        Header: 'Amount',
        accessor: 'payment_amount',
        Cell: props => (
          <FormatNumber
            value={props.value / 100}
            decimals={2}
            style={{ color: 'navy', fontWeight: 'bold' }}
          />
        ),
        minWidth: 80,
        maxWidth: 120
      }
    ];
    return (
      <ReactTable
        data={this.props.sageBatches}
        columns={columns}
        defaultPageSize={18}
        showPaginationTop={false}
        showPaginationBottom={true}
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
        SubComponent={props => (
          <div style={{ padding: '10px' }}>
            <ReactTable
              columns={btColumns}
              data={props.original.batch_transactions.map(sbt =>
                JSON.parse(sbt)
              )}
            />
          </div>
        )}
      />
    );
  }
}

export default SageBatchGrid;
