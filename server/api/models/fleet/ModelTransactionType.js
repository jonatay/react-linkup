const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM fleet.transaction_type
`;

const sqlGetByFims = `
SELECT * FROM fleet.transaction_type WHERE $[purchaseType] = ANY (fims_purchase_types)
`;

const sqlInsertFims = `
INSERT INTO fleet.transaction_type (name, fims_purchase_types) VALUES ( $[purchaseType], $[fimsPurchaseTypes] )
RETURNING *
`;

exports.list = () => db.any(sqlList);

exports.getOrInsert = (purchaseType, purchaseDate) =>
  db.any(sqlGetByFims, { purchaseType }).then(
    transactionTypes =>
      transactionTypes.length === 1
        ? transactionTypes[0]
        : db.one(sqlInsertFims, {
            purchaseType: purchaseType.toProperCase(),
            fimsPurchaseTypes: [purchaseType]
          })
  );
