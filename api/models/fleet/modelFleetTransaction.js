// MODEL fleet_transaction
const db = require('../../services/postgres/db');

const sqlList = `
SELECT *
  FROM fleet.fleet_transaction_joined
  WHERE tax_year = 0
`;

const sqlInsert = `
INSERT INTO fleet.fleet_transaction(
            tax_year, tax_month, transaction_date, process_date, registration, 
            cost_centre_id, vehicle_id, driver_id, fims_voucher_id, merchant_id, 
            amount, jdata, transaction_type_id, description, vat_amount, 
            invoice_number)
    VALUES ($[tax_year], $[tax_month], $[transaction_date], $[process_date], $[registration], 
            $[cost_centre_id], $[vehicle_id], $[driver_id], $[fims_voucher_id], $[merchant_id], 
            $[amount], $[jdata], $[transaction_type_id], $[description], $[vat_amount], 
            $[invoice_number])
ON CONFLICT ON CONSTRAINT fleet_transaction_fims_voucher_id_invoice_number_key DO UPDATE
    SET tax_year=$[tax_year], tax_month=$[tax_month], transaction_date=$[transaction_date],
            process_date=$[process_date], registration=$[registration],
            cost_centre_id=$[cost_centre_id], vehicle_id=$[vehicle_id], driver_id=$[driver_id],
            fims_voucher_id=$[fims_voucher_id], merchant_id=$[merchant_id], amount=$[amount],
            jdata=$[jdata], transaction_type_id=$[transaction_type_id], description=$[description],
            vat_amount=$[vat_amount], invoice_number=$[invoice_number]

 RETURNING *
`;

exports.list = params => db.many(sqlList, params);

exports.insert = fleetTransaction => db.one(sqlInsert, fleetTransaction);

exports.insertBatch = data =>
  db.task(t => t.batch(data.map(d => t.one(sqlInsert, d))));

/*
 */