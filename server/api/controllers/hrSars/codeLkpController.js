const ModelCodeLkp = require('../../models/hrSars/ModelCodeLkp');

exports.list = (req, res) => {
  ModelCodeLkp.list().then(data => res.json({ status: 'list', codeLkps: data }));
};
