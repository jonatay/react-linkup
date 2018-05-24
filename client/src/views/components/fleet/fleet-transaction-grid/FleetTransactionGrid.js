/*
    Jono : 18 04 10
    FleetTransactionTable : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import dateFormat from 'dateformat';
import _ from 'lodash';

import { Select } from 'antd';
const Option = Select.Option;

const getLkpArray = (array, key) =>
  _.uniqBy(array, ai => ai[key])
    .map(ai => ai[key])
    .sort();

const SelectFilter = ({ filter, onChange, optionArray }) => (
  <Select
    onChange={value => onChange(value)}
    style={{ width: '100%' }}
    value={filter ? filter.value : 'All'}
  >
    <Option value="all">All</Option>
    {optionArray.map(v => <Option key={v}>{v}</Option>)}
  </Select>
);

const FormatNumber = ({ value, decimals, style = {} }) => (
  <span style={{ float: 'right', ...style }}>
    {new Intl.NumberFormat('en-ZA', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    }).format(value)}
  </span>
);

const selectFilterMethod = (filter, row) =>
  filter.value === 'all' ? true : filter.value === row[filter.id];

class FleetTransactionGrid extends React.Component {
  state = {
    data: [],
    filteredFleetTransactions: [],
    pages: -1,
    loading: false,
    tranTypes: [],
    vehicles: [],
    drivers: [],
    merchants: [],
    towns: [],
    costCentreGroups: []
  };

  static getDerivedStateFromProps(
    {
      fleetTransactions,
      fleetTransactionsPageCount,
      filteredFleetTransactions,
      allFleetTransactions
    },
    prevState
  ) {
    if (allFleetTransactions && allFleetTransactions.size > 0) {
      const fft = filteredFleetTransactions.toArray();
      return {
        ...prevState,
        data: fleetTransactions,
        filteredFleetTransactions: fft,
        pages: fleetTransactionsPageCount,
        loading: false,
        tranTypes: getLkpArray(fft, 'transaction_type'),
        vehicles: getLkpArray(fft, 'vehicle'),
        drivers: getLkpArray(fft, 'driver'),
        merchants: getLkpArray(fft, 'merchant'),
        towns: getLkpArray(fft, 'town'),
        costCentreGroups: getLkpArray(fft, 'cost_centre_group')
      };
    }
    return false;
  }

  render() {
    const {
      data,
      filteredFleetTransactions,
      tranTypes,
      towns,
      costCentreGroups,
      merchants,
      drivers,
      vehicles
    } = this.state;

    const columns = [
      {
        Header: 'Date',
        accessor: 'transaction_date', // String-based value accessors!
        Cell: props => <span>{dateFormat(props.value, 'yy-mm-dd')}</span>,
        minWidth: 100,
        maxWidth: 120,
        filterMethod: (filter, row) =>
          filter.value === null
            ? true
            : dateFormat(row[filter.id], 'yy-mm-dd') ===
              dateFormat(filter.value, 'yy-mm-dd'),
        // Filter: ({ filter, onChange }) => (
        //   <div style={{ height: 30 }}>
        //     <RangePicker
        //     // value={filter ? filter.value : null}
        //     //defaultValue={[moment().subtract(3,'months'), moment()]}
        //     // onChange={val => onChange(val)}
        //     />
        //   </div>
        // )
        filterable: false
      },
      {
        Header: 'Reg',
        accessor: 'registration',
        minWidth: 80,
        maxWidth: 100
      },
      {
        Header: 'Vehicle Name',
        accessor: 'vehicle',
        minWidth: 200,
        maxWidth: 120,
        filterMethod: selectFilterMethod,
        Filter: props => <SelectFilter {...props} optionArray={vehicles} />
      },
      {
        Header: 'Driver',
        accessor: 'driver',
        minWidth: 200,
        maxWidth: 120,
        filterMethod: selectFilterMethod,
        Filter: props => <SelectFilter {...props} optionArray={drivers} />
      },
      {
        Header: 'CC Grp',
        accessor: 'cost_centre_group',
        minWidth: 100,
        maxWidth: 120,
        filterMethod: selectFilterMethod,
        Filter: props => (
          <SelectFilter {...props} optionArray={costCentreGroups} />
        )
      },
      {
        Header: 'Tran Type',
        accessor: 'transaction_type',
        maxWidth: 120,
        minWidth: 100,
        filterMethod: selectFilterMethod,
        Filter: props => <SelectFilter {...props} optionArray={tranTypes} />
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: props => (
          <FormatNumber
            {...props}
            decimals={2}
            style={{ color: 'navy', fontWeight: 'bold' }}
          />
        ),
        minWidth: 80,
        maxWidth: 120,
        sortMethod: (a, b) => a - b,
        Footer: (
          <FormatNumber
            style={{ color: 'navy', fontWeight: 'bold' }}
            decimals={2}
            value={_.sumBy(filteredFleetTransactions, 'amount')}
          />
        )
      },
      {
        Header: 'Vat',
        accessor: 'vat_amount',
        Cell: props => <FormatNumber value={props.value} decimals={2} />,
        minWidth: 60,
        maxWidth: 100,
        sortMethod: (a, b) => a - b,
        Footer: (
          <FormatNumber
            value={_.sumBy(filteredFleetTransactions, 'vat_amount')}
            decimals={2}
          />
        )
      },
      {
        Header: 'Odometer',
        accessor: 'odometer',
        minWidth: 60,
        maxWidth: 80,
        filterable: false,
        Cell: props => (
          <FormatNumber
            {...props}
            decimals={0}
            style={{ color: 'darkgreen', fontWeight: 400 }}
          />
        )
      },
      {
        Header: 'Merchant',
        accessor: 'merchant',
        minWidth: 120,
        maxWidth: 180,
        filterMethod: selectFilterMethod,
        Filter: props => <SelectFilter {...props} optionArray={merchants} />
      },
      {
        Header: 'Town',
        accessor: 'town',
        minWidth: 80,
        maxWidth: 120,
        filterMethod: selectFilterMethod,
        Filter: props => <SelectFilter {...props} optionArray={towns} />
      }
    ];
    return (
      <ReactTable
        data={data}
        columns={columns}
        filterable
        defaultPageSize={20}
        showPaginationTop={false}
        showPaginationBottom={true}
        manual
        pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
        loading={this.state.loading}
        onFetchData={(state, instance) => {
          this.setState({ loading: true });

          const filtered = state.filtered.filter(v => v.value !== 'all');

          this.props.filterFleetTransactions({
            page: state.page,
            pageSize: state.pageSize,
            sorted: state.sorted,
            filtered: filtered
          });
        }}
        getTrGroupProps={() => ({ style: { lineHeight: 1 } })}
        style={{
          height: window.innerHeight - 155 // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className="-striped -highlight"
        defaultSorted={[
          {
            id: 'transaction_date',
            desc: true
          }
        ]}
      />
    );
  }
}

export default FleetTransactionGrid;

/* taken out

defaultFilterMethod={(filter, row) => {
          return (
            String(row[filter.id])
              .toLowerCase()
              .indexOf(filter.value.toLowerCase()) >= 0
          );
        }}






 */
