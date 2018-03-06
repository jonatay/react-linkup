const db = require('../../services/postgres/db');

const sqlGetTranTypes = `
SELECT * FROM fleet.transaction_type
`;

exports.list = (req, res) => {
  db
    .any(sqlGetTranTypes)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};
