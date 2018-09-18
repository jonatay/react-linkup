const ModelAttendLog = require('../../models/access/zkAccess/ModelAttendLog');
const moment = require('moment');

exports.list = function(req, res) {
  const params = JSON.parse(req.params.params);
  console.log(params);
  ModelAttendLog.list({
    dateFrom:
      params.dateRange[0] ||
      moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD'),
    dateTo: params.dateRange[1] || moment().format('YYYY-MM-DD')
  }).then(data => res.json(data));
};
