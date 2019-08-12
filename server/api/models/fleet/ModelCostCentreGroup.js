const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM fleet.cost_centre_group
`;

const sqlCreate = `
INSERT INTO fleet.cost_centre_group
  (name, description)
VALUES 
  ($[name], $[description])
RETURNING *
`;

const sqlUpdate = `
UPDATE fleet.cost_centre_group
   SET name=$[name], description=$[description]
 WHERE id=$[id]
 RETURNING *
`;

const sqlDelete = `
DELETE FROM fleet.cost_centre_group
WHERE id = $[id]
`;

exports.list = () => db.any(sqlList);

exports.create = data => db.one(sqlCreate, {...data});

exports.update = (id, data) => db.one(sqlUpdate, { id, ...data });

exports.delete = id => db.none(sqlDelete, { id });
