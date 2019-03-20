const Promise = require('bluebird');
// var aWait = require('asyncawait/await');
// var async = require('asyncawait/async');

const db = require('../../services/postgres/db');

const ModelFimsPeriod = require('../../models/fleet/ModelFimsPeriod');
const ModelFimsVoucher = require('../../models/fleet/ModelFimsVoucher');
const ModelFleetTransaction = require('../../models/fleet/ModelFleetTransaction');
const ModelVehicle = require('../../models/fleet/ModelVehicle');
const ModelDriver = require('../../models/fleet/ModelDriver');
const ModelMerchant = require('../../models/fleet/ModelMerchant');
const ModelTransactionType = require('../../models/fleet/ModelTransactionType');
const ModelCostCentre = require('../../models/fleet/ModelCostCentre');
const ModelTransactionTypeCostCentre = require('../../models/fleet/ModelTransactionTypeCostCentre');
const ModelVehicleCcg = require('../../models/fleet/ModelVehicleCcg');

exports.list_fims_periods = (req, res) => {
  ModelFimsPeriod.list()
    .then(fimsPeriods => {
      res.json({ status: 'ok', fimsPeriods });
    })
    .catch(error => res.json({ status: 'error', error }));
};

exports.post_fims_batch = (req, res) => {
  const { fimsBatch } = req.body;
  const cutOffDate = fimsBatch[0].cut_off_date;
  const cal_year = cutOffDate === 'Current' ? 0 : cutOffDate.substr(0, 4);
  const cal_month = cutOffDate === 'Current' ? 0 : cutOffDate.substr(4, 2);
  ModelFimsPeriod.requestFimsPeriod(cal_year, cal_month).then(fimsPeriod => {
    fimsPeriod.rows_received = 0;
    fimsPeriod.batch_total = 0;
    Promise.each(fimsBatch, (voucher, idx) => {
      fimsPeriod.rows_received++;
      fimsPeriod.batch_total +=
        Math.round(parseFloat(voucher.amount) * 100) / 100;
      ModelFimsVoucher.upsertFimsVoucher({
        ...voucher,
        batch_index: idx + 1,
        fims_period_id: fimsPeriod.id
      });
    }).then(() => {
      fimsPeriod.when_received = new Date();
      ModelFimsPeriod.updateFimsPeriod(fimsPeriod).then(fimsPeriod =>
        res.json(fimsPeriod)
      );
    });
  });
};

exports.remove_fims_period = (req, res) => {
  const { id } = req.params;
  ModelFimsVoucher.removeByFimsPeriod(id).then(() =>
    ModelFimsPeriod.removeFimsPeriod(id).then(data => res.json(data))
  );
};

// exports.import_fims_period = (req, res) => {
//   const { id } = req.params;
//   ModelFimsPeriod.get(id)
//     .then(fimsPeriod => null)
// }
function* getCostCentre() {}
/*
 load fims_vouchers, then one at a time, asynchronously:
   - load required foreign keys from relevant
   - insert transaction
   - return transaction

 */
exports.import_fims_period = (req, res) => {
  const { id } = req.params;
  console.log(` rec req import_fims_period with id ${id}`);
  ModelFimsPeriod.get(id).then(fimsPeriod =>
    //the .each here ensures async exec
    ModelFimsVoucher.listFimsVouchersByFimsPeriod(fimsPeriod.id)
      .each(
        // async function so await can be used
        async fimsVoucher => {
          console.log(` ..fimsVoucher id ${fimsVoucher.id}`);
          // do something with warnings
          const vehicle = await ModelVehicle.getOrInsert(
            fimsVoucher.vehicle_description,
            fimsVoucher.registration
          );
          console.log(` ...vehicle id ${vehicle.id}`);

          const driver = await ModelDriver.getOrInsert(
            fimsVoucher.driver,
            fimsVoucher.registration
          );
          console.log(` ...driver id ${driver.id}`);

          const merchant = await ModelMerchant.getOrInsert(
            fimsVoucher.merchant_name,
            fimsVoucher.merchant_town,
            fimsVoucher.oil_company
          );
          console.log(` ...merchant id ${merchant.id}`);

          const transactionType = await ModelTransactionType.getOrInsert(
            fimsVoucher.purchase_description,
            new Date(
              parseInt(fimsVoucher.transaction_date.substr(0, 4)),
              parseInt(fimsVoucher.transaction_date.substr(4, 2)) - 1,
              parseInt(fimsVoucher.transaction_date.substr(6, 2))
            )
          );
          console.log(` ...transactionType id ${transactionType.id}`);

          const vehicleCcs = await ModelVehicleCcg.getCcgIdByVehicle(
            vehicle.id
          ).then(
            async vCcg =>
              new Set(await ModelCostCentre.listCcsByCcg(vCcg).each(cc => cc))
          );
          const tranTypeCcs = new Set(
            await ModelTransactionTypeCostCentre.listCCIdsByTransactionType(
              transactionType.id
            )
          );

          let costCentreId = new Set(
            [...vehicleCcs].filter(x => tranTypeCcs.has(x))
          )
            .values()
            .next().value;
          console.log(` ...costCentreId ${costCentreId}`);

          let fleetTransaction = {
            tax_year:
              fimsPeriod.cal_year === 0
                ? 0
                : fimsPeriod.cal_month <= 2
                  ? fimsPeriod.cal_year
                  : fimsPeriod.cal_year + 1,
            tax_month: fimsPeriod.cal_month,
            transaction_date: new Date(
              parseInt(fimsVoucher.transaction_date.substr(0, 4)),
              parseInt(fimsVoucher.transaction_date.substr(4, 2)) - 1,
              parseInt(fimsVoucher.transaction_date.substr(6, 2))
            ),
            transaction_time: fimsVoucher.transaction_time,
            process_date: new Date(
              parseInt(fimsVoucher.process_date.substr(0, 4)),
              parseInt(fimsVoucher.process_date.substr(4, 2)) - 1,
              parseInt(fimsVoucher.process_date.substr(6, 2))
            ),
            registration: fimsVoucher.registration,
            cost_centre_id: costCentreId,
            vehicle_id: vehicle.id,
            driver_id: driver.id,
            fims_voucher_id: fimsVoucher.id,
            merchant_id: merchant.id,
            amount: Math.round(parseFloat(fimsVoucher.amount) * 100) / 100,
            transaction_type_id: transactionType.id,
            description: `${driver.name} in ${
              fimsVoucher.registration
            } buys ${fimsVoucher.purchase_description.toProperCase()} at ${
              merchant.name
            } in ${merchant.town}`,
            vat_amount:
              transactionType.vat_rate === 0
                ? 0
                : Math.round(
                    (parseFloat(fimsVoucher.amount) -
                      parseFloat(fimsVoucher.amount) /
                        (transactionType.vat_rate + 1)) *
                      100
                  ) / 100,
            invoice_number: `fims ${fimsPeriod.cal_year}-${
              fimsPeriod.cal_month
            }-${fimsVoucher.batch_index}`,
            odometer: fimsVoucher.odometer,
            fuel_litres:
              parseFloat(fimsVoucher.fuel_litres) > 0
                ? parseFloat(fimsVoucher.fuel_litres)
                : null,
            oil_litres:
              parseFloat(fimsVoucher.oil_litres) > 0
                ? parseFloat(fimsVoucher.oil_litres)
                : null,
            jdata: {}
          };
          // console.log(fleetTransaction);
          return ModelFleetTransaction.insert(fleetTransaction);
        }
      )
      .then(fTrans =>
        fTrans.reduce(
          (fimsP, fTran) => ({
            ...fimsP,
            transactions_total:
              fimsP.transactions_total + Math.round(fTran.amount * 100),
            rows_transactions: fimsP.rows_transactions + 1
          }),
          {
            ...fimsPeriod,
            transactions_total: 0,
            rows_transactions: 0
          }
        )
      )
      .then(fimsP => ({
        ...fimsP,
        transactions_total: fimsP.transactions_total / 100,
        when_imported: new Date()
      }))
      .then(fimsP =>
        ModelFimsPeriod.updateFimsPeriod(fimsP).then(fimsP =>
          res.json({ status: 'ok', fimsPeriod: fimsP })
        )
      )
  );
};
/*
exports.import_fims_period = (req, res) => {
  const { id } = req.params;
  ModelFimsPeriod.get(id)
    .then(fimsPeriod =>
      ModelFimsVoucher.listFimsVouchersByFimsPeriod(fimsPeriod.id)
        .each(fimsVoucher =>
          ModelVehicle.getOrInsert(
            fimsVoucher.vehicle_description,
            fimsVoucher.registration
          ).then(vehicle =>
            ModelDriver.getOrInsert(
              fimsVoucher.driver,
              fimsVoucher.registration
            ).then(driver =>
              ModelMerchant.getOrInsert(
                fimsVoucher.merchant_name,
                fimsVoucher.merchant_town,
                fimsVoucher.oil_company
              ).then(merchant =>
                ModelTransactionType.getOrInsert(
                  fimsVoucher.purchase_description,
                  new Date(
                    parseInt(fimsVoucher.transaction_date.substr(0, 4)),
                    parseInt(fimsVoucher.transaction_date.substr(4, 2)) - 1,
                    parseInt(fimsVoucher.transaction_date.substr(6, 2))
                  )
                ).then(transactionType => {
                  let fleetTransaction = {
                    vat_amount:
                      transactionType.vat_rate === 0
                        ? 0
                        : Math.round(
                            (parseFloat(fimsVoucher.amount) -
                              parseFloat(fimsVoucher.amount) /
                                (transactionType.vat_rate + 1)) *
                              100
                          ) / 100,
                    registration: fimsVoucher.registration,
                    description: `${driver.name.toProperCase()} in ${
                      fimsVoucher.registration
                    } buys ${fimsVoucher.purchase_description.toProperCase()} at ${
                      merchant.name
                    } in ${merchant.town}`,
                    odometer: fimsVoucher.odometer,
                    transaction_date: new Date(
                      parseInt(fimsVoucher.transaction_date.substr(0, 4)),
                      parseInt(fimsVoucher.transaction_date.substr(4, 2)) - 1,
                      parseInt(fimsVoucher.transaction_date.substr(6, 2))
                    ),
                    process_date: new Date(
                      parseInt(fimsVoucher.process_date.substr(0, 4)),
                      parseInt(fimsVoucher.process_date.substr(4, 2)) - 1,
                      parseInt(fimsVoucher.process_date.substr(6, 2))
                    ),
                    vehicle_id: vehicle.id,
                    driver_id: driver.id,
                    merchant_id: merchant.id,
                    transaction_type_id: transactionType.id
                  };
                  console.log(fleetTransaction);
                  return fleetTransaction;
                })
              )
            )
          )
        )
        .then(res => {
          //console.log('result', res);
        })
        .catch(error => {
          console.log(error);
        })
    )
    .catch(error => res.json({ status: 'error', error }));
};
*/
/*

exports.import_fims_period = (req, res) => {
  const { id } = req.params;
  db
    .one('SELECT * FROM fleet.fims_period WHERE id = $1', id)
    .then(({ ...fimsPeriod }) => {
      fimsPeriod.rows_transactions = 0;
      fimsPeriod.transactions_total = 0;
      let tranData = [];
      db
        .each(
          'SELECT * FROM fleet.import_fleet_transaction_from_fims_voucher($1) ftran',
          id,
          ({ ...row }) => {
            const fTran = row.ftran;
            fimsPeriod.rows_transactions++;
            fimsPeriod.transactions_total += fTran.amount;
            tranData.push(fTran);
          }
        )
        .then(() => {
          ModelFleetTransaction.insertBatch(tranData).then(e => {
            fimsPeriod.when_imported = new Date();
            ModelFimsPeriod.updateFimsPeriod(fimsPeriod).then(data =>
              ModelFimsPeriod.get(data.id).then(data =>
                res.json({ status: 'imported', fimsPeriod: data })
              )
            );
          });
        });
    });
};

exports.import_fims_period = (req, res) => {
  const { id } = req.params;
  db
    .task('import-fims-period', function*(t) {
      // firts get fimsPeriod by id
      const fimsPeriod = {
        ...(yield t.one('SELECT * FROM fleet.fims_period WHERE id = $1', id))
      };
      // zero count and sum
      fimsPeriod.rows_transactions = 0;
      fimsPeriod.transactions_total = 0;
      // then for each transactions from fims batch with...
      t
        .each(
          'SELECT * FROM fleet.import_fleet_transaction_from_fims_voucher($1)',
          id,
          ({ ...row }) => {
            const fTran = row.import_fleet_transaction_from_fims_voucher;
            fimsPeriod.rows_transactions++;
            fimsPeriod.transactions_total += fTran.amount;
            //t.one(ModelFleetTransaction.sqlInsert, fTran);
          }
        )
        .then(fimsPeriod => {
          console.log(fimsPeriod);
          res.json(fimsPeriod);
        });
      // ImpFleetTran[0].import_fleet_transaction_from_fims_voucher.map(fTran => {
      //   const resIns = yield t.one(ModelFleetTransaction.sqlInsert, fTran)
      // });

      return fimsPeriod;
    })
    .then(fimsPeriod => {});
};
*/
// ModelFimsPeriod.get(id).then(fimsPeriod => {
// db
//   .many(
//     'SELECT * FROM fleet.import_fleet_transaction_from_fims_voucher($[id])',
//     { id: fimsPeriod.id }
//   )
//   .then(rwsfleetTransactions => {
//     Promise.each(
//       rwsfleetTransactions[0].import_fleet_transaction_from_fims_voucher,
//       (fleetTransaction, idx) => {
//         console.log(fleetTransaction.amount, fleetTransaction.invoice_number);
//         ModelFleetTransaction.insert(fleetTransaction).then(() => {
//           fimsPeriod.rows_transactions++;
//           fimsPeriod.transactions_total += fleetTransaction.amount;
//         });
//       }
//     ).then(() => {
//       fimsPeriod.transactions_total =
//         parseInt(fimsPeriod.transactions_total * 100) / 100;
//       fimsPeriod.when_imported = new Date();
//       //FimsPeriod.updateFimsPeriod(fimsPeriod);
//       res.json(fimsPeriod);
//     });
//   });
//   });
// };
