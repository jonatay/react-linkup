const Promise = require('bluebird');
const db = require('../../services/postgres/db');

sqlListByEmpCodeDate = `
  SELECT id, emp_code, name, id_number, hired, bruto, bonus_mth, mibfa, 
         age, taxeable_income, tax_inc_annual, paye, uif, deductions, 
         pension, nett, hrs_worked, eti, p_yr, p_mth, source
    FROM hr.sal_summ
    WHERE UPPER(emp_code) = $[empCode] AND make_date(p_yr,p_mth,15) BETWEEN $[dateFrom] AND $[dateTo]
    ORDER BY p_yr,p_mth

`;

exports.listByEmpCodeDate = (empCode, dateFrom, dateTo) =>
  db.any(sqlListByEmpCodeDate, { empCode, dateFrom, dateTo });
