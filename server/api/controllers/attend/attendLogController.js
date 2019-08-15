const ModelAttendLog = require("../../models/attend/zkAccess/ModelAttendLog");
const moment = require("moment");

const pdfAttendList = require("../../pdf/attend/pdfAttendList");

exports.listTable = function(req, res) {
  const params = JSON.parse(req.params.params);
  console.log(params);
};

exports.list = function(req, res) {
  const params = JSON.parse(req.params.params);
  console.log(params);
  ModelAttendLog.list({
    dateFrom:
      params.dateRange[0] ||
      moment()
        .subtract(7, "days")
        .format("YYYY-MM-DD"),
    dateTo: params.dateRange[1] || moment().format("YYYY-MM-DD")
  }).then(data => res.json(data));
};

exports.pdf = pdfAttendList.report;
