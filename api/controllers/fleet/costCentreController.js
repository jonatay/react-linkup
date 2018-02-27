const db = require('../../services/postgres/db');

const sqlGetCostCentres = `
SELECT cc.*, ccg.name AS cost_centre_group FROM fleet.cost_centre cc
LEFT JOIN fleet.cost_centre_group ccg ON ccg.id = cc.cost_centre_group_id
`;

exports.list = (req, res) => {
  db
    .any(sqlGetCostCentres)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};
