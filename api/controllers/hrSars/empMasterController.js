const ModelEmpMaster = require('../../models/hrSars/ModelEmpMaster')

exports.list = (req, res) => {
  ModelEmpMaster.list().then(data =>
    res.json({ status: 'list', empMasters: data })
  );
};