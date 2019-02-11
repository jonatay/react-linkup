const Promise = require('bluebird');
const db = require('../../services/postgres/db');

const sqlList = `
SELECT id, emp_code, emp_value, tax_month, employee_code, sum_credit, 
       sum_debit, emp_master_id, emp_employee_id, period, cubit_company_code
  FROM sars.emp_code
`;

const sqlRemoveByEmpMaster = `
DELETE FROM sars.emp_employee WHERE emp_master_id = $[id]
`;

const sqlCreate = `
INSERT INTO sars.emp_code(
            emp_code, emp_value, tax_month, employee_code, sum_credit, 
            sum_debit, emp_master_id, emp_employee_id, period, cubit_company_code)
    VALUES ($[emp_code], $[emp_value], $[tax_month], $[employee_code], $[sum_credit], 
            $[sum_debit], $[emp_master_id], $[emp_employee_id], $[period], $[cubit_company_code])
  RETURNING *
`;

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;

exports.list = () => db.any(sqlList);

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));

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

 getEmpCode = (empLedger) => {
       switch (empLedger.cubit_description) {
             case 'Gross Salary':
                   return 1234;
             default:
                   return null;
       }
 }

exports.createFromEmpMasterEmpLedgers = ({
  empMaster,
  empDetail,
  empLedgers
}) =>
  Promise.map(empLedgers, empLedger => {
        let empCode = getEmpCode(empLedger);
        if (empCode) {
              return
        }
  });
