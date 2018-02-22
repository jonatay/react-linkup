const db = require('../../services/postgres/db');

const sqlListAllVehicles = `
SELECT v.id, v.name, v.registration, v.make, v.model, v.year, 
        v.fims_registrations, v.fims_names, v.fims_drivers, v.jdata, 
        array_agg(cc.id) AS cost_centre_ids,array_agg(cc.name) AS cost_centres
FROM fleet.vehicle v
LEFT JOIN fleet.vehicle_cost_centre vcc ON vcc.vehicle_id = v.id 
LEFT JOIN fleet.cost_centre cc ON cc.id = vcc.cost_centre_id
GROUP BY v.id
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
    db.one(sqlGetVehicle, { id }).then(vehicle => res.json({ vehicle }));
  });
};
