const db = require('../../services/postgres/db');

const sqlGetFimsPeriods = `
SELECT * FROM fleet.fims_period
`;

exports.list = (req, res) => {
  db
    .any(sqlGetFimsPeriods)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};

exports.post_fims_batch = (req, res) => {
  const {fimsBatch} = req.body;
  console.log(req.body);
};
