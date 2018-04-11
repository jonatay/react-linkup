/*
    Jono : 18 04 10
    FleetTransactionTable : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import dateFormat from 'dateformat';
import _ from 'lodash';

class FleetTransactionGrid extends React.Component {
  componentDidMount() {
    this.props.loadFleetTransactions();
  }
  render() {
    const columns = [
      {
        Header: 'Date',
        accessor: 'transaction_date', // String-based value accessors!
        Cell: props => <span>{dateFormat(props.value, 'yy-mm-dd')}</span>,
        maxWidth: 80
      },
      {
        Header: 'Reg',
        accessor: 'registration',
        maxWidth: 80
      },
      {
        Header: 'Vehicle Name',
        accessor: 'vehicle',
        maxWidth: 150
      },
      {
        Header: 'Driver',
        accessor: 'driver',
        maxWidth: 100
      },
      {
        Header: 'CC Grp',
        accessor: 'cost_centre_group',
        maxWidth: 100
      },
      {
        Header: 'Tran Type',
        accessor: 'transaction_type',
        maxWidth: 80
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: props => (
          <span style={{ float: 'right' }}>
            {' '}
            {new Intl.NumberFormat('en-ZA', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            }).format(props.value)}
          </span>
        ),
        maxWidth: 80,
        sortMethod: (a, b) => a - b,
        Footer: (
          <span style={{ float: 'right' }}>
            {new Intl.NumberFormat('en-ZA', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            }).format(_.sumBy(this.props.fleetTransactions, 'amount'))}
          </span>
        )
      },
      {
        Header: 'Vat',
        accessor: 'vat_amount',
        Cell: props => (
          <span style={{ float: 'right' }}>
            {new Intl.NumberFormat('en-ZA', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            }).format(props.value)}
          </span>
        ),
        maxWidth: 60,
        sortMethod: (a, b) => a - b,
        Footer: (
          <span style={{ float: 'right' }}>
            {new Intl.NumberFormat('en-ZA', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            }).format(_.sumBy(this.props.fleetTransactions, 'vat_amount'))}
          </span>
        )
      },
      {
        Header: 'Merchant',
        accessor: 'merchant',
        maxWidth: 120
      },
      {
        Header: 'Town',
        accessor: 'town',
        maxWidth: 80
      }

      // {
      //   id: 'friendName', // Required because our accessor is not a string
      //   Header: 'Friend Name',
      //   accessor: d => d.friend.name // Custom value accessors!
      // },
      // {
      //   Header: props => <span>Friend Age</span>, // Custom header components!
      //   accessor: 'friend.age'
      // }
    ];

    return <ReactTable data={this.props.fleetTransactions} columns={columns} />;
  }
}

export default FleetTransactionGrid;
