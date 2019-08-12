const db = require('../../services/postgres/db');

const sqlList = `
SELECT id, cubit_id, empid, contra, edate, ref, cubit_description, description, 
       debit, credit, dbalance, cbalance, sdate, div, tax_year, tax_month, 
       cubit_company_code, cacc_id, employee_id, employee_code, topacc, 
       accnum, accname, ledger_id
  FROM hr.emp_ledger;
`;

const sqlListEmpsInDateRange = `
SELECT DISTINCT employee_code, employee_id
FROM hr.emp_ledger
WHERE edate BETWEEN $[dateFrom] AND $[dateTo]
AND cubit_company_code = ANY($[includeCccs])
ORDER BY employee_code
`;

const sqlGetEmpInDateRange = `
SELECT *
FROM hr.emp_ledger
WHERE edate BETWEEN $[dateFrom] AND $[dateTo]
AND employee_code = $[employeeCode]
ORDER BY edate, cubit_id
`;
exports.list = () => db.many(sqlList);

exports.listEmpsInDateRange = (includeCccs, dateFrom, dateTo) =>
  db.many(sqlListEmpsInDateRange, { includeCccs, dateFrom, dateTo });

exports.getEmpInDateRange = (dateFrom, dateTo, employeeCode) =>
  db.many(sqlGetEmpInDateRange, { dateFrom, dateTo, employeeCode });
