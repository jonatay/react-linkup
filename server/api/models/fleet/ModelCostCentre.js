const db = require('../../services/postgres/db');

const tableName = 'fleet.cost_centre';

const sqlList = `
SELECT cc.*, ccg.name AS cost_centre_group FROM ${tableName} cc
LEFT JOIN ${tableName}_group ccg ON ccg.id = cc.cost_centre_group_id
`;

const sqlGet = `
SELECT cc.*, ccg.name AS cost_centre_group FROM ${tableName} cc
LEFT JOIN ${tableName}_group ccg ON ccg.id = cc.cost_centre_group_id
WHERE cc.id = $[id]
`;

const sqlListCcsByCcg = `
select id from ${tableName} WHERE cost_centre_group_id = $[costCentreGroupId]
`;

const sqlCreate = `
INSERT INTO ${tableName}
  (name, description, cost_centre_group_id)
VALUES 
  ($[name], $[description], $[cost_centre_group_id])
RETURNING *
`;

const sqlUpdate = `
UPDATE ${tableName}
   SET name=$[name], description=$[description], cost_centre_group_id=$[cost_centre_group_id]
 WHERE id=$[id]
 RETURNING *
`;

const sqlDelete = `
DELETE FROM ${tableName}
WHERE id = $[id]
`;

exports.list = () => db.any(sqlList);

exports.listCcsByCcg = costCentreGroupId =>
  db
    .any(sqlListCcsByCcg, { costCentreGroupId })
    .then(ccs => ccs.map(cc => cc.id));

exports.get = id => db.one(sqlGet, { id });

exports.create = data => db.one(sqlCreate, { ...data });

exports.update = (id, data) => db.one(sqlUpdate, { id, ...data });

exports.delete = id => db.none(sqlDelete, { id });
