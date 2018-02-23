const db = require('../../services/postgres/db');

const sqlListAllVehicles = `
SELECT v.*,
   array_agg(vcc.id) AS vcc_ids, array_agg(cc.id) AS cost_centre_ids,array_agg(cc.name) AS cost_centres
FROM fleet.vehicle v
LEFT JOIN fleet.vehicle_cost_centre vcc ON vcc.vehicle_id = v.id 
LEFT JOIN fleet.cost_centre cc ON cc.id = vcc.cost_centre_id
GROUP BY v.id
`;

const sqlGetVehicle = `
SELECT v.*,
   array_agg(vcc.id) AS vcc_ids, array_agg(cc.id) AS cost_centre_ids,array_agg(cc.name) AS cost_centres
FROM fleet.vehicle v
LEFT JOIN fleet.vehicle_cost_centre vcc ON vcc.vehicle_id = v.id 
LEFT JOIN fleet.cost_centre cc ON cc.id = vcc.cost_centre_id
WHERE v.id = $[id]
GROUP BY v.id
`;

const sqlUpdateVehicle = `
UPDATE fleet.vehicle
SET *InsUpd*
WHERE id=$[id]
`;

const sqlToggleIsActive = `
UPDATE fleet.vehicle 
SET is_active = NOT(COALESCE(is_active, FLASE)) 
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
    .then(data =>
      res.json(
        data.map(v => ({
          ...v,
          cost_centres: ccList(v.cost_centre_ids, v.vcc_ids, v.cost_centres)
        }))
      )
    )
    .catch(e => res.json(e));
};

exports.update = (req, res) => {
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
    db.one(sqlGetVehicle, { id }).then(v =>
      res.json({
        vehicle: {
          ...v,
          cost_centres: ccList(v.cost_centre_ids, v.vcc_ids, v.cost_centres)
        }
      })
    );
  });
};

exports.toggleActive = (req, res) => {
  const id = req.params.id;
  db.none(sqlToggleIsActive, { id }).then(() => {
    db.one(sqlGetVehicle, { id }).then(v =>
      res.json({
        vehicle: {
          ...v,
          cost_centres: ccList(v.cost_centre_ids, v.vcc_ids, v.cost_centres)
        }
      })
    );
  });
};
