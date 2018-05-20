const ModelSageAccount = require('../../models/sagePay/ModelSageAccount');
const ModelCubitEmployee = require('../../models/cubit/cubit/ModelCubitEmployee');

exports.list = (req, res) => {
  ModelSageAccount.list().then(data =>
    res.json({ status: 'list', sageAccounts: data })
  );
};

exports.importBest = (req, res) => {
  const { bestCreditors } = req.body;
  ModelSageAccount.insertBatch(
    bestCreditors
      .map(bc => ModelSageAccount.fillFromBestCreditor(bc))
      .then(data => res.json({ status: 'import-best', sageAccounts: data }))
  );
};

// ModelCubitEmployee.list().then(data =>
//   console.log(
//     data.length,
//     data.map(d => ({ name: d.sname + ', ' + d.fnames, ec: d.enum }))
//   )
// );

exports.importCubit = (req, res) => {
  res.json({ status: 'not_implemented', sageAccounts: [] });
};

exports.create = (req, res) => {
  res.json({ status: 'not_implemented', sageAccount: {} });
};

exports.update = (req, res) => {
  res.json({ status: 'not_implemented', sageAccount: {} });
};

exports.delete = (req, res) => {
  res.json({ status: 'not_implemented', id: null });
};

exports.validateSage = (req, res) => {
  res.json({ status: 'not_implemented', sageAccount: {}, validation: {} });
};
