const fimsPeriod = require('../../models/fleet/fimsPeriod');

exports.list = (req, res) => {
  fimsPeriod
    .list()
    .then(data => res.json(data))
    .catch(e => res.json(e));
};

exports.post_fims_batch = (req, res) => {
  const { fimsBatch } = req.body;
  const cutOffDate = fimsBatch[0].cut_off_date;
  const cal_year = cutOffDatee === 'Current' ? 0 : cutOffDatee.substr(0, 4);
  const cal_month = cutOffDatee === 'Current' ? 0 : cutOffDatee.substr(4, 2);
  fimsPeriod.upsertFimsPeriod(cal_year, cal_month).then(fimsPeriod => {

  });
};
