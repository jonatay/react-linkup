const db = require('../../services/postgres/db');

const tableName = 'fleet.transaction_type_cost_centre';

const sqlList = `
SELECT ttcc.*, tt.name AS transaction_type, cc.name AS cost_centre FROM ${tableName} ttcc
LEFT JOIN fleet.transaction_type tt ON tt.id = ttcc.transaction_type_id
LEFT JOIN fleet.cost_centre cc ON cc.id = ttcc.cost_centre_id
`;

const sqlGet = `
SELECT ttcc.*, tt.name AS transaction_type, cc.name AS cost_centre FROM ${tableName} ttcc
LEFT JOIN fleet.transaction_type tt ON tt.id = ttcc.transaction_type_id
LEFT JOIN fleet.cost_centre cc ON cc.id = ttcc.cost_centre_id
WHERE ttcc.id = $[id]
`;

const sqlListCCIdsByTransactionType = `
SELECT cost_centre_id FROM ${tableName}
WHERE transaction_type_id = $[transactionTypeId]
`;

const sqlCreate = `
INSERT INTO ${tableName}(
            transaction_type_id, cost_centre_id, start_date)
    VALUES ($[transaction_type_id], $[cost_centre_id], $[start_date])
RETURNING *
`;

const sqlUpdate = `
UPDATE ${tableName}
   SET 
      transaction_type_id=$[transaction_type_id], 
      cost_centre_id=$[cost_centre_id], 
      start_date=$[start_date]
 WHERE id=$[id]
 RETURNING *
`;

const sqlDelete = `
DELETE FROM ${tableName}
WHERE id = $[id]
`;

const sqlDeleteByCostCentre = `
DELETE FROM ${tableName}
WHERE cost_centre_id = $[id]
`;

exports.list = () => db.any(sqlList);

exports.get = id => db.one(sqlGet, { id });

exports.listCCIdsByTransactionType = transactionTypeId =>
  db
    .any(sqlListCCIdsByTransactionType, { transactionTypeId })
    .then(ttCcs => ttCcs.map(ttCc => ttCc.cost_centre_id));

exports.create = data => db.one(sqlCreate, { start_date: null, ...data });

exports.update = (id, data) => db.one(sqlUpdate, { id, ...data });

exports.delete = id => db.none(sqlDelete, { id });

exports.deleteByCostCentre = id => db.none(sqlDeleteByCostCentre, { id });
