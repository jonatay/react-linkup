const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM fleet.driver
`;

const sqlGetByFims = `
SELECT * FROM fleet.driver WHERE $[name] = ANY (fims_names) AND $[registration] = ANY (fims_registrations)
`;

const sqlInsertFims = `
INSERT INTO fleet.driver (name, fims_names, fims_registrations) VALUES ( $[name], $[fimsNames], $[fimsRegistrations] )
RETURNING *
`;

exports.list = () => db.any(sqlList);

exports.getOrInsert = (name, registration) =>
  db.any(sqlGetByFims, { name, registration }).then(
    drivers =>
      drivers.length === 1
        ? drivers[0]
        : db.one(sqlInsertFims, {
            name: name.toProperCase(),
            fimsNames: [name],
            fimsRegistrations: [registration]
          })
  );
