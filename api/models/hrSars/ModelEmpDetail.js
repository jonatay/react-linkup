const db = require('../../services/postgres/db');

const sqlList = `
SELECT ee.id, ee.emp_master_id, ee.period, ee.employee_code, ee.periods_worked, ee.import_data, 
       ee.cubit_company_code, e.surname, e.first_names
  FROM sars.emp_employee ee
  JOIN hr.employee e ON ee.employee_code = e.employee_code
`;

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;

exports.list = () => db.any(sqlList);

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));
