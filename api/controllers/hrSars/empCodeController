const ModelEmpCode = require('../../models/hrSars/ModelEmpCode')

exports.list = (req, res) => {
  ModelEmpCode.list().then(data =>
    res.json({ status: 'list', empCodes: data })
  );
};