const Promise = require('bluebird');
const { dump } = require('dumper.js');

const ModelEmpMaster = require('../../models/hrSars/ModelEmpMaster');
const ModelEmpDetail = require('../../models/hrSars/ModelEmpDetail');
const ModelEmpCode = require('../../models/hrSars/ModelEmpCode');

const ModelHrSarsEmpLedger = require('../../models/hrSars/ModelHrSarsEmpLedger');

const ModelEmployee = require('../../models/hr/ModelEmployee');
const ModelEmpLedger = require('../../models/hr/ModelEmpLedger');
const ModelCubitCompany = require('../../models/cubit/ModelCubitCompany');
const ModelCubitEmployees = require('../../models/cubit/ModelCubitEmployee');

const ModelSageAccount = require('../../models/sagePay/ModelSageAccount');
const ModelGLedger = require('../../models/gl/ModelGLedger');

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

exports.create = ({ body: { data: params } }, res) =>
  ModelGLedger.listSdlUif(
    params.includeCccs.split(','),
    params.dateFrom,
    params.dateTo
  ).then(gLedgers =>
    Promise.map(
      //through all employees in coys, in date range
      ModelEmpLedger.listEmpsInDateRange(
        params.includeCccs.split(','),
        params.dateFrom,
        params.dateTo
      ),
      emp =>
        Promise.map(
          [
            ModelEmployee.getByEmployeeCode(emp.employee_code),
            ModelSageAccount.getByAccRef(emp.employee_code),
            ModelCubitEmployees.get(emp.employee_code)
          ],
          wever => wever
        ).then(([employee, sageAccount, cubitEmployee]) =>
          ModelEmpLedger.getEmpInDateRange(
            params.dateFrom,
            params.dateTo,
            emp.employee_code
          )
            .then(empLedgers =>
              ModelEmpCode.newFromEmpLedgers({
                empLedgers,
                employee,
                gLedgers
              })
            )
            .then(empCodes =>
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
        // create MASTER
        ModelEmpMaster.createFromEmpDetailsParams({ params, empDetails })
      )
      .then(empMaster =>
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
