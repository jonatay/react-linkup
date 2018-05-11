// MODEL fims period
const db = require('../../services/postgres/db');

const sqlListFimsPeriods = `
SELECT fp.*, sum(ft.amount) AS check_total FROM fleet.fims_period fp
LEFT JOIN fleet.fims_voucher fv ON fv.fims_period_id = fp.id
LEFT JOIN fleet.fleet_transaction ft ON ft.fims_voucher_id = fv.id
GROUP BY fp.id
`;

const sqlGet = `
SELECT fp.*, sum(ft.amount) AS check_total FROM fleet.fims_period fp
LEFT JOIN fleet.fims_voucher fv ON fv.fims_period_id = fp.id
LEFT JOIN fleet.fleet_transaction ft ON ft.fims_voucher_id = fv.id
WHERE fp.id =$[id]
GROUP BY fp.id
`;

const sqlRequestFimsPeriod = `
INSERT INTO fleet.fims_period (cal_year, cal_month) VALUES ($[cal_year],$[cal_month])
ON CONFLICT ON CONSTRAINT fims_period_cal_year_cal_month_key DO UPDATE 
SET when_received = CURRENT_TIMESTAMP 
RETURNING *
`;

const sqlUpdateFimsPeriod = `
UPDATE fleet.fims_period 
 SET cal_year=$[cal_year], cal_month=$[cal_month], when_received=$[when_received], 
      rows_received=$[rows_received], must_refresh=$[must_refresh], account=$[account], 
      batch_total=$[batch_total], jdata=$[jdata], rows_transactions=$[rows_transactions], 
      transactions_total=$[transactions_total], when_imported=$[when_imported] 
WHERE id = $[id]
RETURNING *
`;

const sqlRemovefimsPeriod = `
DELETE FROM fleet.fims_period WHERE id = $[id]
RETURNING id
`;

exports.list = () => {
  return db.any(sqlListFimsPeriods);
};

exports.get = id => db.one(sqlGet, { id });

exports.requestFimsPeriod = (cal_year, cal_month) =>
  db.one(sqlRequestFimsPeriod, { cal_year, cal_month });

exports.updateFimsPeriod = fimsPeriod =>
  db.one(sqlUpdateFimsPeriod, { ...fimsPeriod });

exports.removeFimsPeriod = id => db.one(sqlRemovefimsPeriod, { id });
