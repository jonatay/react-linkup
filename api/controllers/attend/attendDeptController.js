const ModelAttendDept = require('../../models/access/zkAccess/ModelAttendDept');

exports.list = function(req, res) {
  ModelAttendDept.list().then(data => res.json(data));
};
