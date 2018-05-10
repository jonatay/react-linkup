const ModelCostCentre = require('../../models/fleet/ModelCostCentre');
const ModelTranTypeCc = require('../../models/fleet/ModelTransactionTypeCostCentre');

exports.list = (req, res) => {
  ModelCostCentre.list()
    .then(data => res.json(data))
    .catch(e => res.json(e));
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { costCentre, changes } = req.body;
  ModelCostCentre.update(id, changes)
    .then(data =>
      ModelCostCentre.get(data.id).then(data =>
        res.json({ status: 'updated', costCentre: data })
      )
    )
    .catch(err => res.json({ status: 'error', msg: err }));
};

exports.create = (req, res) => {
  const { costCentre } = req.body;
  ModelCostCentre.create(costCentre)
    .then(data =>
      ModelCostCentre.get(data.id).then(data =>
        res.json({ status: 'created', costCentre: data })
      )
    )
    .catch(err => res.json({ status: 'error', msg: err }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ModelTranTypeCc.deleteByCostCentre(id).then(() =>
    ModelCostCentre.delete(id)
      .then(() => res.json({ status: 'deleted', id }))
      .catch(err => res.json({ status: 'error', msg: err }))
  );
};
