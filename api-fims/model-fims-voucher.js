const Promise = require('bluebird');
var aWait = require('asyncawait/await');
const db = require('../api/services/postgres/db');

const sqlSelectUnique = `
SELECT id FROM fleet.fims_voucher WHERE
    registration=$[registration] AND
    batch=$[batch] AND
    transaction_date=$[transaction_date] AND
    process_date=$[process_date] AND
    odometer=$[odometer] AND
    purchase_description=$[purchase_description] AND
    amount=$[amount] AND
    toll_lane=$[toll_lane] AND
    batch_index=$[batch_index]
`;

const sqlClearProvisionalTrans = `
DELETE FROM fleet.fims_voucher WHERE request_period = 0 CASCASE;
`;

const sqlInsertVoucher = `
INSERT INTO fleet.fims_voucher(
    cut_off_date, account_number, account_name, cost_centre, 
    cost_centre_name, registration, batch, driver, vehicle_description, 
    transaction_date, process_date, merchant_name, merchant_town, 
    oil_company, odometer, fuel_litres, oil_litres, private_usage, 
    warnings, purchase_description, toll_lane, toll_vehicle_class, 
    toll_transaction_type, toll_match_indicator, amount, toll_discount, batch_index, request_period)
  VALUES (
    $[cut_off_date], $[account_number], $[account_name], $[cost_centre], 
    $[cost_centre_name], $[registration], $[batch], $[driver], $[vehicle_description], 
    $[transaction_date], $[process_date], $[merchant_name], $[merchant_town], 
    $[oil_company], $[odometer], $[fuel_litres], $[oil_litres], $[private_usage], 
    $[warnings], $[purchase_description], $[toll_lane], $[toll_vehicle_class], 
    $[toll_transaction_type], $[toll_match_indicator], $[amount], $[toll_discount], $[batch_index], $[request_period])
`;

const sqlUpdateVoucher = `
UPDATE fleet.fims_voucher
     SET cut_off_date=$[cut_off_date], account_number=$[account_number], account_name=$[account_name], 
     cost_centre=$[cost_centre], cost_centre_name=$[cost_centre_name], registration=$[registration], 
     batch=$[batch], driver=$[driver], vehicle_description=$[vehicle_description], transaction_date=$[transaction_date], 
     process_date=$[process_date], merchant_name=$[merchant_name], merchant_town=$[merchant_town], 
     oil_company=$[oil_company], odometer=$[odometer], fuel_litres=$[fuel_litres], oil_litres=$[oil_litres], 
     private_usage=$[private_usage], warnings=$[warnings], purchase_description=$[purchase_description], 
     toll_lane=$[toll_lane], toll_vehicle_class=$[toll_vehicle_class], toll_transaction_type=$[toll_transaction_type], 
     toll_match_indicator=$[toll_match_indicator], amount=$[amount], toll_discount=$[toll_discount],
     batch_index=$[batch_index], request_period=$[request_period]
  WHERE id=$[id]
`;

module.exports.postBatch = (data, callback) => {
  const vouchers = data.vouchers;
  const reqParam = data.reqParam;
  console.log(
    `...got rows! actual:${vouchers.length} reported:${
      reqParam.rows
    } - for period ${reqParam.reqPeriod}`
  );

  // clear out provisional
  if (reqParam.reqPeriod === 0) {
    clear = () => {
      aWait(db.any(sqlClearProvisionalTrans));
    };
    clear();
  }

  let cntProccessed = 0;
  //loop through batch
  Promise.each(vouchers, (voucher, idx) => {
    cntProccessed++;
    voucher.batch_index = idx;
    voucher.request_period = reqParam.reqPeriod;
    if (voucher.registration) {
      db
        .any(sqlSelectUnique, voucher)
        .then(data => {
          if (data[0]) {
            //matching voucher present - UPD
            voucher.id = data[0].id;
            db
              .any(sqlUpdateVoucher, voucher)
              .then(data => {
                //cntUpd++;
                             })
              .catch(err => {
                callback(err);
              });
          } else {
            //no voucher match INSERT
            db
              .any(sqlInsertVoucher, voucher)
              .then(data => {
                //cntIns++;
              })
              .catch(err => {
                callback(err);
              });
          }
        })
        .catch(err => {
          // callback(err);
          throw err;
        });
    }
  })
    .then((ins, upd) => {
      console.log(`..done rows! processed:${cntProccessed}`);
      callback(null, { status: 'ok', cntProccessed: cntProccessed });
    })
    .catch(err => {
      callback(err);
    });
};
