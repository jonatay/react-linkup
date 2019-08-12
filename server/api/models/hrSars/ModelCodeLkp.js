const db = require('../../services/postgres/db');

const sqlList = `
SELECT id, emp_code, description, topacc, accnum, name, is_required, 
       length, credit_debit
  FROM sars.code_master;
`;

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;

exports.list = () => db.any(sqlList);

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));
