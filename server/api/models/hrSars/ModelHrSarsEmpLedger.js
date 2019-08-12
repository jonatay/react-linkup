const db = require('../../services/postgres/db');

const sqlEmpsInCoyPeriod = `
SELECT DISTINCT el.employee_id,el.employee_code
  FROM hr.emp_ledger el
  WHERE
     tax_year = $[taxYear] AND
     el.cubit_company_code = ANY ($[cubitCompanies]) AND 
   ( ($[taxMonth] = 2) OR (el.tax_month BETWEEN 3 AND 8) )
  ORDER BY el.employee_code
`;

const sqlList = `
SELECT e.*, sa.*, el.*
  FROM hr.emp_ledger el
   LEFT JOIN hr.employee e ON e.id = el.employee_id
   LEFT JOIN sage_pay.sage_accounts sa ON sa.employee_id = el.employee_id
  WHERE 
     tax_year = $[taxYear] AND
     el.cubit_company_code = ANY ($[cubitCompanies]) AND 
   ( ($[taxMonth] = 2) OR (el.tax_month BETWEEN 3 AND 8) )
`;

exports.list = ({ cubitCompanies, period }) =>
  db.many(sqlList, {
    cubitCompanies,
    taxYear: period.split('-')[0] - 0,
    taxMonth: period.split('-')[1] - 0
  });

exports.empsInCoyPeriod = ({ cubitCompanies, period }) =>
  db.many(sqlEmpsInCoyPeriod, {
    cubitCompanies,
    taxYear: period.split('-')[0] - 0,
    taxMonth: period.split('-')[1] - 0
  });
