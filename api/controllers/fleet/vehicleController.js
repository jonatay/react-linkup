const db = require('../../services/postgres/db');

const sqlListAllVehicles = `
SELECT * FROM fleet.vehicle
`;

const sqlGetVehicle = `
SELECT * FROM fleet.vehicle
WHERE id = $[id]
`;

const sqlUpdateVehicle = `
UPDATE fleet.vehicle
SET *InsUpd*
WHERE id=$[id]
`;

exports.vehicleList = (req, res) => {
  db
    .any(sqlListAllVehicles)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};

exports.vehicleUpdate = (req, res) => {
  const id = req.params.id;
  const { changes } = req.body;
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
    db.one(sqlGetVehicle, { id }).then(vehicle => res.json({vehicle}));
  });
};
