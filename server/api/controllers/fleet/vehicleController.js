const db = require('../../services/postgres/db');
const ModelVehicle = require('../../models/fleet/ModelVehicle');

exports.list = (req, res) => {
  ModelVehicle.list()
    .then(vehicles => res.json({ status: 'list', vehicles }))
    .catch(e => res.json({ status: 'error', e }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { changes } = req.body;
  if (changes.year === '') {
    changes.year = null;
  }
  ModelVehicle.update({ ...changes, id }).then(() =>
    ModelVehicle.get({ id }).then(data => res.json(data))
  );
};

exports.toggleActive = (req, res) => {
  const id = req.params.id;
  ModelVehicle.toggleActive(id).then(vehicle =>
    res.json({
      vehicle
    })
  );
};
