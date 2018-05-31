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
        Header: 'Act Date',
        width: 80,
        accessor: 'action_date',
        Cell: props => moment(props.value).format('YY-MM-DD')
      },
      {
        Header: 'Submitted',
        width: 120,
        accessor: 'submitted',
        Cell: props =>
          props.value
            ? moment(props.value).format('YY-MM-DD HH:mm')
            : 'not submitted'
      },
      {
        Header: 'Tax Period',
        Cell: props =>
          props.original.tax_year && props.original.tax_month ? (
            <span>
              {props.original.tax_year} / {props.original.tax_month}
            </span>
          ) : (
            <br />
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
        Cell: ({ original: { id, submitted } }) => (
          <span>
            <Button
              type="primary"
              size="small"
              icon="upload"
              disabled={submitted}
              onClick={() => this.props.submitSageBatch(id)}
            >
              Submit
            </Button>{' '}
            <Button
              type="primary"
              ghost={true}
              size="small"
              shape="circle"
              icon="sync"
              disabled={!submitted}
              onClick={() => this.props.querySageBatch(id)}
            />{' '}
            <Button
              type="danger"
              ghost={true}
              size="small"
              shape="circle"
              icon="delete"
              disabled={submitted}
              onClick={() => this.props.deleteSageBatch(id)}
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
      },
      {
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
