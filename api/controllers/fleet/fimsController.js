const Promise = require('bluebird');
var aWait = require('asyncawait/await');
var async = require('asyncawait/async');

const FimsPeriod = require('../../models/fleet/modelFimsPeriod');
const FimsVoucher = require('../../models/fleet/modelFimsVoucher');
const FleetTransaction = require('../../models/fleet/modelFleetTransaction');

exports.list_fims_periods = (req, res) => {
  FimsPeriod.list()
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(e => res.json(e));
};

exports.post_fims_batch = (req, res) => {
  const { fimsBatch } = req.body;
  const cutOffDate = fimsBatch[0].cut_off_date;
  const cal_year = cutOffDate === 'Current' ? 0 : cutOffDate.substr(0, 4);
  const cal_month = cutOffDate === 'Current' ? 0 : cutOffDate.substr(4, 2);
  FimsPeriod.requestFimsPeriod(cal_year, cal_month).then(fimsPeriod => {
    fimsPeriod.rows_received = 0;
    fimsPeriod.batch_total = 0;
    Promise.each(fimsBatch, (voucher, idx) => {
      fimsPeriod.rows_received++;
      fimsPeriod.batch_total +=
        parseInt(parseFloat(voucher.amount) * 100) / 100;
      FimsVoucher.upsertFimsVoucher({
        ...voucher,
        batch_index: idx + 1,
        fims_period_id: fimsPeriod.id
      });
    }).then(() => {
      fimsPeriod.batch_total = parseInt(fimsPeriod.batch_total * 100) / 100;
      fimsPeriod.when_received = new Date();
      FimsPeriod.updateFimsPeriod(fimsPeriod).then(fimsPeriod =>
        res.json(fimsPeriod)
      );
    });
  });
};

exports.remove_fims_period = (req, res) => {
  const { id } = req.params;
  FimsVoucher.removeByFimsPeriod(id).then(() =>
    FimsPeriod.removeFimsPeriod(id).then(data => res.json(data))
  );
};

exports.import_fims_period = (req, res) => {
  const { id } = req.params;
  FimsPeriod.getIdFimsPeriod(id).then(fimsPeriod => {
    console.log(fimsPeriod);
    fimsPeriod.rows_transactions = 0;
    fimsPeriod.transactions_total = 0;
    FimsVoucher.listFimsVouchersByFimsPeriod(fimsPeriod.id).then(fimsVouchers =>
      Promise.each(fimsVouchers, (voucher, idx) => {
        fimsPeriod.rows_transactions++;
        fimsPeriod.transactions_total +=
          parseInt(parseFloat(voucher.amount) * 100) / 100;
        db
          .many(
            'SELECT * FROM fleet.import_fleet_transaction_from_fims_voucher($[id])',
            { id: voucher.id }
          )
          .then(rwsTran => {
            Promise.each((tran, idx) => {
              FleetTransaction.insert(tran);
            }).then(() => {
              fimsPeriod.transactions_total =
                parseInt(fimsPeriod.transactions_total * 100) / 100;
              fimsPeriod.when_imported = new Date();
              res.json(fimsPeriod);
            });
          });
      }).then(() => {})
    );
  });
};
