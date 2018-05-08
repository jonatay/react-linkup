const ModelCostCentreGroup = require('../../models/fleet/ModelCostCentreGroup');

exports.list = (req, res) => {
  ModelCostCentreGroup.list()
    .then(data => res.json(data))
    .catch(e => res.json(e));
};

exports.update = (req, res) => {
  const id = req.params.id;
  const {costCentreGroup} = req.body;
  ModelCostCentreGroup.update(id, costCentreGroup)
    .then(data => res.json({ status: 'updated', costCentreGroup: data }))
    .catch(err => res.json({ status: 'error', msg: err }));
};

exports.create = (req,res) => {

}
