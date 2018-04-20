const ModelFleetTransaction = require('../../models/fleet/modelFleetTransaction');

exports.list = (req, res) => {
  const params = JSON.parse(req.params.params);
  ModelFleetTransaction.list(params)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};
