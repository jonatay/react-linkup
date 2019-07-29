const Promise = require('bluebird');
const db = require('../../services/postgres/db');
const moment = require('moment');
const _ = require('lodash');

const sqlList = `
SELECT ee.id, ee.emp_master_id, ee.period, ee.employee_code, ee.periods_worked, ee.emp_employee_data, 
       ee.cubit_company_code, ee.date_from, ee.date_to, ee.sic7_code, ee.bank_account_type, 
       ee.bank_account_number, ee.bank_branch_number, ee.bank_name, ee.bank_branch_name, 
       ee.bank_account_name, e.surname, e.first_names, 
       ee.tot_no_tax_income, ee.tot_tax_income, 
       ee.tot_ded_ra, ee.tot_ded_pen, ee.tot_ded_paye, ee.tot_ded_sdl, ee.tot_ded_uif, 
       ee.tot_veh_allow
  FROM sars.emp_employee ee
  JOIN hr.employee e ON ee.employee_code = e.employee_code
`;

const sqlGet = `
SELECT ee.id, ee.emp_master_id, ee.period, ee.employee_code, ee.periods_worked, ee.emp_employee_data, 
       ee.cubit_company_code, ee.date_from, ee.date_to, ee.sic7_code, ee.bank_account_type, 
       ee.bank_account_number, ee.bank_branch_number, ee.bank_name, ee.bank_branch_name, 
       ee.bank_account_name, e.surname, e.first_names,
       ee.tot_no_tax_income, ee.tot_tax_income, 
       ee.tot_ded_ra, ee.tot_ded_pen, ee.tot_ded_paye, ee.tot_ded_sdl, ee.tot_ded_uif,
       ee.tot_veh_allow
  FROM sars.emp_employee ee
  JOIN hr.employee e ON ee.employee_code = e.employee_code
  WHERE ee.id = $[id]
`;

const sqlCreate = `
INSERT INTO sars.emp_employee(
            emp_master_id, period, employee_code, periods_worked, emp_employee_data, 
            cubit_company_code, date_from, date_to, sic7_code, bank_account_type, 
            bank_account_number, bank_branch_number, bank_name, bank_branch_name, 
            bank_account_name,
            tot_no_tax_income, tot_tax_income, 
            tot_ded_ra, tot_ded_pen, tot_ded_paye, tot_ded_sdl, tot_ded_uif, tot_veh_allow)
    VALUES ($[emp_master_id], $[period], $[employee_code], $[periods_worked], $[emp_employee_data], 
            $[cubit_company_code], $[date_from], $[date_to], $[sic7_code], $[bank_account_type], 
            $[bank_account_number], $[bank_branch_number], $[bank_name], $[bank_branch_name], 
            $[bank_account_name],
            $[tot_no_tax_income], $[tot_tax_income], 
            $[tot_ded_ra], $[tot_ded_pen], $[tot_ded_paye], $[tot_ded_sdl], $[tot_ded_uif],
            $[tot_veh_allow]
            )
 RETURNING *
`;

const sqlRemoveByEmpMaster = `
DELETE FROM sars.emp_employee WHERE emp_master_id = $[id]
`;
const sqlGetByEmpMaster = `
SELECT * FROM sars.emp_employee WHERE emp_master_id = $[id] 
ORDER BY employee_code
`;

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;

exports.list = () => db.any(sqlList);

exports.get = id => db.one(sqlGet, { id });

exports.getByEmpMaster = id => db.any(sqlGetByEmpMaster, { id });

exports.create = data => db.one(sqlCreate, data);

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));

exports.createFromEmpDetailEmpMaster = ({
  empDetail: {
    period,
    employee_code,
    periods_worked,
    emp_employee_data,
    cubit_company_code,
    date_from,
    date_to,
    sic7_code,
    bank_account_type,
    bank_account_number,
    bank_branch_number,
    bank_name,
    bank_branch_name,
    bank_account_name,
    empCodes,
    tot_no_tax_income,
    tot_tax_income,
    tot_ded_ra,
    tot_ded_pen,
    tot_ded_paye,
    tot_ded_sdl,
    tot_ded_uif,
    tot_veh_allow
  },
  empMaster: { id: emp_master_id }
}) =>
  db
    .one(sqlCreate, {
      emp_master_id,
      period,
      employee_code,
      periods_worked,
      emp_employee_data,
      cubit_company_code,
      date_from,
      date_to,
      sic7_code,
      bank_account_type,
      bank_account_number,
      bank_branch_number,
      bank_name,
      bank_branch_name,
      bank_account_name,
      tot_no_tax_income,
      tot_tax_income,
      tot_ded_ra,
      tot_ded_pen,
      tot_ded_paye,
      tot_ded_sdl,
      tot_ded_uif,
      tot_veh_allow
    })
    .then(empDetail => this.get(empDetail.id)) //return with name
    .then(empDetail => ({ ...empDetail, empCodes })); //pass down empCodes

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
//76107094552014020000000000A090
//76107094552014020000000000A090
const getEmp501Line = ({
  params,
  employee,
  empDetail,
  cubitEmployee,
  sageAccount
}) => ({
  '3010': `${params.refPAYE}${params.taxYear}${
    params.taxMonth
  }${employee.employee_code.padStart(14, '0')}`,
  '3015': empDetail.tot_ded_paye > 0 ? 'IRP5' : 'IT3(a)',
  ...(empDetail.tot_ded_paye === 0 ? { '4150': '2' } : null),
  '3020': employee.nature_person,
  '3026': 'N', //empDetail.tot_eti > 0 ? 'Y' : 'N',
  '3025': params.taxYear,
  '3030': employee.surname,
  '3040': employee.first_names,
  '3050':
    employee.initials !== '??'
      ? employee.initials
      : employee.first_names
          .split(' ')
          .map(i => i[0])
          .join('')
          .toUpperCase(),
  '3060': employee.id_number,
  '3080': `${
    employee.id_number.substr(0, 2) - 0 > 10 ? '19' : '20'
  }${employee.id_number.substr(0, 6)}`,
  '3100': employee.tax_reference_number,
  '3263': params.empSIC7,
  '3136': '0349808872',
  '3138': cubitEmployee.telno,
  '3146': params.empAddrStreetNbr,
  '3147': params.empAddrStreetName,
  '3149': params.empAddrTown,
  '3150': params.empAddrPCode,
  '3151': params.empAddrCCode,
  '3160': employee.employee_code,
  '3170': params.dateFrom.split('-').join(''),
  '3180': params.dateTo.split('-').join(''),
  //'3190': moment(employee.hire_date).format('YYYYMMDD'), //.split('-').join(''), //'*ETI-Emp-Date*',
  '3200': parseInt(params.taxMonth) === 2 ? '12.0000' : '6.0000',
  '3210':
    empDetail.empCodes.filter(ec => ec.emp_code === 4142).length + '.0000', //(count SDL)
  '3213': params.empAddrStreetNbr,
  '3214': params.empAddrStreetName,
  '3216': params.empAddrTown,
  '3217': params.empAddrPCode,
  '3285': params.empAddrCCode,
  '3279': 'Y',
  '3283': params.tradingName,
  '3288': '2',
  '3249': 'PO_BOX',
  '3262': '673',
  '3253': params.empAddrTown,
  '3254': params.empAddrPCode,
  '3286': params.empAddrCCode,

  '3240': empDetail.bank_account_type,
  '3241': empDetail.bank_account_number,
  '3242': empDetail.bank_branch_number,
  '3243': empDetail.bank_name,
  // optional bank branch name '3244': 'VRYHEID                    417',
  '3245': empDetail.bank_account_name.replace(/,/, ''),
  '3246': '1',
  //emp codes summ
  ...empDetail.empCodes.reduce(
    (acc, empCode) => ({
      ...acc,
      [`${empCode.emp_code}`]: acc[`${empCode.emp_code}`]
        ? _.round(acc[`${empCode.emp_code}`] + empCode.emp_value)
        : _.round(empCode.emp_value)
    }),
    {}
  ),

  // '3602': _.round(empDetail.tot_no_tax_income),

  '3696': _.round(empDetail.tot_no_tax_income),
  '3699': empDetail.tot_tax_income,

  '4102': empDetail.tot_ded_paye,
  '4141': empDetail.tot_ded_uif,
  '4142': empDetail.tot_ded_sdl,
  '4149':
    empDetail.tot_ded_paye + empDetail.tot_ded_uif + empDetail.tot_ded_sdl,
  '4118': empDetail.tot_eti,
  '4497': _.round(empDetail.tot_ded_ra + empDetail.tot_ded_pen),
  // '4582':
  //   empDetail.tot_veh_allow > 0 ? _.round(empDetail.tot_veh_allow * 0.2) : null,
  '9999': null
});

/*
  // '3601': '41900',
  // '3605': '3400',
  // '3606': '0',
  // '3697': '41900',
  // '3698': '3400',
  // '3702': '0',
  // '4001': '2835',
  // '4102': '176.94',
  // '4141': '838.00',
  // '4142': '424.65',
  // '4149': '1439.59',
  // '4497': '2835'
 */

exports.newFromEmployeeEmpCodes = ({
  employee,
  cubitEmployee,
  sageAccount,
  empCodes,
  params
}) =>
  new Promise.resolve({
    period: params.period,
    employee_code: employee.employee_code,
    periods_worked: empCodes.filter(ec => ec.emp_code === 4142).length,
    cubit_company_code: params.cubit_company_code,
    date_from: params.dateFrom,
    date_to: params.dateTo,
    sic7_code: params.empSIC7,
    bank_account_type: sageAccount
      ? sageAccount.account_type
      : cubitEmployee.bankacctype === 'Savings'
      ? 2
      : cubitEmployee.bankacctype === 'Credit Card'
      ? 5
      : 1,
    bank_account_number: sageAccount
      ? sageAccount.account_number
      : cubitEmployee.bankaccno,
    bank_branch_number: sageAccount
      ? sageAccount.branch_code
      : cubitEmployee.bankcode,
    bank_name: sageAccount ? sageAccount.bank_name : cubitEmployee.bankname,
    bank_branch_name: null,
    bank_account_name: sageAccount
      ? sageAccount.acc_holders_name
      : `${cubitEmployee.enum} ${cubitEmployee.sname}, ${cubitEmployee.fnames}`,
    employee_id: employee.id,
    //tots
    tot_no_tax_income: empCodes
      .filter(ec => [3703].includes(ec.emp_code))
      .reduce((tot, ec) => _.round(tot + ec.emp_value, 2), 0),
    tot_tax_income: empCodes
      .filter(ec => [3601, 3605, 3606].includes(ec.emp_code)) // , 3605
      .reduce((tot, ec) => _.round(tot + ec.emp_value), 0),
    tot_ded_ra: empCodes
      .filter(ec => [4002, 4003].includes(ec.emp_code))
      .reduce((tot, ec) => _.round(tot + ec.emp_value, 2), 0),
    tot_ded_pen: empCodes
      .filter(ec => [4001].includes(ec.emp_code))
      .reduce((tot, ec) => _.round(tot + ec.emp_value, 2), 0),
    tot_ded_paye: empCodes
      .filter(ec => [4102].includes(ec.emp_code))
      .reduce((tot, ec) => _.round(tot + ec.emp_value, 2), 0),
    tot_ded_sdl: empCodes
      .filter(ec => [4142].includes(ec.emp_code))
      .reduce(
        (tot, ec) =>
          // console.log(_.round(tot + ec.emp_value, 2)) ||
          _.round(tot + ec.emp_value, 2),
        0
      ),
    tot_ded_uif: empCodes
      .filter(ec => [4141].includes(ec.emp_code))
      .reduce((tot, ec) => tot + _.round(ec.emp_value, 2), 0),
    tot_veh_allow: empCodes
      .filter(ec => [3703].includes(ec.emp_code))
      .reduce((tot, ec) => tot + _.round(ec.emp_value, 2), 0),
    //codes
    empCodes
  }).then(empDetail => ({
    ...empDetail,
    emp_employee_data: getEmp501Line({
      params,
      employee,
      empDetail,
      cubitEmployee,
      sageAccount
    })
  }));

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
    emp_employee_data: getEmp501Line({ empMaster, employee }),
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
    bank_account_number: sageAccount
      ? sageAccount.account_number
      : cubitEmployee.bankaccno,
    bank_branch_number: sageAccount
      ? sageAccount.branch_code
      : cubitEmployee.bankcode,
    bank_name: sageAccount ? sageAccount.bank_name : cubitEmployee.bankname,
    bank_branch_name: null,
    bank_account_name: sageAccount
      ? sageAccount.acc_holders_name
      : `${cubitEmployee.enum} ${cubitEmployee.sname}, ${cubitEmployee.fnames}`,
    employee_id: employee.id
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
