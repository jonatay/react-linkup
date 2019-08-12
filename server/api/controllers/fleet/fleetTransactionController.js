const ModelFleetTransaction = require('../../models/fleet/ModelFleetTransaction');

exports.list = (req, res) => {
  const params = JSON.parse(req.params.params);
  console.log(params);
  ModelFleetTransaction.list(params)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};
