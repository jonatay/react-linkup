const Promise = require('bluebird');
var aWait = require('asyncawait/await');
var async = require('asyncawait/async');

const FimsPeriod = require('../../models/fleet/modelFimsPeriod');
const FimsVoucher = require('../../models/fleet/modelFimsVoucher');

exports.list_fims_periods = (req, res) => {
  FimsPeriod.list()
    .then(data => res.json(data))
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
      FimsPeriod.updateFimsPeriod(fimsPeriod).then(fimsPeriod =>
        res.json(fimsPeriod)
      );
    });
  });
};

exports.remove_fims_period = (req, res) => {
  const { id } = req.params;
  const clearVouchers = async(() => {
    aWait(FimsVoucher.removeByFimsPeriod(id));
  });
  clearVouchers();
  FimsPeriod.removeFimsPeriod(id).then(data => res.json(data));
};

exports.import_fims_period = (req, res) => {
  const { id } = req.params;
  FimsPeriod.getIdFimsPeriod(id).then(data => res.json(data));
};
