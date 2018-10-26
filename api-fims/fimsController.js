const Promise = require('bluebird');

const { getNext, postBatchImport } = require('./model-fims-period');
// const { postBatch } = require('./model-fims-voucher');
const ModelFimsPeriod = require('../api/models/fleet/ModelFimsPeriod');
const ModelFimsVoucher = require('../api/models/fleet/ModelFimsVoucher');

module.exports.get_period = (req, res) => {
  getNext((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports.post_batch_import = (req, res) => {
  // console.log(req.body.data);
  const { reqParam, vouchers: fimsBatch } = JSON.parse(req.body.data); //req.body;
  console.log(reqParam);
  const cutOffDate = fimsBatch[0].cut_off_date;
  console.log(
    `got fimsVoucher Batch ${fimsBatch.length} long, with period: ${cutOffDate}`
  );
  const cal_year = cutOffDate === 'Current' ? 0 : cutOffDate.substr(0, 4);
  const cal_month = cutOffDate === 'Current' ? 0 : cutOffDate.substr(4, 2);
  console.log(`cal_year: ${cal_year}, cal_month: ${cal_month}`);
  ModelFimsPeriod.requestFimsPeriod(cal_year, cal_month).then(fimsPeriod => {
    fimsPeriod.rows_received = 0;
    fimsPeriod.batch_total = 0;
    Promise.each(fimsBatch, (voucher, idx) => {
      fimsPeriod.rows_received++;
      fimsPeriod.batch_total +=
        Math.round(parseFloat(voucher.amount) * 100) / 100;
      console.log(voucher.transaction_time);
      ModelFimsVoucher.upsertFimsVoucher({
        ...voucher,
        batch_index: idx + 1,
        fims_period_id: fimsPeriod.id
      });
    }).then(() => {
      fimsPeriod.when_received = new Date();
      ModelFimsPeriod.updateFimsPeriod(fimsPeriod).then(fimsPeriod =>
        getNext((err, result) => {
          if (err) {
            res.json(err);
          } else {
            res.json(result);
          }
        })
      );
    });
  });
};
