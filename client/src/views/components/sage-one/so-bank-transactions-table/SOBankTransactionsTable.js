import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import dateFormat from "dateformat";
import FormatNumber from "../../common/format-number";
import { Icon, Button } from "antd";
import "./styles.css";

class SOBankTransactionsTable extends Component {
  state = {
    loading: true,
    init: false
  };

  // componentDidMount() {
  //   this.props.loadSoBankTransactions(
  //     this.props.soBankTransactionFilter,
  //     this.props.soBankTransactionPage
  //   );
  // }

  static getDerivedStateFromProps(
    {
      loadSoBankTransactions,
      loadSoBankAccounts,
      soBankTransactions,
      soBankTransactionFilter,
      soBankTransactionPage
    },
    prevState
  ) {
    if (soBankTransactions.length) {
      return { ...prevState, loading: false };
    } else if (
      !prevState.init &&
      soBankTransactionFilter &&
      soBankTransactionPage
    ) {
      loadSoBankAccounts();
      loadSoBankTransactions(soBankTransactionFilter, soBankTransactionPage);
      return { ...prevState, init: true };
    }
    return prevState;
  }

  render() {
    const { soBankAccounts } = this.props;
    const columns = [
      {
        Header: "Date",
        accessor: "Date",
        width: 80,
        Cell: ({ value }) => <span>{dateFormat(value, "GMT: yy-mm-dd")}</span>
      },

      {
        Header: "Payee",
        accessor: "Payee",
        width: 75
      },
      {
        Header: "Description",
        accessor: "Description",
        width: 200
      },
      {
        Header: "Reference",
        accessor: "Reference",
        width: 80
      },
      {
        Header: "TaxTypeId",
        accessor: "TaxTypeId",
        width: 80
      },
      {
        Header: "Exclusive",
        accessor: "Exclusive",
        width: 100,
        Cell: props => <FormatNumber {...props} decimals={2} />
      },
      {
        Header: "Total",
        accessor: "Total",
        width: 100,
        Cell: props => <FormatNumber {...props} decimals={2} />
      },
      {
        Header: "Bank Account",
        accessor: "BankAccountId",
        width: 120,
        Cell: ({ value }) => (
          <div>
            {soBankAccounts.find(ba => ba.ID === value)
              ? soBankAccounts.find(ba => ba.ID === value).Name
              : ""}
          </div>
        )
      }
    ];
    return (
      <div>
        <ReactTable
          data={this.props.soBankTransactions}
          columns={columns}
          defaultPageSize={40}
          showPaginationTop={false}
          showPaginationBottom={true}
          size="small"
          //filterable
          //loading={this.state.loading}
          defaultSorted={[
            {
              id: "Name",
              desc: false
            }
          ]}
          // SubComponent={({ original: row }) => (
          //   <div style={{ padding: "2px" }}>
          //     <h4>{row.ID}</h4>
          //     <pre>{row.Description}</pre>
          //   </div>
          // )}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default SOBankTransactionsTable;

/*

Name
BankName
AccountNumber
BranchName
BranchNumber
Active
Default
Balance
Description
LastTransactionDate
HasTransactionsWaitingForReview
HasActivity
DefaultPaymentMethodId
PaymentMethod
Modified
Created
ID

*/
