const db = require('../../services/postgres/db');

const coyCodes = ['aaab', 'aaac', 'aaad'];

const sqlList = `
SELECT * from hr.sp_rpt_emp_month_summary($[company_code], $[tax_year], $[tax_month]) ;
`;
//WHERE employee_id <> 574

exports.list = (tax_year, tax_month) =>
  Promise.all(
    coyCodes.map(company_code =>
      db.any(sqlList, { company_code, tax_year, tax_month })
    )
  ).then(data => data.reduce((ret, iData) => ret.concat(iData), []));
