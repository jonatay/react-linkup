import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import dateFormat from 'dateformat';
// import FormatNumber from '../../common/format-number';
// import _ from 'lodash';

import { Select, Button, Tooltip } from 'antd';
const Option = Select.Option;

const banks = [
  { id: 1462381520, name: 'ABSA Bank' },
  { id: 464954524, name: 'Capitec Bank' },
  { id: 1809393886, name: 'First National Bank' },
  { id: 189450181, name: 'Nedbank' },
  { id: 284678023, name: 'Standard Bank' },
  { id: 1823577098, name: '20twenty' },
  { id: 2081327577, name: 'African Bank' },
  { id: 2081327576, name: 'Albaraka' },
  { id: 560121584, name: 'Bank of Transkei' },
  { id: 1449522790, name: 'Bank of Windhoek' },
  { id: 2081327518, name: 'Bidvest Bank' },
  { id: 1208050630, name: 'Boland Bank PKS' },
  { id: 1057379156, name: 'Cape of Good Hope Bank' },
  { id: 638517993, name: 'Citibank South Africa' },
  { id: 1359491711, name: 'Commercial Bank of Namibia' },
  { id: 1102524399, name: 'Fidelity Bank' },
  { id: 917512057, name: 'Future Bank Corporation' },
  { id: 946575179, name: 'Grobank' },
  { id: 1651121208, name: 'HBZ Bank' },
  { id: 1229410299, name: 'HSBC' },
  { id: 359476398, name: 'Investec Bank' },
  { id: 2081327574, name: 'Ithala' },
  { id: 207912213, name: 'Mercantile Bank' },
  { id: 2070105475, name: 'Natal Building Society' },
  { id: 1347296834, name: 'Old Mutual' },
  { id: 1695012897, name: "People's Bank" },
  { id: 302049463, name: 'Permanent Bank' },
  { id: 1044414317, name: "Pick 'n Pay Go Banking" },
  { id: 2081327517, name: 'Postbank' },
  { id: 659107544, name: 'Rand Merchant Bank' },
  { id: 185186574, name: 'Saambou Bank' },
  { id: 2081327590, name: 'SASFIN Bank' },
  { id: 2081327592, name: 'Tyme Digital Bank' },
  { id: 2081327519, name: 'UBank (formerly Teba Bank)' },
  { id: 2081327516, name: 'Unibank' },
  { id: 2081327575, name: 'VBS Mutual Bank' }
];

const accountTypes = [
  { id: 1, name: 'Current (Cheque)' },
  { id: 2, name: 'Savings' },
  { id: 3, name: 'Transmission' },
  { id: 4, name: 'Bond' },
  { id: 6, name: 'Subscription Share' }
];

class EmployeeGrid extends React.Component {
  state = {
    spEmployees: [],
    payPoints: []
  };

  //fetch data
  componentDidMount = () => {
    this.props.loadSpEmployees();
    this.props.loadPayPoints();
  };

  // put props to state
  static getDerivedStateFromProps({ spEmployees, payPoints }, prevState) {
    if (spEmployees && spEmployees.length && payPoints && payPoints.length) {
      return { ...prevState, spEmployees, payPoints };
    }
    return { ...prevState };
  }

  //...***... render component ...***...
  render() {
    const { spEmployees, payPoints } = this.state;
    const columns = [
      {
        Header: '#',
        accessor: 'number',
        minWidth: 10
      },
      {
        Header: 'Name',
        Cell: ({ original: row }) => (
          <span> {`${row.last_name}, ${row.first_name}`}</span>
        ),
        minWidth: 30
      },
      {
        Header: 'Pay Point',
        accessor: 'pay_point_id',
        Cell: ({ value }) => (
          <span> {payPoints.filter(pp => pp.id === value)[0].name}</span>
        ),
        minWidth: 15
      },
      {
        Header: 'ID Number',
        accessor: 'id_number',
        minWidth: 25
      },
      {
        Header: 'Started',
        accessor: 'appointment_date',
        Cell: ({ value }) => <span>{dateFormat(value, 'yyyy-mm-dd')}</span>,
        minWidth: 20
      },
      {
        Header: 'Active',
        accessor: 'has_draft_payslips',
        Cell: ({ value }) => <span>{value ? 'Yes' : 'No'}</span>,
        minWidth: 5
      },
      {
        Header: 'Bank',
        accessor: 'bank_account.bank_id',
        Cell: ({ value }) => (
          <span>{banks.filter(b => b.id === value)[0].name}</span>
        ),
        minWidth: 20
      },
      {
        Header: 'Account #',
        accessor: 'bank_account.account_number',
        minWidth: 20
      },
      {
        Header: 'Branch #',
        accessor: 'bank_account.branch_code',
        minWidth: 20
      },
      {
        Header: 'Acc Type',
        accessor: 'bank_account.account_type',
        Cell: ({ value }) => (
          <span>{accountTypes.filter(b => b.id === value)[0].name}</span>
        ),
        minWidth: 10
      },
      { Header: 'Income Tax #', accessor: 'income_tax_number', minWidth: 20 },
      {
        minWidth: 10,
        Cell: ({ original: row }) => (
          <span>
            <Tooltip placement="top" title="check bank details">
              <Button
                type="primary"
                ghost={true}
                size="small"
                shape="circle"
                icon="edit"
                onClick={() => console.log(row)}
              />
            </Tooltip>
          </span>
        )
      }
    ];
    return (
      <div>
        <p>EmployeesGrid</p>
        <ReactTable
          data={spEmployees}
          columns={columns}
          //filterable
          // defaultPageSize={50}
          // showPaginationTop={false}
          // showPaginationBottom={true}
          // manual
          defaultSorted={[
            {
              id: 'number',
              desc: true
            }
          ]}
        />
      </div>
    );
  }
}

export default EmployeeGrid;

/*
Bank Accounts


<select class="form-control form-control-sm grouped_select optional" name="employee[bank_account_attributes][bank_id]"
  id="employee_bank_account_attributes_bank_id">
<option value=""></option>
<optgroup label="Most Common">
<option value="1462381520">ABSA Bank</option>
<option selected="selected" value="464954524">Capitec Bank</option>
<option value="1809393886">First National Bank</option>
<option value="189450181">Nedbank</option>
<option value="284678023">Standard Bank</option>
</optgroup>
<optgroup label="Other">
<option value="1823577098">20twenty</option>
<option value="2081327577">African Bank</option>
<option value="2081327576">Albaraka</option>
<option value="560121584">Bank of Transkei</option>
<option value="1449522790">Bank of Windhoek</option>
<option value="2081327518">Bidvest Bank</option>
<option value="1208050630">Boland Bank PKS</option>
<option value="1057379156">Cape of Good Hope Bank</option>
<option value="638517993">Citibank South Africa</option>
<option value="1359491711">Commercial Bank of Namibia</option>
<option value="1102524399">Fidelity Bank</option>
<option value="917512057">Future Bank Corporation</option>
<option value="946575179">Grobank</option>
<option value="1651121208">HBZ Bank</option>
<option value="1229410299">HSBC</option>
<option value="359476398">Investec Bank</option>
<option value="2081327574">Ithala</option>
<option value="207912213">Mercantile Bank</option>
<option value="2070105475">Natal Building Society</option>
<option value="1347296834">Old Mutual</option>
<option value="1695012897">People's Bank</option>
<option value="302049463">Permanent Bank</option>
<option value="1044414317">Pick 'n Pay Go Banking</option>
<option value="2081327517">Postbank</option>
<option value="659107544">Rand Merchant Bank</option>
<option value="185186574">Saambou Bank</option>
<option value="2081327590">SASFIN Bank</option>
<option value="2081327592">Tyme Digital Bank</option>
<option value="2081327519">UBank (formerly Teba Bank)</option>
<option value="2081327516">Unibank</option>
<option value="2081327575">VBS Mutual Bank</option>
</optgroup></select>

Account Types

<select class="form-control form-control-sm select optional" name="employee[bank_account_attributes][account_type]" id="employee_bank_account_attributes_account_type"><option value=""></option>
<option value="1">Current (Cheque)</option>
<option selected="selected" value="2">Savings</option>
<option value="3">Transmission</option>
<option value="4">Bond</option>
<option value="6">Subscription Share</option></select>

holder rel
<select class="form-control form-control-sm select optional" name="employee[bank_account_attributes][holder_relationship]" id="employee_bank_account_attributes_holder_relationship"><option value=""></option>
<option selected="selected" value="1">Own</option>
<option value="2">Joint</option>
<option value="3">Third Party</option></select>

 */
