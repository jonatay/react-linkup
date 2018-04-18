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

const sqlInsert = `
INSERT INTO fleet.fleet_transaction(
            tax_year, tax_month, transaction_date, process_date, registration, 
            cost_centre_id, vehicle_id, driver_id, fims_voucher_id, merchant_id, 
            amount, jdata, transaction_type_id, description, vat_amount, 
            invoice_number, odometer)
    VALUES ($[tax_year], $[tax_month], $[transaction_date], $[process_date], $[registration], 
            $[cost_centre_id], $[vehicle_id], $[driver_id], $[fims_voucher_id], $[merchant_id], 
            $[amount], $[jdata], $[transaction_type_id], $[description], $[vat_amount], 
            $[invoice_number], $[odometer])
ON CONFLICT ON CONSTRAINT fleet_transaction_fims_voucher_id_invoice_number_key DO UPDATE
    SET tax_year=$[tax_year], tax_month=$[tax_month], transaction_date=$[transaction_date],
            process_date=$[process_date], registration=$[registration],
            cost_centre_id=$[cost_centre_id], vehicle_id=$[vehicle_id], driver_id=$[driver_id],
            fims_voucher_id=$[fims_voucher_id], merchant_id=$[merchant_id], amount=$[amount],
            jdata=$[jdata], transaction_type_id=$[transaction_type_id], description=$[description],
            vat_amount=$[vat_amount], invoice_number=$[invoice_number], odometer=$[odometer]

 RETURNING *
`;

exports.list = params =>
  params.dateRange && params.dateRange.length === 2
    ? db.many(sqlListDateRange, params.dateRange)
    : db.many(sqlList, { from: moment().subtract(3, 'months'), to: moment() });

exports.insert = fleetTransaction => db.one(sqlInsert, fleetTransaction);

exports.insertBatch = data =>
  db.task(t => t.batch(data.map(d => t.one(sqlInsert, d))));

/*
WHERE transaction_date BETWEEN $[from] AND $[to]
 */
