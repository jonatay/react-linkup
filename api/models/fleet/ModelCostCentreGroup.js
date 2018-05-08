const db = require('../../services/postgres/db');

const sqlList = `
SELECT * FROM fleet.cost_centre_group
`;

const sqlUpdate = `
UPDATE fleet.cost_centre_group
   SET name=$[name], description=$[description]
 WHERE id=$[id]
 RETURNING *
`;

exports.list = () => db.any(sqlList);

exports.update = (id, data) => db.one(sqlUpdate, { id, ...data });
