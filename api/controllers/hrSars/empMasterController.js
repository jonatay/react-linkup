const Promise = require('bluebird');
// const { dump } = require('dumper.js');
var numeral = require('numeral');

const ModelEmpMaster = require('../../models/hrSars/ModelEmpMaster');
const ModelEmpDetail = require('../../models/hrSars/ModelEmpDetail');
const ModelEmpCode = require('../../models/hrSars/ModelEmpCode');

// const ModelHrSarsEmpLedger = require('../../models/hrSars/ModelHrSarsEmpLedger');

const ModelEmployee = require('../../models/hr/ModelEmployee');
const ModelEmpLedger = require('../../models/hr/ModelEmpLedger');
const ModelCubitCompany = require('../../models/cubit/ModelCubitCompany');
const ModelCubitEmployees = require('../../models/cubit/ModelCubitEmployee');
const ModelSalSumm = require('../../models/hr/ModelSalSumm');

const ModelSageAccount = require('../../models/sagePay/ModelSageAccount');
const ModelGLedger = require('../../models/gl/ModelGLedger');
/*
for (var key in myArray) {
  console.log("key " + key + " has value " + myArray[key]);
}
 */

exports.downloadEmp501 = async (req, res) => {
  const getValue = (aVals, key) =>
    ['4141', '4142', '4102', '4149'].includes(key) // N0.00
      ? numeral(aVals[key]).format('0.00')
      : ['3699', '4001', '3605', '3606'].includes(key) // N0
      ? parseInt(aVals[key])
      : aVals[key];
  const extractKeyValLine = aVals => {
    const rtn = [];
    for (var key in aVals) {
      if (aVals[key] || parseInt(key) === 9999) {
        rtn.push(key);
        rtn.push(getValue(aVals, key));
      }
    }
    return rtn.join(',').slice(0, -1);
  };
  const { id } = req.params;
  const aData = [];
  console.log('download', id);
  const empMaster = await ModelEmpMaster.get(id);
  const empDetails = await ModelEmpDetail.getByEmpMaster(id);
  aData.push(extractKeyValLine(JSON.parse(empMaster.emp_header)));
  for (let i = 0; i < empDetails.length; i++) {
    aData.push(extractKeyValLine(JSON.parse(empDetails[i].emp_employee_data)));
  }
  aData.push(extractKeyValLine(JSON.parse(empMaster.emp_trailer)));
  // ModelEmpMaster.get(id).then(empMaster => {
  res.json({
    filename: `emp501-${empMaster.period}-${empMaster.cubit_company_code}`,
    data: aData.join('\n'),
    type: 'text/plain'
  });
};

exports.list = (req, res) => {
  ModelEmpMaster.list().then(data =>
    res.json({ status: 'list', empMasters: data })
  );
};

exports.listCubitCompanies = (req, res) => {
  ModelCubitCompany.list().then(data =>
    res.json({ status: 'list', cubitCompanies: data })
  );
};

/*
collects all data, then creates in memory, per emp, detail rec then codes
codes then fed to master create to get checksum, then emp detail, finally they are also written
 */
exports.create = ({ body: { data: params } }, res) =>
  //start by getting all emp related data from GENERAL LEDGER in date range, in included coys
  ModelGLedger.listSdlUif(
    params.includeCccs.split(','),
    params.dateFrom,
    params.dateTo
  ).then(gLedgers =>
    Promise.map(
      // get unique list of all employees in HR LEDGER in date range, in included coys
      //MAP through all employees in coys, in date range
      ModelEmpLedger.listEmpsInDateRange(
        params.includeCccs.split(','),
        params.dateFrom,
        params.dateTo
      ),
      emp =>
        Promise.map(
          // for each employee found above, MAP in additional data
          [
            ModelEmployee.getByEmployeeCode(emp.employee_code),
            ModelSageAccount.getByAccRef(emp.employee_code),
            ModelCubitEmployees.get(emp.employee_code),
            ModelSalSumm.listByEmpCodeDate(
              emp.employee_code,
              params.dateFrom,
              params.dateTo
            )
          ],
          wever => wever
        ).then(([employee, sageAccount, cubitEmployee, salSumms]) =>
          // fetch all HR LEDGER for this empl, in date range
          ModelEmpLedger.getEmpInDateRange(
            params.dateFrom,
            params.dateTo,
            emp.employee_code
          )
            .then(empLedgers =>
              // get EMP CODES from ledgers  *** NB - these haven't been written to db yet, so NO ID ***
              ModelEmpCode.newFromEmpLedgers({
                empLedgers,
                employee,
                gLedgers,
                salSumms
              })
            )
            .then(empCodes =>
              // get EMP EMPLOYEE *** NB - this hasn't been written to db yet, so NO ID ***
              ModelEmpDetail.newFromEmployeeEmpCodes({
                employee,
                empCodes,
                sageAccount,
                cubitEmployee,
                params
              })
            )
        )
    )
      .then(empDetails =>
        // create MASTER in db
        ModelEmpMaster.createFromEmpDetailsParams({ params, empDetails })
      )
      .then(empMaster =>
        //EMP DETAILS, returned in EMP MASTER is one per emp
        Promise.map(empMaster.empDetails, empDetail =>
          // create DETAIL (emp_employee)
          ModelEmpDetail.createFromEmpDetailEmpMaster({
            empDetail,
            empMaster
          }).then(empDetail =>
            Promise.map(empDetail.empCodes, empCode =>
              //create CODE
              ModelEmpCode.createFromEmpCodeEmpDetail({ empCode, empDetail })
            ).then(empCodes => ({ empDetail, empCodes }))
          )
        )
          .then(list =>
            list.reduce(
              (acc, { empDetail, empCodes }) => ({
                empDetails: [...acc.empDetails, empDetail],
                empCodes: [...acc.empCodes, ...empCodes]
              }),
              { empDetails: [], empCodes: [] }
            )
          )
          .then(({ empDetails, empCodes }) =>
            res.json({ empMaster, empDetails, empCodes, gLedgers })
          )
      )
  );

// ModelCubitEmployees.get('SE234').then(data =>
//   console.log(JSON.stringify(data, null, 2))
// );
/*
exports.createFromEmpDetailsParams = (req, res) => {
  try {
    const { data } = req.body;
    //createFromEmpDetailsParams empMaster
    ModelEmpMaster.createFromEmpDetailsParams(data).then(empMaster =>
      //map through employees (BY CODE) (in hr.emp_ledger in date-range)
      Promise.map(
        ModelEmpLedger.listEmpsInDateRange(
          data.includeCccs.split(','),
          data.dateFrom,
          data.dateTo
        ),
        empCode =>
          // map through all employees found in emp date range
          Promise.map(
            //get employee and emp_ledger's for each emp,
            [
              ModelEmployee.getByEmployeeCode(empCode.employee_code),
              ModelSageAccount.getByAccRef(empCode.employee_code),
              ModelCubitEmployees.get(empCode.employee_code),
              ModelEmpLedger.getEmpInDateRange(
                data.dateFrom,
                data.dateTo,
                empCode.employee_code
              )
            ],
            data => data
          ).then((
            //get employee and emp_ledger's for each emp,
            [employee, sageAccount, cubitEmployee, empLedgers]
          ) =>
            //use empMaster and employee to createFromEmpDetailsParams EmpDetail
            // EmpDetail = sars.emp_employee - has emp dependant codes, name, id, addr, bank etc...
            // dont have all data yet,
            ModelEmpDetail.createFromEmpMasterEmployee({
              empMaster,
              employee,
              sageAccount,
              cubitEmployee
            }).then(empDetail =>
              ModelEmpCode.createFromEmpMasterEmpLedgers({
                empMaster,
                empDetail,
                empLedgers
              }).then(empCodes => ({ ...empDetail, empCodes }))
            )
          )
      ).then(data => res.json({ error: data }))
    );
  } catch (error) {
    dump(error);
    res.json({ error });
  }
};
*/
exports.remove = (req, res) => {
  const { id } = req.params;
  ModelEmpCode.removeByEmpMaster(id).then(() =>
    ModelEmpDetail.removeByEmpMaster(id).then(() =>
      ModelEmpMaster.remove(id).then(data =>
        res.json({ status: 'deleted', empMaster: data })
      )
    )
  );
};

exports.importEmp501Text = (req, res) => {
  const { data } = req.body;
  //console.log(data);
  // data is obj based arrays, code:value, grouped by line, e.g. [{3001:102.22,3002:'nice one',...}, ...]
  // decypher emp header/footer
  let jHeader;
  let jTrailer;
  let ajEmployees = [];
  //sort the emp import file into header, employees and trailer
  for (let i = 0; i < data.length; i++) {
    if (data[i][2010]) {
      jHeader = data[i];
    }
    if (data[i][6010]) {
      jTrailer = data[i];
    }
    if (data[i][3010]) {
      ajEmployees.push(data[i]);
    }
  }
  // insert master
  ModelEmpMaster.createFromEmp501Import(jHeader, jTrailer).then(empMaster =>
    //map through emp details
    Promise.map(
      //insert emp details, get array of all empDetails in import w codes
      ModelEmpDetail.createFromEmp501Import(empMaster, ajEmployees),
      (empDetail, idx),
      //insert emp codes for each emp,
      ModelEmpCode.createFromEmp501Import(empDetail, ajEmployees[idx]).then(
        empCodes => ({ ...empDetail, empCodes })
      )
    ).then(empDetailsWCd => {
      // seperate codes from empl dtls
      let empCodes = empDetailsWCd.map(({ empCodes }) => empCodes);
      let empDetails = empDetailsWCd.map(({ empCodes, ...rest }) => ({
        ...rest
      }));
      res.json({ empMaster, empDetails, empCodes });
    })
  );
};

// .then(empMaster => {
//   // just employee lines
//   let aEmployees = [];
//   for (let i = 1; i < data.length; i++) {
//     let aEmpRec = data[i];
//     if (aEmpRec[0].code === '3010') {
//       aEmployees.push(aEmpRec);
//     }
//   }
//
// })
// .then(empDetails => {
//   Promise.map(aEmployees, aEmpl => {
//     let empCodeData = {};
//     return ModelEmpCode.createFromEmpDetailsParams(empCodeData);
//   }).then(empCodes => {
//     //console.log(aEmployees);
//     res.json({ empMaster });
//   });
// });
