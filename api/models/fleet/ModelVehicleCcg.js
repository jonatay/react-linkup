const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM fleet.vehicle_cost_centre_group
`;

const sqlInsert = `
INSERT INTO fleet.vehicle_cost_centre_group(
            cost_centre_group_id, vehicle_id, start_date)
    VALUES ($[cost_centre_group_id], $[vehicle_id], $[start_date])
RETURNING *
`;

const sqlUpdate = `
UPDATE fleet.vehicle_cost_centre_group
   SET cost_centre_group_id=$[cost_centre_group_id], 
   vehicle_id=$[vehicle_id], start_date=$[start_date]
 WHERE id = $[id]
 RETURNING *
`;

const sqlDelete = `
DELETE FROM fleet.vehicle_cost_centre_group
WHERE id = $[id]
`;

exports.list = params => db.many(sqlList, params);

exports.insert = vehicleCcg => db.one(sqlInsert, vehicleCcg);

exports.update = (id, vehicleCcg) => db.one(sqlUpdate, { id, ...vehicleCcg });

exports.delete = id => db.none(sqlDelete, { id });
