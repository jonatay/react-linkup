// MODEL fleet_transaction
const db = require('../../services/postgres/db');

const sqlInsert = `
INSERT INTO fleet.fleet_transaction 
 VALUES ()
 RETURNING *
`;

exports.insert = fleetTransaction => db.one(sqlInsert, fleetTransaction);
