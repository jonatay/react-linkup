const db = require('../../services/postgres/db');

const sqlList = `
SELECT id, description, tax_year, tax_month, cubit_company_code, status_id, 
       date_from, date_to, test_live, detail_count, is_import, period, 
       when_create, emp_header, emp_trailer,include_cccs, sic7
  FROM sars.emp_master
`;

const sqlCreate = `
INSERT INTO sars.emp_master(
            description, tax_year, tax_month, cubit_company_code, status_id, 
            date_from, date_to, test_live, detail_count, is_import, period, 
            when_create, emp_header, emp_trailer, include_cccs, sic7)
    VALUES ($[description], $[tax_year], $[tax_month], $[cubit_company_code], $[status_id], 
            $[date_from], $[date_to], $[test_live], $[detail_count], $[is_import], $[period], 
            $[when_create], $[emp_header], $[emp_trailer], $[include_cccs], $[sic7])
   RETURNING *
`;
const sqlGet = `
SELECT * FROM sars.emp_master WHERE  id = $[id]
`;

// const sqlGetByEmployeeCode = `
// SELECT * FROM hr.employee WHERE employee_code = $[employeeCode]
// `;
const sqlRemove = `
DELETE FROM sars.emp_master WHERE id = $[id]
RETURNING id
`;

exports.list = () => db.any(sqlList);

exports.get = id => db.one(sqlGet, { id });

exports.createFromEmpDetailsParams = ({
  params: {
    description,
    tradingName,
    taxYear,
    taxMonth,
    submitCcc,
    includeCccs,
    period,
    dateFrom,
    dateTo,
    testLive,
    refPAYE,
    refSDL,
    refUIF,
    contactFName,
    contactSName,
    contactPos,
    contactCNumber,
    contactEMail,
    payrollSWProv,
    payrollSWPkg,
    empSIC7,
    empTradeClas,
    diplomaticImmunity,
    empAddrStreetNbr,
    empAddrStreetName,
    empAddrTown,
    empAddrPCode,
    empAddrCCode
  },
  empDetails
}) =>
  db
    .one(sqlCreate, {
      description,
      tax_year: taxYear,
      tax_month: taxMonth,
      cubit_company_code: submitCcc,
      status_id: null,
      date_from: dateFrom,
      date_to: dateTo,
      test_live: testLive.toUpperCase(),
      detail_count: null,
      is_import: true,
      period,
      when_create: new Date(),
      emp_header: JSON.stringify({
        '2010': tradingName,
        '2015': testLive,
        '2020': refPAYE,
        '2022': refSDL,
        '2024': refUIF,
        '2025': contactFName,
        '2036': contactSName,
        '2038': contactPos,
        '2026': contactCNumber,
        '2027': contactEMail,
        '2028': payrollSWProv,
        '2029': payrollSWPkg,
        '2030': taxYear,
        '2031': period,
        '2082': empSIC7,
        '2035': empTradeClas,
        '2037': diplomaticImmunity,
        '2063': empAddrStreetNbr,
        '2064': empAddrStreetName,
        '2066': empAddrTown,
        '2080': empAddrPCode,
        '2081': empAddrCCode,
        '9999': null
      }),
      emp_trailer: JSON.stringify({
        '6010': empDetails.length + 1,
        '9999': null
      }),
      include_cccs: includeCccs,
      sic7: empSIC7
    })
    .then(empMaster => ({ ...empMaster, empDetails }));
/*
Must be equal to the total CODE VALUE of records for the specific employer
  (codes from 2010 to 2083, 3010 to 4497, 4582, 4583 and 7002 to 7008,
  plus all the 9999 codes in between must be added together).
 */
const get6020EmpTotCodeValue = ({ empMaster }) => {};
//empCodes.reduce((acc, { emp_code: eC }) => ((eC) ? acc + eC : acc), 0);

const get6030EmpTotValue = empCodes =>
  empCodes.reduce((acc, { emp_code: eC }) => (eC ? acc + eC : acc), 0);

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

const getEMpHeader = ({ period, testLive, cubitCompany }) => ({});

exports.createFromCubitCompany = ({ period, testLive, cubitCompany }) =>
  db.one(sqlCreate, {
    description: `${period} ${cubitCompany.compname}`,
    tax_year:
      period.substring(5, 7) === '02'
        ? period.substring(0, 4) - 0
        : period.substring(0, 4) - 0 + 1,
    tax_month: period.substring(5, 7),
    cubit_company_code: cubitCompany.ccc,
    status_id: null,
    date_from:
      period.substring(5, 7) === '02'
        ? period.substring(0, 4) - 1 + '/03/01'
        : period.substring(0, 4) + '/03/01',
    date_to:
      period.substring(5, 7) === '02'
        ? period.substring(0, 4) + '/02/28'
        : period.substring(0, 4) + '/03/01',
    test_live: testLive.toUpperCase(),
    detail_count: null,
    is_import: false,
    period: `${period.substring(0, 4)}${period.substring(5, 7)}`,
    when_create: new Date(),
    emp_header: JSON.stringify(get),
    emp_trailer: JSON.stringify(jTrailer)
  });
