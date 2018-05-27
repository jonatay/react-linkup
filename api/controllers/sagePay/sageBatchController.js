const ModelSageBatch = require('../../models/sagePay/ModelSageBatch');
const ModelEmpSalary = require('../../models/hr/ModelEmpSalary');

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

exports.create = (req, res) => {
  const {
    instruction,
    actionDate: action_date,
    taxYear: tax_year,
    taxMonth: tax_month
  } = req.body;
  ModelEmpSalary.list(tax_year, tax_month).then(employees =>
    Promise.all(employees.map(emp => emp)).then(
      batchTransactions => ModelSageBatch.insert({
        batch_name: `${instruction} for ${tax_year}/${tax_month}`,
        instruction,
        action_date,
        tax_year,
        tax_month
      }).then(sageBatch => res.json({ status: 'create', sageBatch }));
    )
  );

};

exports.postToSage = (req, res) => {};

exports.updateSageStatus = (req, res) => {};
