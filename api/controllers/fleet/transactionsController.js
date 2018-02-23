const db = require('../../services/postgres/db');

const sqlGetTransaction = `
SELECT * FROM fleet.fleet_transactions
`;

exports.list = (req, res) => {
  db
    .any(sqlGetTransaction)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};
