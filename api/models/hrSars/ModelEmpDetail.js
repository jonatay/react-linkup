const Promise = require('bluebird');
const db = require('../../services/postgres/db');

const sqlList = `
SELECT ee.id, ee.emp_master_id, ee.period, ee.employee_code, ee.periods_worked, ee.emp_employee_data, 
       ee.cubit_company_code, ee.date_from, ee.date_to, ee.sic7_code, ee.bank_account_type, 
       ee.bank_account_number, ee.bank_branch_number, ee.bank_name, ee.bank_branch_name, 
       ee.bank_account_name, e.surname, e.first_names
  FROM sars.emp_employee ee
  JOIN hr.employee e ON ee.employee_code = e.employee_code
`;

const sqlCreate = `
INSERT INTO sars.emp_employee(
            emp_master_id, period, employee_code, periods_worked, emp_employee_data, 
            cubit_company_code, date_from, date_to, sic7_code, bank_account_type, 
            bank_account_number, bank_branch_number, bank_name, bank_branch_name, 
            bank_account_name)
    VALUES ($[emp_master_id], $[period], $[employee_code], $[periods_worked], $[emp_employee_data], 
            $[cubit_company_code], $[date_from], $[date_to], $[sic7_code], $[bank_account_type], 
            $[bank_account_number], $[bank_branch_number], $[bank_name], $[bank_branch_name], 
            $[bank_account_name])
 RETURNING *
`;

const sqlRemoveByEmpMaster = `
DELETE FROM sars.emp_employee WHERE emp_master_id = $[id]
`;

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;

exports.list = () => db.any(sqlList);

exports.create = data => db.one(sqlCreate, data);

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));

exports.removeByEmpMaster = id => db.none(sqlRemoveByEmpMaster, { id });

exports.createFromEmp501Import = ({ empMaster, jEmp }) =>
  //Promise.map(ajEmployees, jEmp =>
  db.one(sqlCreate, {
    emp_master_id: empMaster.id,
    period: empMaster.period,
    employee_code: jEmp[3160],
    periods_worked: jEmp[3210],
    emp_employee_data: JSON.stringify(jEmp),
    cubit_company_code: null,
    date_from: jEmp[3170],
    date_to: jEmp[3180],
    sic7_code: jEmp[3263],
    bank_account_type: jEmp[3240],
    bank_account_number: jEmp[3241],
    bank_branch_number: jEmp[3242],
    bank_name: jEmp[3243],
    bank_branch_name: jEmp[3244],
    bank_account_name: jEmp[3245]
  });
//);
const getEmp501Line = emp => ({
  '3010': '76107094552014020000000000A090',
  '3015': 'IRP5',
  '3020': 'A',
  '3025': '2014',
  '3030': 'Madi',
  '3040': 'Jeanette',
  '3050': 'J',
  '3060': '7406051213082',
  '3080': '19740605',
  '3100': '1550428153',
  '3136': '27349808872',
  '3147': '220 Market Str',
  '3149': 'Vryheid',
  '3150': '3100',
  '3160': 'A090',
  '3170': '20130301',
  '3180': '20140228',
  '3200': '12.0000',
  '3210': '12.0000',
  '3214': 'Mark Street',
  '3216': 'Vryheid',
  '3217': '3100',
  '3240': '1',
  '3241': '0062032159065',
  '3242': '270524',
  '3243': 'FIRSTRAND BANK',
  '3244': 'VRYHEID                    417',
  '3245': 'JEANETTE MADI',
  '3246': '1',
  '3247': 'N',
  '3249': 'X',
  '3253': 'Vryheid',
  '3254': '3100',
  '3262': '673',
  '3263': '80100',
  '3279': 'X',
  '3601': '41900',
  '3605': '3400',
  '3606': '0',
  '3697': '41900',
  '3698': '3400',
  '3702': '0',
  '4001': '2835',
  '4102': '176.94',
  '4141': '838.00',
  '4142': '424.65',
  '4149': '1439.59',
  '4497': '2835'
});

exports.createFromEmpMasterEmployee = ({
  empMaster,
  employee,
  cubitEmployee,
  sageAccount
}) =>
  db.one(sqlCreate, {
    emp_master_id: empMaster.id,
    period: empMaster.period,
    employee_code: employee.employee_code,
    periods_worked: null,
    emp_employee_data: null,
    cubit_company_code: empMaster.cubit_company_code,
    date_from: empMaster.date_from,
    date_to: empMaster.date_to,
    sic7_code: empMaster.sic7,
    bank_account_type: sageAccount
      ? sageAccount.account_type
      : cubitEmployee.bankacctype === 'Savings'
        ? 2
        : cubitEmployee.bankacctype === 'Credit Card'
          ? 5
          : 1,
    bank_account_number: sageAccount ? sageAccount.account_number : cubitEmployee.bankaccno,
    bank_branch_number: null,
    bank_name: null,
    bank_branch_name: null,
    bank_account_name: null
  });

/*

Employee Bank Account Type
3240
N1
Employee bank account type.
 Mandatory
 The following bank account type options must be used:
0 = Not Paid by electronic bank transfer
1 = Cheque/Current Account
2 = Savings Account
3 = Transmission Account
4 = Bond Account
5 = Credit Card Account
6 = Subscription Share Account
7 = Foreign Bank Account

// sage_account - account_type

1 = Current / Checking
2 = Savings
3 = Transmission
4 = Bond

 */
