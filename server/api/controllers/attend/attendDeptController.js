const ModelAttendDept = require('../../models/attend/zkAccess/ModelAttendDept');

exports.list = function(req, res) {
  ModelAttendDept.list().then(data => res.json(data));
};
