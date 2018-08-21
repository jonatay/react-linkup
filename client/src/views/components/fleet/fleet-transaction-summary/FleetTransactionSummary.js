/*
    Jono : 18 08 07
    FleetTransactionSummary : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import FormatNumber from '../../common/format-number/FormatNumber';
import createTable from 'react-table-hoc-fixed-columns';
const ReactTableFixedColumns = createTable(ReactTable);

class FleetTransactionSummary extends React.Component {
  render() {
    const data = this.props.fleetTransactionSummary;
    const periods = this.props.fleetTransactionPeriods;
    return (
      <div>
        <ReactTableFixedColumns
          data={data}
          columns={[
            {
              Header: 'Registration',
              accessor: 'registration',
              fixed: true,
              width: 70
            },
            { Header: 'Vehicle', accessor: 'vehicle', fixed: true, width: 70 },
            ...periods.map(period => ({
              Header: period,
              width: 70,
              Cell: row =>
                row.original.periods[period].amount > 0 ? (
                  <FormatNumber
                    value={row.original.periods[period].amount}
                    decimals={0}
                  />
                ) : (
                  <p />
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
