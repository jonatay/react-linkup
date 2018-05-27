const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM hr.employee
`;

const sqlGetByEmployeeCode = `
SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
`;

exports.list = () => db.any(sqlList);

exports.getByEmployeeCode = employeeCode =>
  db
    .any(sqlGetByEmployeeCode, { employeeCode })
    .then(data => (data.length === 1 ? data[0] : null));
