const ModelAttendUser = require('../../models/attend/zkAccess/ModelAttendUser');

exports.list = function(req, res) {
  ModelAttendUser.list().then(data => res.json(data));
};
