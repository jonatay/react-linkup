const db = require('../../services/postgres/db');

const sqlList = `
SELECT cc.*, ccg.name AS cost_centre_group FROM fleet.cost_centre cc
LEFT JOIN fleet.cost_centre_group ccg ON ccg.id = cc.cost_centre_group_id
`;

const sqlCreate = `
INSERT INTO fleet.cost_centre
  (name, description)
VALUES 
  ($[name], $[description])
RETURNING *
`;

const sqlUpdate = `
UPDATE fleet.cost_centre
   SET name=$[name], description=$[description]
 WHERE id=$[id]
 RETURNING *
`;

const sqlDelete = `
DELETE FROM fleet.cost_centre
WHERE id = $[id]
`;

exports.list = () => db.any(sqlList);

exports.create = data => db.one(sqlCreate, {...data});

exports.update = (id, data) => db.one(sqlUpdate, { id, ...data });

exports.delete = id => db.none(sqlDelete, { id });
