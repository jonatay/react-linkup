// MODEL fims period
const db = require('../../services/postgres/db');

const sqlListFimsPeriods = `
SELECT * FROM fleet.fims_period
`;

const sqlGetIdFimsPeriod = `
SELECT * FROM fleet.fims_period
WHERE id =$[id]
`;

const sqlRequestFimsPeriod = `
INSERT INTO fleet.fims_period (cal_year, cal_month) VALUES ($[cal_year],$[cal_month])
ON CONFLICT ON CONSTRAINT fims_period_cal_year_cal_month_key DO UPDATE 
SET when_received = CURRENT_TIMESTAMP 
RETURNING *
`;

const sqlUpdateFimsPeriod = `
UPDATE fleet.fims_period 
 SET when_received=$[when_received], rows_received=$[rows_received], 
 batch_total=$[batch_total], jdata=$[jdata]
WHERE id = $[id]
RETURNING *
`;

const sqlRemovefimsPeriod = `
DELETE FROM fleet.fims_period CASCADE WHERE id = $[id]
RETURNING id
`;

exports.list = () => {
  return db.any(sqlListFimsPeriods);
};

exports.getIdFimsPeriod = id => db.one(sqlGetIdFimsPeriod, { id });

exports.requestFimsPeriod = (cal_year, cal_month) =>
  db.one(sqlRequestFimsPeriod, { cal_year, cal_month });

exports.updateFimsPeriod = fimsPeriod =>
  db.one(sqlUpdateFimsPeriod, { ...fimsPeriod });

exports.removeFimsPeriod = id => db.one(sqlRemovefimsPeriod, { id });
