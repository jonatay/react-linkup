const ModelSageBBranch = require('../../models/sagePay/ModelSageBBranch');
const accountServices = require('../../services/sagePay/accountServices');

exports.list = (req, res) => {
  ModelSageBBranch.list().then(data =>
    res.json({ status: 'list', sageBBranches: data })
  );
};

exports.import = (req, res) => {
  accountServices
    .getBBranchList()
    .then(data =>
      ModelSageBBranch.insertBatch(data).then(data =>
        res.json({ status: 'imported', sageBBranches: data })
      )
    );
};
