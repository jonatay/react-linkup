const ModelSageBank = require('../../models/sagePay/ModelSageBank');
const accountServices = require('../../services/sagePay/accountServices');

exports.list = (req, res) => {
  ModelSageBank.list().then(data =>
    res.json({ status: 'list', sageBanks: data })
  );
};

exports.import = (req, res) => {
  accountServices
    .getBankList()
    .then(data =>
      ModelSageBank.insertBatch(data).then(data =>
        res.json({ status: 'imported', sageBanks: data })
      )
    );
};
