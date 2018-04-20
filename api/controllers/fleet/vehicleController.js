const db = require('../../services/postgres/db');

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

function ccList(ccIds, vccIds, names) {
  var result = [];
  for (var i = 0; i < ccIds.length; i++) {
    result.push({ ccId: ccIds[i], vccId: vccIds[i], name: names[i] });
  }
  return result;
}

exports.list = (req, res) => {
  db
    .any(sqlListAllVehicles)
    .then(data => res.json(data.map(v => v.v)))
    .catch(e => res.json(e));
};

exports.update = (req, res) => {
  const id = req.listParams.id;
  const { changes } = req.body;
  console.log(JSON.stringify(changes, null, 4));
  let sets = [];
  let vals = { id };
  let i = 2;
  for (let key in changes) {
    const change = changes[key];
    sets.push(String.raw`${key}=$[${key}]`);
    vals[key] = change[change.length - 1];
    i++;
  }
  let sqlUpd = sqlUpdateVehicle.replace('*InsUpd*', sets.join(','));
  console.log(sqlUpd, vals);
  db.none(sqlUpd, vals).then(() => {
    db.one(sqlGetVehicle, { id }).then(v =>
      res.json({
        vehicle: {
          ...v.v
        }
      })
    );
  });
};

exports.toggleActive = (req, res) => {
  const id = req.listParams.id;
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
