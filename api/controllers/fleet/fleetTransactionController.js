const ModelFleetTransaction = require('../../models/fleet/modelFleetTransaction');

exports.list = (req, res) => {
  const param = req.body;
  ModelFleetTransaction.list(param)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};
