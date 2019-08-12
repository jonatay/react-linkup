// MODEL fims voucher
const db = require('../../services/postgres/db');

const sqlListFimsVouchers = `
SELECT * FROM fleet.fims_voucher
`;

const sqlListFimsVouchersByFimsPeriod = `
SELECT * FROM fleet.fims_voucher
WHERE fims_period_id = $[fims_period_id]
`;

const sqlUpsertFimsVoucher = `
INSERT INTO fleet.fims_voucher(
    cut_off_date, registration, batch, driver, vehicle_description, 
    transaction_date, transaction_time, process_date, merchant_name, merchant_town, 
    oil_company, odometer, fuel_litres, oil_litres, private_usage, 
    warnings, purchase_description, toll_lane, toll_vehicle_class, 
    toll_transaction_type, toll_match_indicator, amount, toll_discount, batch_index, fims_period_id)
  VALUES (
    $[cut_off_date], $[registration], $[batch], $[driver], $[vehicle_description], 
    $[transaction_date], $[transaction_time],$[process_date], $[merchant_name], $[merchant_town], 
    $[oil_company], $[odometer], $[fuel_litres], $[oil_litres], $[private_usage], 
    $[warnings], $[purchase_description], $[toll_lane], $[toll_vehicle_class], 
    $[toll_transaction_type], $[toll_match_indicator], $[amount], $[toll_discount], $[batch_index], $[fims_period_id])
ON CONFLICT ON CONSTRAINT fims_voucher_fims_period_id_batch_index_key DO UPDATE 
SET cut_off_date=$[cut_off_date], registration=$[registration], 
     batch=$[batch], driver=$[driver], vehicle_description=$[vehicle_description], 
     transaction_date=$[transaction_date], transaction_time=$[transaction_time], 
     process_date=$[process_date], merchant_name=$[merchant_name], merchant_town=$[merchant_town], 
     oil_company=$[oil_company], odometer=$[odometer], fuel_litres=$[fuel_litres], oil_litres=$[oil_litres], 
     private_usage=$[private_usage], warnings=$[warnings], purchase_description=$[purchase_description], 
     toll_lane=$[toll_lane], toll_vehicle_class=$[toll_vehicle_class], toll_transaction_type=$[toll_transaction_type], 
     toll_match_indicator=$[toll_match_indicator], amount=$[amount], toll_discount=$[toll_discount]
RETURNING *
`;

const sqlRemoveTranByFimsPeriod = `
DELETE FROM fleet.fleet_transaction 
   WHERE fims_voucher_id IN 
     ( SELECT id FROM fleet.fims_voucher WHERE fims_period_id = $[id] )
`;

const sqlRemoveByFimsPeriod = `
DELETE FROM fleet.fims_voucher
WHERE fims_period_id = $[id]
`;

exports.list = () => {
  return db.any(sqlListFimsVouchers);
};

exports.listFimsVouchersByFimsPeriod = fims_period_id =>
  db.any(sqlListFimsVouchersByFimsPeriod, { fims_period_id });

exports.upsertFimsVoucher = fimsVoucher => {
  return db.one(sqlUpsertFimsVoucher, { ...fimsVoucher });
};

exports.removeByFimsPeriod = id =>
  db
    .none(sqlRemoveTranByFimsPeriod, { id })
    .then(() => db.none(sqlRemoveByFimsPeriod, { id }));
