const ModelCostCentreGroup = require('../../models/fleet/ModelCostCentreGroup');

exports.list = (req, res) => {
  ModelCostCentreGroup.list()
    .then(data => res.json(data))
    .catch(e => res.json(e));
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { costCentreGroup, changes } = req.body;
  ModelCostCentreGroup.update(id, changes)
    .then(data => res.json({ status: 'updated', costCentreGroup: data }))
    .catch(err => res.json({ status: 'error', msg: err }));
};

exports.create = (req, res) => {
  const { costCentreGroup } = req.body;
  ModelCostCentreGroup.create(costCentreGroup)
    .then(data => res.json({ status: 'created', costCentreGroup: data }))
    .catch(err => res.json({ status: 'error', msg: err }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ModelCostCentreGroup.delete(id)
    .then(() => res.json({ status: 'deleted', id }))
    .catch(err => res.json({ status: 'error', msg: err }));
};
