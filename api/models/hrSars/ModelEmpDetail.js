const Promise = require('bluebird');
const db = require('../../services/postgres/db');

const ModelEmpCode = require('./ModelEmpCode');

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

exports.createFromEmp501Import = (empMaster, ajEmployees) =>
  Promise.map(ajEmployees, jEmp =>
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
    })
  );
