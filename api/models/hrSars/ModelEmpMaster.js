const db = require('../../services/postgres/db');

const sqlList = `
SELECT id, description, tax_year, tax_month, cubit_company_code, status_id, 
       date_from, date_to, test_live, detail_count, is_import, period, 
       when_create, emp_header, emp_trailer
  FROM sars.emp_master
`;

const sqlCreate = `
INSERT INTO sars.emp_master(
            description, tax_year, tax_month, cubit_company_code, status_id, 
            date_from, date_to, test_live, detail_count, is_import, period, 
            when_create, emp_header, emp_trailer)
    VALUES ($[description], $[tax_year], $[tax_month], $[cubit_company_code], $[status_id], 
            $[date_from], $[date_to], $[test_live], $[detail_count], $[is_import], $[period], 
            $[when_create], $[emp_header], $[emp_trailer])
   RETURNING *
`;

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;
const sqlRemove = `
DELETE FROM sars.emp_master WHERE id = $[id]
RETURNING id
`;

exports.list = () => db.any(sqlList);

exports.create = data => db.one(sqlCreate, { ...data });

exports.remove = id => db.one(sqlRemove, { id });

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));

exports.createFromEmp501Import = (jHeader, jTrailer) =>
  db.one(sqlCreate, {
    description: jHeader[2010] + ' ' + jHeader[2015] + ' ' + jHeader[2031],
    tax_year: jHeader[2030],
    tax_month: jHeader[2031].substring(4, 6),
    cubit_company_code: 'import',
    status_id: null,
    date_from: null,
    date_to: null,
    test_live: jHeader[2015],
    detail_count: jTrailer[6010],
    is_import: true,
    period: jHeader[2031],
    when_create: new Date(),
    emp_header: JSON.stringify(jHeader),
    emp_trailer: JSON.stringify(jTrailer)
  });
