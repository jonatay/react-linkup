// MODEL fleet_transaction
const db = require('../../services/postgres/db');
const moment = require('moment');

const sqlList = `
SELECT *
  FROM fleet.fleet_transaction_joined
   WHERE transaction_date BETWEEN $[from] AND $[to]
`;

const sqlListDateRange = `
SELECT *
  FROM fleet.fleet_transaction_joined
  WHERE transaction_date BETWEEN $1 AND $2
`;

const sqlListTaxYear = `
SELECT * 
  FROM fleet.fleet_transaction_joined
  WHERE tax_year = $1
`

const sqlInsert = `
INSERT INTO fleet.fleet_transaction(
            tax_year, tax_month, transaction_date, transaction_time, process_date, registration, 
            cost_centre_id, vehicle_id, driver_id, fims_voucher_id, merchant_id, 
            amount, jdata, transaction_type_id, description, vat_amount, 
            invoice_number, odometer, fuel_litres, oil_litres)
    VALUES ($[tax_year], $[tax_month], $[transaction_date], $[transaction_time], $[process_date], 
            $[registration], 
            $[cost_centre_id], $[vehicle_id], $[driver_id], $[fims_voucher_id], $[merchant_id], 
            $[amount], $[jdata], $[transaction_type_id], $[description], $[vat_amount], 
            $[invoice_number], $[odometer], $[fuel_litres], $[oil_litres])
ON CONFLICT ON CONSTRAINT fleet_transaction_fims_voucher_id_invoice_number_key DO UPDATE
    SET tax_year=$[tax_year], tax_month=$[tax_month], transaction_date=$[transaction_date],
            transaction_time=$[transaction_time],
            process_date=$[process_date], registration=$[registration],
            cost_centre_id=$[cost_centre_id], vehicle_id=$[vehicle_id], driver_id=$[driver_id],
            fims_voucher_id=$[fims_voucher_id], merchant_id=$[merchant_id], amount=$[amount],
            jdata=$[jdata], transaction_type_id=$[transaction_type_id], description=$[description],
            vat_amount=$[vat_amount], invoice_number=$[invoice_number], 
            odometer=$[odometer], fuel_litres=$[fuel_litres], oil_litres=$[oil_litres]
 RETURNING *
`;

exports.list = params =>
  params.dateRange && params.dateRange.length === 2
    ? db.many(sqlListDateRange, params.dateRange)
    : params.taxYear ? db.many(sqlListTaxYear, [params.taxYear] )
    : db.many(sqlList, { from: moment().subtract(3, 'months'), to: moment() });

exports.insert = fleetTransaction => db.one(sqlInsert, fleetTransaction);

exports.insertBatch = data =>
  db.task(t => t.batch(data.map(d => t.one(sqlInsert, d))));

/*
WHERE transaction_date BETWEEN $[from] AND $[to]
 */


/*
-- View: fleet.fleet_transaction_joined

-- DROP VIEW fleet.fleet_transaction_joined;

CREATE OR REPLACE VIEW fleet.fleet_transaction_joined AS
 SELECT tt.name AS transaction_type,
    ccg.name AS cost_centre_group,
    cc.name AS cost_centre,
    v.name AS vehicle,
    d.name AS driver,
    m.name AS merchant,
    m.town,
    t.id,
    t.tax_year,
    t.tax_month,
    t.transaction_date,
    t.process_date,
    t.registration,
    t.cost_centre_id,
    t.vehicle_id,
    t.driver_id,
    t.fims_voucher_id,
    t.merchant_id,
    t.amount,
    t.jdata,
    t.transaction_type_id,
    t.description,
    t.vat_amount,
    t.invoice_number,
    t.odometer,
    t.fuel_litres,
    t.oil_litres,
    t.transaction_time
   FROM fleet.fleet_transaction t
     LEFT JOIN fleet.transaction_type tt ON tt.id = t.transaction_type_id
     LEFT JOIN fleet.cost_centre cc ON cc.id = t.cost_centre_id
     LEFT JOIN fleet.cost_centre_group ccg ON ccg.id = cc.cost_centre_group_id
     LEFT JOIN fleet.vehicle v ON v.id = t.vehicle_id
     LEFT JOIN fleet.driver d ON d.id = t.driver_id
     LEFT JOIN fleet.merchant m ON m.id = t.merchant_id;

ALTER TABLE fleet.fleet_transaction_joined
  OWNER TO postgres;
 */

/* TESTS

--SELECT SUM(amount), count(*) from fleet.fleet_transaction_joined WHERE tax_year = 2018 -- 1665906.95;3870
--SELECT SUM(amount), count(*) from fleet.fleet_transaction WHERE tax_year = 2018        -- 1665906.95;3870
-- sum(batch_total)                                                                      -- 1665906.95;12
--SELECT sum(batch_total), count(*) FROM fleet.fims_period WHERE (cal_year=2018 AND cal_month <= 2) OR (cal_year=2017 AND cal_month > 2)
--											 -- 1665906.95;3870
--SELECT sum(CAST(fv.amount AS Float)), count(*) FROM fleet.fims_period fp JOIN fleet.fims_voucher fv ON fv.fims_period_id = fp.id WHERE (fp.cal_year=2018 AND fp.cal_month <= 2) OR (fp.cal_year=2017 AND fp.cal_month > 2)
--											 -- 1665906.95;3870
SELECT sum(CAST(amount AS Float)), count(*) FROM fleet.fims_voucher WHERE cut_off_date!='Current' AND CAST(cut_off_date AS int) BETWEEN 201703 AND 201802
-- from spreadsheet totals -1665906.95
 */