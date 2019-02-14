const Promise = require('bluebird');
const db = require('../../services/postgres/db');
const { dump } = require('dumper.js');

const sqlList = `
SELECT id, emp_code, emp_value, tax_month, employee_code, sum_credit, 
       sum_debit, emp_master_id, emp_employee_id, period, cubit_company_code, 
       description, accname
  FROM sars.emp_code
`;

const sqlRemoveByEmpMaster = `
DELETE FROM sars.emp_employee WHERE emp_master_id = $[id]
`;

const sqlCreate = `
INSERT INTO sars.emp_code(
            emp_code, emp_value, tax_month, employee_code, sum_credit, 
            sum_debit, emp_master_id, emp_employee_id, period, cubit_company_code, 
            description, accname)
    VALUES ($[emp_code], $[emp_value], $[tax_month], $[employee_code], $[sum_credit], 
            $[sum_debit], $[emp_master_id], $[emp_employee_id], $[period], $[cubit_company_code], 
            $[description], $[accname])
  RETURNING *
`;

const sdlSurnameExceptions = {
  TE169: 'Christoffel Erasmus',
  TE167: 'Thuso Lewesa Khanye',
  RE133: 'Prince Ganizeni Ngwenya',
  RE192: 'Thulani Mithmkuulu',
  A112: 'Adri Vermaak',
  A090: 'Jeanette Madi',
  A099: 'Johannes Christoffel Erasmus',
  A129: 'Themba Victor Dubazana'
};

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;

exports.list = () => db.any(sqlList);

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));

exports.createFromEmpCodeEmpDetail = ({
  empCode: {
    emp_code,
    emp_value,
    tax_month,
    employee_code,
    sum_credit,
    sum_debit,
    period,
    cubit_company_code,
    description,
    accname
  },
  empDetail: { emp_master_id, id: emp_employee_id }
}) =>
  db.one(sqlCreate, {
    emp_code,
    emp_value,
    tax_month,
    employee_code,
    sum_credit,
    sum_debit,
    emp_master_id,
    emp_employee_id,
    period,
    cubit_company_code,
    description,
    accname
  });

exports.removeByEmpMaster = id => db.none(sqlRemoveByEmpMaster, { id });

exports.createFromEmp501Import = (empDetail, jEmp) =>
  Promise.map(Object.keys(jEmp).filter(key => key > 3600), key =>
    db.one(sqlCreate, {
      emp_code: key,
      emp_value: jEmp[key],
      tax_month: null,
      employee_code: null,
      sum_credit: null,
      sum_debit: null,
      emp_master_id: empDetail.emp_master_id,
      emp_employee_id: empDetail.id,
      period: empDetail.period,
      cubit_company_code: 'import'
    })
  );

const getEmpCode = ({ empLedger, employee }) => {
  if (
    empLedger.accname.includes('overtime') ||
    empLedger.cubit_description === 'Gross Salary'
  ) {
    return employee.nature_person === 'A' ? 3601 : 3615;
  } else if (
    empLedger.accname === 'Salaries - Bonus' ||
    empLedger.accname === 'Salaries Termination Leave Pay'
  ) {
    return 3605;
  } else if (empLedger.accname === 'Salaries Commission') {
    return 3606;
  } else if (empLedger.accname === 'Vehicle Hire') {
    return 3702;
  } else if (empLedger.cubit_description === 'Pension Contribution') {
    return 4001;
  } else if (empLedger.cubit_description === 'PAYE') {
    return 4102;
  } else if (empLedger.cubit_description === 'UIF') {
    return 4141;
  }

  // switch (empLedger.cubit_description) {
  //   case 'Gross Salary':
  //
  //   default:
  //     return null;
  // }
};

// exports.createFromEmpMasterEmpLedgers = ({
//   empMaster,
//   empDetail,
//   empLedgers
// }) =>
//   Promise.map(empLedgers, empLedger => {
//     let empCode = getEmpCode(empLedger);
//     if (empCode) {
//       return;
//     }
//   });

exports.newFromEmpLedgers = ({ empLedgers, employee, sdlLedgers }) =>
  Promise.reduce(
    empLedgers,
    (acc, empLedger) => {
      let empCode = getEmpCode({ empLedger, employee });
      return empCode
        ? [
            ...acc,
            {
              emp_code: getEmpCode({ empLedger, employee }),
              emp_value: empLedger.credit + empLedger.debit,
              tax_month: empLedger.tax_month,
              tax_year: empLedger.tax_year,
              employee_code: empLedger.employee_code,
              sum_credit: empLedger.credit,
              sum_debit: empLedger.debit,
              cubit_company_code: empLedger.cubit_company_code,
              description: empLedger.cubit_description,
              accname: empLedger.accname
            }
          ]
        : acc;
    },
    []
  ).then(empCodes =>
    Promise.filter(
      sdlLedgers,
      sdlLed =>
        (sdlSurnameExceptions[employee.employee_code] &&
          sdlLed.cubit_description ===
            `SDL,  ${sdlSurnameExceptions[employee.employee_code]}.`) ||
        sdlLed.cubit_description ===
          `SDL,  ${employee.first_names} ${employee.surname}.`
    ).then(sdlLedgers => [
      ...empCodes,
      ...sdlLedgers.map(sdlLed => ({
        emp_code: 4142,
        emp_value: sdlLed.credit + sdlLed.debit,
        tax_month: sdlLed.tax_month,
        tax_year: sdlLed.tax_year,
        employee_code: sdlLed.employee_code,
        sum_credit: sdlLed.credit,
        sum_debit: sdlLed.debit,
        cubit_company_code: sdlLed.cubit_company_code,
        description: sdlLed.cubit_description,
        accname: sdlLed.accname
      }))
    ])
  );
// SDL,  Santie Muller
