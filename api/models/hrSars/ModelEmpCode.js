const db = require('../../services/postgres/db');

const sqlList = `
SELECT id, emp_code, emp_value, tax_month, employee_code, sum_credit, 
       sum_debit, emp_master_id, emp_employee_id, period, cubit_company_code
  FROM sars.emp_code
`;

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;

exports.list = () => db.any(sqlList);

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));
