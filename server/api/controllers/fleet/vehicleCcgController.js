const ModelVehicleCcg = require('../../models/fleet/ModelVehicleCcg');

exports.list = (req, res) => {
  ModelVehicleCcg.list()
    .then(data => res.json({ status: 'listed', vehicleCcgs: data }))
    .catch(err => res.json({ status: 'error', msg: err }));
};

exports.insert = (req, res) => {
  const vehicleCcg = req.body;
  ModelVehicleCcg.insert(vehicleCcg)
    .then(data => res.json({ status: 'inserted', vehicleCcg: data }))
    .catch(err => res.json({ status: 'error', msg: err }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const {vehicleCcg} = req.body;
  console.log(vehicleCcg);
  ModelVehicleCcg.update(id, vehicleCcg)
    .then(data => res.json({ status: 'updated', vehicleCcg: data }))
    .catch(err => res.json({ status: 'error', msg: err }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ModelVehicleCcg.delete(id)
    .then(() => res.json({ status: 'deleted', id }))
    .catch(err => res.json({ status: 'error', msg: err }));
};
