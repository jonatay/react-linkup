import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import dateFormat from "dateformat";
import FormatNumber from "../../common/format-number";
import { Icon, Button } from "antd";
import "./styles.css";

class SOBankTransactionsTable extends Component {
  state = {
    loading: false
  };
  componentDidMount() {
    this.props.loadSoBankTransactions();
    this.setState({ loading: true });
  }
  static getDerivedStateFromProps({ soBankTransactions }, prevState) {
    return soBankTransactions.length
      ? prevState
      : { ...prevState, loading: false };
  }
  render() {
    const columns = [
      {
        Header: "BankAccountId",
        accessor: "BankAccountId",
        width: 175
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
          SubComponent={({ original: row }) => (
            <div style={{ padding: "2px" }}>
              <h4>{row.ID}</h4>
              <pre>{row.Description}</pre>
            </div>
          )}
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
