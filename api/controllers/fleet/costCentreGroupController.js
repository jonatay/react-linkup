const db = require('../../services/postgres/db');

const sqlGetCostCentreGroups = `
SELECT * FROM fleet.cost_centre_group
`;

exports.list = (req, res) => {
  db
    .any(sqlGetCostCentreGroups)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};
