const db = require('../../services/postgres/db');

const sqlList = `
SELECT id, description, tax_year, tax_month, cubit_company_code, status_id, 
       date_from, date_to, test_live, detail_count, is_import, period, 
       when_create
  FROM sars.emp_master
`;

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;

exports.list = () => db.any(sqlList);

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));
