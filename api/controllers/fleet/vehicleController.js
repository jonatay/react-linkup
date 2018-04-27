const db = require('../../services/postgres/db');
const ModelVehicle = require('../../models/fleet/modelVehicle');

exports.list = (req, res) => {
  ModelVehicle.list()
    .then(data => res.json(data.map(v => v.v)))
    .catch(e => res.json(e));
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
  db.none(sqlToggleIsActive, { id }).then(() => {
    db.one(sqlGetVehicle, { id }).then(v =>
      res.json({
        vehicle: {
          ...v.v
        }
      })
    );
  });
};
