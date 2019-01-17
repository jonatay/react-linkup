const db = require('../../services/postgres/db');

const sqlList = `
SELECT id, emp_master_id, period, employee_code, periods_worked, import_data, 
       cubit_company_code
  FROM sars.emp_employee
`;

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;

exports.list = () => db.any(sqlList);

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));
