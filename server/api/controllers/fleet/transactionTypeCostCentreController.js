const ModelTransactionTypeCostCentre = require('../../models/fleet/ModelTransactionTypeCostCentre');

exports.list = (req, res) => {
  ModelTransactionTypeCostCentre.list()
    .then(data => res.json(data))
    .catch(e => res.json(e));
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { costCentreGroup, changes } = req.body;
  ModelTransactionTypeCostCentre.update(id, changes)
    .then(data =>
      ModelTransactionTypeCostCentre.get(data.id).then(data =>
        res.json({ status: 'updated', transactionTypeCostCentre: data })
      )
    )
    .catch(err => res.json({ status: 'error', msg: err }));
};

exports.create = (req, res) => {
  const { transactionTypeCostCentre } = req.body;
  ModelTransactionTypeCostCentre.create(transactionTypeCostCentre)
    .then(data =>
      ModelTransactionTypeCostCentre.get(data.id).then(data =>
        res.json({ status: 'created', transactionTypeCostCentre: data })
      )
    )
    .catch(err => res.json({ status: 'error', msg: err }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ModelTransactionTypeCostCentre.delete(id)
    .then(() => res.json({ status: 'deleted', id }))
    .catch(err => res.json({ status: 'error', msg: err }));
};
