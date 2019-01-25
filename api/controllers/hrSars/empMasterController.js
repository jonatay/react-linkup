const Promise = require('bluebird');

const ModelEmpMaster = require('../../models/hrSars/ModelEmpMaster');
const ModelEmpDetail = require('../../models/hrSars/ModelEmpDetail');
const ModelEmpCode = require('../../models/hrSars/ModelEmpCode');

exports.list = (req, res) => {
  ModelEmpMaster.list().then(data =>
    res.json({ status: 'list', empMasters: data })
  );
};

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
  ModelEmpMaster.createFromEmp501Import(jHeader, jTrailer).then(empMaster =>
    Promise.map(
      //get array of all empDetails in import
      ModelEmpDetail.createFromEmp501Import(empMaster, ajEmployees),
      (empDetail, idx) =>
        ModelEmpCode.createFromEmp501Import(empDetail, ajEmployees[idx]).then(
          empCodes => {
            empDetail.empCodes = empCodes;
            return empDetail;
          }
        )
    ).then(empDetailsWCd => {
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
//     return ModelEmpCode.create(empCodeData);
//   }).then(empCodes => {
//     //console.log(aEmployees);
//     res.json({ empMaster });
//   });
// });
