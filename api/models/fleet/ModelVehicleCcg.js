const db = require('../../services/postgres/db');

const tableName = 'fleet.vehicle_cost_centre_group';

const sqlList = `
SELECT * FROM ${tableName}
`;

const sqlGetCcgIdByVehicle = `
SELECT cost_centre_group_id FROM ${tableName}
WHERE vehicle_id = $[vehicleId]
`;

const sqlInsert = `
INSERT INTO ${tableName}(
            cost_centre_group_id, vehicle_id, start_date)
    VALUES ($[cost_centre_group_id], $[vehicle_id], $[start_date])
RETURNING *
`;

const sqlUpdate = `
UPDATE ${tableName}
   SET cost_centre_group_id=$[cost_centre_group_id], 
   vehicle_id=$[vehicle_id], start_date=$[start_date]
 WHERE id = $[id]
 RETURNING *
`;

const sqlDelete = `
DELETE FROM ${tableName}
WHERE id = $[id]
`;

exports.list = params => db.many(sqlList, params);

exports.getCcgIdByVehicle = (vehicleId, date) =>
  db
    .oneOrNone(sqlGetCcgIdByVehicle, { vehicleId })
    .then(vCcg => (vCcg ? vCcg.cost_centre_group_id : null));

exports.insert = vehicleCcg => db.one(sqlInsert, vehicleCcg);

exports.update = (id, vehicleCcg) => db.one(sqlUpdate, { id, ...vehicleCcg });

exports.delete = id => db.none(sqlDelete, { id });
