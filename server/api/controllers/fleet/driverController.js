const db = require('../../services/postgres/db');

const sqlGetDrivers = `
SELECT * FROM fleet.driver
`;

exports.list = (req, res) => {
  db
    .any(sqlGetDrivers)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};
