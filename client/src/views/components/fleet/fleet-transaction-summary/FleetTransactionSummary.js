/*
    Jono : 18 08 07
    FleetTransactionSummary : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import FormatNumber from '../../common/format-number/FormatNumber';
// import createTable from 'react-table-hoc-fixed-columns';
// const ReactTableFixedColumns = createTable(ReactTable);

class FleetTransactionSummary extends React.Component {
  render() {
    const data = this.props.fleetTransactionSummary;
    const periods = this.props.fleetTransactionPeriods;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Registration',
              accessor: 'registration',
              // fixed: true,
              width: 70,
              Footer: <p>{data.length}</p>
            },
            { Header: 'Vehicle', accessor: 'vehicle', width: 120 },
            ...periods.map(period => ({
              Header: period,
              width: 75,
              Cell: row =>
                row.original.periods[period].amount > 0 ? (
                  <FormatNumber
                    value={row.original.periods[period].amount}
                    decimals={0}
                  />
                ) : (
                  <p />
                ),
              Footer: ({ column: { Header } }) => (
                <FormatNumber
                  style={{fontWeight:'bolder'}}
                  value={data.reduce(
                    (tot, veh) => tot + veh.periods[Header].amount,
                    0
                  )}
                  decimals={0}
                />
              )
            }))
          ]}
          defaultPageSize={20}
          style={{
            height: '650px' // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default FleetTransactionSummary;
