const Promise = require('bluebird');
const moment = require('moment');
const db = require('../../services/postgres/db');
const { dump } = require('dumper.js');
const _ = require('lodash');
const sqlList = `
SELECT id, emp_code, emp_value, tax_month, employee_code, sum_credit, 
       sum_debit, emp_master_id, emp_employee_id, period, cubit_company_code, 
       description, accname
  FROM sars.emp_code
`;

const sqlRemoveByEmpMaster = `
DELETE FROM sars.emp_code WHERE emp_master_id = $[id]
`;

const sqlCreate = `
INSERT INTO sars.emp_code(
            emp_code, emp_value, tax_month, employee_code, sum_credit, 
            sum_debit, emp_master_id, emp_employee_id, period, cubit_company_code, 
            description, accname)
    VALUES ($[emp_code], $[emp_value], $[tax_month], $[employee_code], $[sum_credit], 
            $[sum_debit], $[emp_master_id], $[emp_employee_id], $[period], $[cubit_company_code], 
            $[description], $[accname])
  RETURNING *
`;

const glSurnameExceptions = {
  TE169: 'Christoffel Erasmus',
  TE167: 'Thuso Lewesa Khanye',
  RE133: 'Prince Ganizeni Ngwenya',
  RE192: 'Thulani Mithmkuulu',
  A112: 'Adri Vermaak',
  SE284: 'Adri De Beer',
  A090: 'Jeanette Madi',
  A099: 'Johannes Christoffel Erasmus',
  A129: 'Themba Victor Dubazana'
};

const empCodesRound = [4003];

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;

exports.list = () => db.any(sqlList);

// exports.getByEmployeeCode = employeeCode =>
//   db
//     .any(sqlGetByEmployeeCode, { employeeCode })
//     .then(data => (data.length === 1 ? data[0] : null));

exports.createFromEmpCodeEmpDetail = ({
  empCode: {
    emp_code,
    emp_value,
    tax_month,
    employee_code,
    sum_credit,
    sum_debit,
    period,
    cubit_company_code,
    description,
    accname
  },
  empDetail: { emp_master_id, id: emp_employee_id }
}) =>
  db.one(sqlCreate, {
    emp_code,
    emp_value,
    tax_month,
    employee_code,
    sum_credit,
    sum_debit,
    emp_master_id,
    emp_employee_id,
    period,
    cubit_company_code,
    description,
    accname
  });

exports.removeByEmpMaster = id => db.none(sqlRemoveByEmpMaster, { id });

exports.createFromEmp501Import = (empDetail, jEmp) =>
  Promise.map(Object.keys(jEmp).filter(key => key > 3600), key =>
    db.one(sqlCreate, {
      emp_code: key,
      emp_value: jEmp[key],
      tax_month: null,
      employee_code: null,
      sum_credit: null,
      sum_debit: null,
      emp_master_id: empDetail.emp_master_id,
      emp_employee_id: empDetail.id,
      period: empDetail.period,
      cubit_company_code: 'import'
    })
  );

const getEmpCode = ({ empLedger, employee }) => {
  if (
    ['Salaries Overtime', 'Standby Allowance', 'Telephone and Fax'].includes(
      empLedger.accname
    ) ||
    empLedger.cubit_description === 'Gross Salary' ||
    (empLedger.accname === 'Salaries Controllers' &&
      empLedger.cubit_description === 'Allowance' &&
      empLedger.credit >= 60 &&
      empLedger.credit <= 80)
  ) {
    return employee.nature_person === 'C' &&
      parseInt(empLedger.tax_year) <= 2018
      ? 3615
      : 3601;
  } else if (
    empLedger.accname === 'Salaries - Bonus' ||
    empLedger.accname === 'Salaries Termination Leave Pay'
  ) {
    return employee.nature_person === 'C' &&
      parseInt(empLedger.tax_year) <= 2018
      ? 3615
      : 3605; //return employee.nature_person === 'A' ? 3605 : 3615;
  } else if (
    ['Salaries Commission', 'Salaries - Commission'].includes(empLedger.accname)
  ) {
    return 3606;
  } else if (
    [
      'Salaries Controllers',
      'Cellular Phones',
      'Subsistence and Accommodation',
      'Incentive Commission'
    ].includes(empLedger.accname)
  ) {
    return 3605;
  } else if (
    ['Vehicle Allowance', 'Vehicle Hire'].includes(empLedger.accname)
  ) {
    return 3703;
  } else if (empLedger.cubit_description === 'Pension Contribution') {
    return 4001;
  } else if (
    empLedger.cubit_description === 'Retirement Annuity Contribution'
  ) {
    return 4003;
  } else if (empLedger.cubit_description === 'PAYE') {
    return 4102;
  } else if (empLedger.cubit_description === 'UIF') {
    return 4141;
  } else {
    return null;
  }
};

/*
3026  A1      Indicates that the certificate contains an ETI value.
3190  N8      Initial date the employee was employed by the employer
4118  N11.2   The sum of the calculated ETI
7006  AN2     This indicates the month of the year
7005  N1      This indicates the 12 month ETI cycle for which the employee qualifies for ETI.
              If the employee does not qualify for ETI for the specified month, this value must be 0.
                0 – if the employee does not qualify for ETI for the specified
                1 – if the employee qualifies for ETI for the specified month
                      and the specified month is in the first 12 month period
                2 – if the employee qualifies for ETI for the specified month
                      and the specified month is in the second 12 month period
              Only applicable from 2018 year of assessment
              If the certificate type is ITREG this field must not be completed
7007  N3.4    The actual number of hours for which the employee was employed
                and paid remuneration in the specified Month (code 7006)
                Note: Only report to a maximum of 160 hours
7002  N11.2   This is the actual remuneration (as defined in the Fourth Schedule and referred to by the ETI Act)
                paid to the employee for the specified Month (code 7006).
7003  N11.2   This indicates the minimum wage as specified by a wage regulating
7008  N11.2   The actual wage that is paid for the specified month.
7004  N11.2   This indicates the amount of the employment tax incentive available to the employer for the employee.
 */

const includesEtiEmpCodesFromSalSumm = (salSumms, employee, empCodes) => {
  if (salSumms.length === 0) {
    throw new Error(
      `salSumms has no rows for ${employee.employee_code} ${
        employee.surname
      }, ${employee.first_names}`
    );
  }
  let aETICodes = [];
  let etiTot = 0;
  for (let i = 0; i < salSumms.length; i++) {
    const salSumm = salSumms[i];
    if (!salSumm) {
      throw new Error(
        `no sal Sum for ${employee.employee_code} ${i}/${salSumms.length}`
      );
    }
    const aHireD = salSumm.hired.split('-').map(a => parseInt(a));
    const hireDate =
      aHireD.length === 3
        ? moment([
            aHireD[0] <= moment().year() - 2000
              ? 2000 + aHireD[0]
              : aHireD[0] + 1900,
            aHireD[1] - 1,
            aHireD[2]
          ])
        : moment(parseInt(salSumm.hired) * 86400000 - 2209132800000);
    const salDate = moment([salSumm.p_yr, salSumm.p_mth - 1]).endOf('month');
    const mthsEmpl = salDate.diff(hireDate, 'months') + 1;
    const perEmpl = parseInt(mthsEmpl / 12) + 1;
    const taxYear = salSumm.p_mth <= 2 ? salSumm.p_yr : salSumm.p_yr + 1;
    // console.log(
    //   ` ${salSumm.emp_code} ${salSumm.name} ${salSumm.eti} ${
    //     salSumm.p_mth
    //   } ${mthsEmpl} ${perEmpl} `
    // );
    etiTot += salSumm.eti;
    //7006  AN2     This indicates the month of the year
    //aETICodes[`7006-${('00' + salSumm.p_mth).slice(-2)}`] = {
    aETICodes.push({
      emp_code: 7006,
      emp_value: salSumm.p_mth,
      tax_month: salSumm.p_mth,
      tax_year: taxYear,
      employee_code: salSumm.emp_code,
      sum_credit: null,
      sum_debit: null,
      cubit_company_code: employee.cubit_company_code,
      description: `month of the year from ss ${salSumm.p_mth}`,
      accname: 'sals spreadsheet'
    });
    //7005  N1      This indicates the 12 month ETI cycle for which the employee qualifies for ETI.
    // aETICodes[`7005-${('00' + salSumm.p_mth).slice(-2)}`] = {
    aETICodes.push({
      emp_code: 7005,
      emp_value: perEmpl,
      tax_month: salSumm.p_mth,
      tax_year: taxYear,
      employee_code: salSumm.emp_code,
      sum_credit: null,
      sum_debit: null,
      cubit_company_code: employee.cubit_company_code,
      description: `12 month ETI cycle from ss ${salSumm.p_mth}`,
      accname: 'sals spreadsheet'
    });
    //7007  N3.4    The actual number of hours for which the employee was employed
    // aETICodes[`7007-${('00' + salSumm.p_mth).slice(-2)}`] = {
    aETICodes.push({
      emp_code: 7007,
      emp_value: salSumm.hrs_worked,
      tax_month: salSumm.p_mth,
      tax_year: taxYear,
      employee_code: salSumm.emp_code,
      sum_credit: null,
      sum_debit: null,
      cubit_company_code: employee.cubit_company_code,
      description: `hours from ss ${salSumm.p_mth}`,
      accname: 'sals spreadsheet'
    });
    //7002  N11.2   This is the actual remuneration (as defined in the Fourth Schedule and referred to by the ETI Act)
    // aETICodes[`7002-${('00' + salSumm.p_mth).slice(-2)}`] = {
    aETICodes.push({
      emp_code: 7002,
      emp_value: salSumm.taxeable_income,
      tax_month: salSumm.p_mth,
      tax_year: taxYear,
      employee_code: salSumm.emp_code,
      sum_credit: salSumm.eti,
      sum_debit: 0,
      cubit_company_code: employee.cubit_company_code,
      description: `actual remuneration from ss ${salSumm.p_mth}`,
      accname: 'sals spreadsheet'
    });
    // 7003  N11.2   This indicates the minimum wage as specified by a wage regulating
    // aETICodes[`7003-${('00' + salSumm.p_mth).slice(-2)}`] = {
    aETICodes.push({
      emp_code: 7003,
      emp_value: salSumm.eti,
      tax_month: salSumm.p_mth,
      tax_year: taxYear,
      employee_code: salSumm.emp_code,
      sum_credit: salSumm.eti,
      sum_debit: 0,
      cubit_company_code: employee.cubit_company_code,
      description: `minimum wage from ss ${salSumm.p_mth}`,
      accname: 'sals spreadsheet'
    });
    // 7008  N11.2   The actual wage that is paid for the specified month.
    // aETICodes[`7008-${('00' + salSumm.p_mth).slice(-2)}`] = {
    aETICodes.push({
      emp_code: 7008,
      emp_value: salSumm.nett,
      tax_month: salSumm.p_mth,
      tax_year: taxYear,
      employee_code: salSumm.emp_code,
      sum_credit: salSumm.eti,
      sum_debit: 0,
      cubit_company_code: employee.cubit_company_code,
      description: `actual wage from ss ${salSumm.p_mth}`,
      accname: 'sals spreadsheet'
    });
    // 7004  N11.2   This indicates the amount of the employment tax incentive available to the employer for the employee.
    // aETICodes[`7004-${('00' + salSumm.p_mth).slice(-2)}`] = {
    aETICodes.push({
      emp_code: 7004,
      emp_value: salSumm.eti,
      tax_month: salSumm.p_mth,
      tax_year: taxYear,
      employee_code: salSumm.emp_code,
      sum_credit: salSumm.eti,
      sum_debit: 0,
      cubit_company_code: employee.cubit_company_code,
      description: `eti from ss ${salSumm.p_mth}`,
      accname: 'sals spreadsheet'
    });
  }
  return etiTot > 0 ? [...empCodes, ...aETICodes] : empCodes;
};
// salSumms.map(salSumm => ({
//   emp_code: getEmpCode({ empLedger, employee }),
//   emp_value: empLedger.credit + empLedger.debit,
//   tax_month: empLedger.tax_month,
//   tax_year: empLedger.tax_year,
//   employee_code: empLedger.employee_code,
//   sum_credit: empLedger.credit,
//   sum_debit: empLedger.debit,
//   cubit_company_code: empLedger.cubit_company_code,
//   description: empLedger.cubit_description,
//   accname: empLedger.accname
// }));

exports.newFromEmpLedgers = ({ empLedgers, employee, gLedgers, salSumms }) =>
  Promise.reduce(
    empLedgers,
    //REDUCE through empLedgers - getting relevant emp code from this.getEmpCode
    //       Ignore empLedgers without code
    (acc, empLedger) => {
      let empCode = getEmpCode({ empLedger, employee });
      return empCode
        ? [
            ...acc,
            {
              emp_code: empCode, //getEmpCode({ empLedger, employee }),
              emp_value: empCodesRound.includes(empCode)
                ? _.round(empLedger.credit + empLedger.debit)
                : _.round(empLedger.credit + empLedger.debit),
              tax_month: empLedger.tax_month,
              tax_year: empLedger.tax_year,
              employee_code: empLedger.employee_code,
              sum_credit: empLedger.credit,
              sum_debit: empLedger.debit,
              cubit_company_code: empLedger.cubit_company_code,
              description: empLedger.cubit_description,
              accname: empLedger.accname
            }
          ]
        : acc;
    },
    []
  )
    // .then(
    //   //then add in eti recs from salSumms
    //   empCodes => includesEtiEmpCodesFromSalSumm(salSumms, employee, empCodes)
    // )
    .then(
      //then add in sdl recs from gLedgers
      empCodes =>
        Promise.filter(
          gLedgers,
          gLed =>
            (glSurnameExceptions[employee.employee_code] &&
              gLed.cubit_description ===
                `SDL,  ${glSurnameExceptions[employee.employee_code]}.`) ||
            gLed.cubit_description ===
              `SDL,  ${employee.first_names} ${employee.surname}.` ||
            (glSurnameExceptions[employee.employee_code] &&
              gLed.cubit_description ===
                `Company UIF Contribution,  ${
                  glSurnameExceptions[employee.employee_code]
                }.`) ||
            gLed.cubit_description ===
              `Company UIF Contribution,  ${employee.first_names} ${
                employee.surname
              }.`
        ).then(gLedgers => [
          ...empCodes,
          ...gLedgers.map(gLed => ({
            emp_code: gLed.accname === 'SDL Payable' ? 4142 : 4141,
            emp_value: _.round(gLed.credit + gLed.debit, 2),
            tax_month: gLed.tax_month,
            tax_year: gLed.tax_year,
            employee_code: gLed.employee_code,
            sum_credit: _.round(gLed.credit, 2),
            sum_debit: _.round(gLed.debit, 2),
            cubit_company_code: gLed.cubit_company_code,
            description: gLed.cubit_description,
            accname: gLed.accname
          }))
        ])
    );
// .then((
//   empCodes //remove dupes by just considering last one, theoretically...
// doesn't work - for now manuall ignore from luc-gl
// ) =>
//   empCodes.reduce((acc, ec) => {
//     let iEc = acc.findIndex(
//       empCode =>
//         ec.emp_code === empCode.emp_code &&
//         ec.tax_month === empCode.tax_month
//     );
//     if (iEc >= 0) {
//       return [...acc.slice(0, iEc), ec, ...acc.slice(iEc + 1)];
//     } else {
//       return [...acc, ec];
//     }
//   }, [])
// );
// SDL,  Santie Muller
// "Company UIF Contribution,  Shane Douglas van Straaten."
