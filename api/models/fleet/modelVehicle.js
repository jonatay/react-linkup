// MODEL Vehicle
const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM fleet.vehicle_get_list() v
`;

const sqlGet = `
SELECT * from fleet.vehicle_get_id($[id]) vehicle
`;

const sqlUpdate = `
UPDATE fleet.vehicle
   SET name=$[name], registration=$[registration], make=$[make], 
        model=$[model], year=$[year], fims_registrations=$[fims_registrations], 
        fims_names=$[fims_names], fims_drivers=$[fims_drivers], jdata=$[jdata], 
        is_active=$[is_active]
   WHERE id=$[id];
`;

exports.list = params => db.many(sqlList, params);

exports.get = parms => db.one(sqlGet, parms);

exports.update = parms => db.none(sqlUpdate, parms)
