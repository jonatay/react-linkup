/*
    Jono : 18 05 19
    SageBankGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class SageBankGrid extends React.Component {
  render() {
    const columns = [
      {
        Header: 'Bank Name',
        accessor: 'bank_name'
      },
      {
        Header: 'Default Code',
        accessor: 'default_code'
      }
    ];
    return (
      <div>
        <ReactTable
          data={this.props.sageBanks}
          columns={columns}
          defaultPageSize={18}
          showPaginationTop={false}
          showPaginationBottom={true}
          defaultSorted={[
            {
              id: 'bank_name',
              desc: false
            }
          ]}
        />
      </div>
    );
  }
}

export default SageBankGrid;
