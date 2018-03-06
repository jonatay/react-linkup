// MODEL fims period
const db = require('../../services/postgres/db');

const sqlListFimsPeriods = `
SELECT * FROM fleet.fims_period
`;

const sqlUpsertFimsPeriod = `
INSERT INTO fleet.fims_period (cal_year, cal_month) VALUES ($[cal_year],$[cal_month])
ON CONFLICT ON CONSTRAINT fims_period_cal_year_cal_month_key DO UPDATE SET when_received = CURRENT_TIMESTAMP 
RETURNING *
`;



exports.list = () => {
  return db.any(sqlListFimsPeriods);
};

exports.upsertFimsPeriod = (cal_year, cal_month) => {
  return db.any(sqlUpsertFimsPeriod, { cal_year, cal_month });
};
