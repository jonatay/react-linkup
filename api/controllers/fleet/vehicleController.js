const db = require('../../services/postgres/db');
const ModelVehicle = require('../../models/fleet/modelVehicle');

const sqlListAllVehicles = `
SELECT * FROM fleet.vehicle_get_list() v
`;

const sqlGetVehicle = `
SELECT * from fleet.vehicle_get_id($[id]) v
`;

const sqlUpdateVehicle = `
UPDATE fleet.vehicle
SET *InsUpd*
WHERE id=$[id]
`;

const sqlToggleIsActive = `
UPDATE fleet.vehicle 
SET is_active = NOT(is_active) 
WHERE id=$[id]
`;

// function ccList(ccIds, vccIds, names) {
//   var result = [];
//   for (var i = 0; i < ccIds.length; i++) {
//     result.push({ ccId: ccIds[i], vccId: vccIds[i], name: names[i] });
//   }
//   return result;
// }

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
