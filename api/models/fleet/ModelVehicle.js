// MODEL Vehicle
const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM fleet.vehicle
`;

const sqlGet = `
SELECT * from fleet.vehicle_get_id($[id]) vehicle
`;

const sqlGetByRegistration = `
  SELECT * FROM fleet.vehicle WHERE registration = $[registration]
`;
// SELECT id FROM fleet.vehicle WHERE $[fimsName] = ANY (fims_names)
// 	AND $[fimsReg] = ANY (fims_registrations)
// 	AND $[fimsDriver] = ANY (fims_drivers)
// `;

const sqlInsertFimsVehicle = `
INSERT INTO fleet.vehicles (name, registration) VALUES ($[name], $[registration])
RETURNING *
`;

const sqlUpdate = `
UPDATE fleet.vehicle
   SET name=$[name], registration=$[registration], make=$[make], 
        model=$[model], year=$[year], fims_registrations=$[fims_registrations], 
        fims_names=$[fims_names], fims_drivers=$[fims_drivers], jdata=$[jdata], 
        is_active=$[is_active]
   WHERE id=$[id];
`;

exports.list = () => db.any(sqlList);

exports.get = parms => db.one(sqlGet, parms);

exports.getOrInsert = (name, registration) =>
  db
    .any(sqlGetByRegistration, { registration })
    .then(
      vehicles =>
        vehicles.length === 1
          ? vehicles[0]
          : db.one(sqlInsertFimsVehicle, {
              name: name.toProperCase(),
              registration
            })
    );

exports.update = parms => db.none(sqlUpdate, parms);
