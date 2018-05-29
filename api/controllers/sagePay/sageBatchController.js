const ModelSageBatch = require('../../models/sagePay/ModelSageBatch');
const ModelEmpSalary = require('../../models/hr/ModelEmpSalary');
const ModelCubitEmployee = require('../../models/cubit/cubit/ModelCubitEmployee');

exports.list = (req, res) => {
  ModelSageBatch.list().then(sageBatches =>
    res.json({ status: 'list', sageBatches })
  );
};

// ModelEmpSalary.list(2019, 3).then(res =>
//   console.log(
//     res.reduce(
//       (re, i) => ({ total: re.total + i.pay_bank, count: re.count + 1 }),
//       { total: 0, count: 0 }
//     )
//   )
// );

const keysUpdate = [
  '101',
  '102',
  '131',
  '132',
  '133',
  '134',
  '135',
  '136',
  '161',
  '251'
];

const keysPay = [
  '101',
  '102',
  '131',
  '132',
  '133',
  '134',
  '135',
  '136',
  '162',
  '252'
];

exports.create = (
  {
    body: {
      params: {
        instruction,
        actionDate: action_date,
        taxYear: tax_year,
        taxMonth: tax_month
      }
    }
  },
  res
) => {
  new Promise(
    (resolve, reject) =>
      instruction === 'Update'
        ? ModelCubitEmployee.list().then(data => resolve(data))
        : ModelEmpSalary.list(tax_year, tax_month).then(data => resolve(data))
  ).then(data => console.log(data));
  // ModelEmpSalary.list(tax_year, tax_month).then(employees =>
  //   Promise.all(employees.map(emp => emp)).then(batchTransactions =>
  //     console.log({
  //       batch_name: `${instruction} for ${tax_year}/${tax_month}`,
  //       instruction,
  //       action_date,
  //       tax_year,
  //       tax_month
  //     })
  //   )
  // );
};

exports.postToSage = (req, res) => {};

exports.updateSageStatus = (req, res) => {};
