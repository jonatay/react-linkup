const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM fleet.driver
`;

const sqlGetByFimsName = `
SELECT * FROM fleet.driver WHERE $[fimsName] = ANY (fims_names)
`;

const sqlInsertFims = `
INSERT INTO fleet.driver (name, fims_names) VALUES ( $[name], $[fims_names] )
RETURNING *
`;

exports.list = () => db.any(sqlList);

exports.getByFimsName = fimsName = db
  .any(sqlGetByFimsName, { fimsName })
  .then(drivers => (drivers.length > 0 ? drivers[0] : null));
