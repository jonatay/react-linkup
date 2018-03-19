const Promise = require('bluebird');
var aWait = require('asyncawait/await');
var async = require('asyncawait/async');

const db = require('../../services/postgres/db');

const ModelFimsPeriod = require('../../models/fleet/modelFimsPeriod');
const ModelFimsVoucher = require('../../models/fleet/modelFimsVoucher');
const ModelFleetTransaction = require('../../models/fleet/modelFleetTransaction');

exports.list_fims_periods = (req, res) => {
  ModelFimsPeriod.list()
    .then(data => {
      res.json(data);
    })
    .catch(e => res.json(e));
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
            ModelFimsPeriod.updateFimsPeriod(fimsPeriod);
            res.json(fimsPeriod);
          });
        });
    });
};

/*
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
// ModelFimsPeriod.getIdFimsPeriod(id).then(fimsPeriod => {
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
