import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import dateFormat from "dateformat";
import FormatNumber from "../../common/format-number";
import { Icon, Button } from "antd";
import "./styles.css";

class SOBankAccountsTable extends Component {
  state = {
    loading: false
  };
  componentDidMount() {
    this.props.loadSoBankAccounts();
    this.setState({ loading: true });
  }
  static getDerivedStateFromProps({ soBankAccounts }, prevState) {
    return soBankAccounts.length ? prevState : { ...prevState, loading: false };
  }
  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "Name",
        width: 175
      },
      {
        Header: "Bank",
        accessor: "BankName",
        width: 150,
        Cell: ({ original: row }) => (
          <p>
            {row.BankName} {row.AccountNumber ? `(${row.AccountNumber})` : ""}
          </p>
        )
      },
      {
        Header: "Branch",
        accessor: "BranchName",
        width: 150,
        Cell: ({ original: row }) => (
          <p>
            {row.BranchName} {row.BranchNumber ? `(${row.BranchNumber})` : ""}
          </p>
        )
      },
      {
        Header: "act",
        accessor: "Active",
        width: 40,
        style: { textAlign: "center", color: "green" },
        Cell: props => (props.value ? <Icon type="check-circle" /> : "")
      },
      {
        Header: "def",
        accessor: "Default",
        width: 40,
        style: { textAlign: "center", color: "navy", fontWeight: "bolder" },
        Cell: props => (props.value ? <Icon type="check-circle" /> : "")
      },
      {
        Header: "Balance",
        accessor: "Balance",
        width: 100,
        Cell: props => (
          <FormatNumber
            {...props}
            decimals={2}
            style={{
              color: props.value >= 0 ? "navy" : "red",
              fontWeight: "bold"
            }}
          />
        )
      },
      {
        Header: "Last Tran",
        accessor: "LastTransactionDate",
        width: 80,
        Cell: props => <span>{dateFormat(props.value, "yy-mm-dd")}</span>
      },
      {
        Header: "rev",
        accessor: "HasTransactionsWaitingForReview",
        width: 40,
        style: { textAlign: "center", color: "orange" },
        Cell: props => (props.value ? <Icon type="check-circle" /> : "")
      },
      {
        Header: "trans",
        accessor: "HasActivity",
        width: 40,
        style: { textAlign: "center" },
        Cell: props => (props.value ? <Icon type="check-circle" /> : "")
      },
      {
        Header: "PM",
        accessor: "PaymentMethodLkp",
        width: 50
      },
      {
        Header: "DPM",
        accessor: "DefaultPaymentMethodLkp",
        width: 50
      },
      {
        Header: "Modified",
        accessor: "Modified",
        width: 80,
        Cell: props => <span>{dateFormat(props.value, "yy-mm-dd")}</span>
      },
      {
        Header: "Created",
        accessor: "Created",
        width: 80,
        Cell: props => <span>{dateFormat(props.value, "yy-mm-dd")}</span>
      },
      {
        Cell: props => (
          <div>
            <Button
              type="primary"
              ghost={true}
              size="small"
              shape="circle"
              icon="table"
              onClick={() => this.setState({ updateSageId: props.original.id })}
            />
          </div>
        )
      }
    ];
    return (
      <div>
        <ReactTable
          data={this.props.soBankAccounts}
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

export default SOBankAccountsTable;

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
