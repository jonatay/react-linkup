const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM fleet.merchant
`;

const sqlGetByFims = `
SELECT * FROM fleet.merchant WHERE $[name] = ANY (fims_names)
`;

const sqlInsertFims = `
INSERT INTO fleet.merchant (name, town, oil_coy, fims_names) VALUES ( $[name], $[town], $[oil_coy], $[fimsNames] )
RETURNING *
`;

exports.list = () => db.any(sqlList);

exports.getOrInsert = (name, town, oil_coy) =>
  db.any(sqlGetByFims, { name }).then(
    merchants =>
      merchants.length === 1
        ? merchants[0]
        : db.one(sqlInsertFims, {
            name: name.toProperCase(),
            town: town.toProperCase(),
            oil_coy,
            fimsNames: [name]
          })
  );
