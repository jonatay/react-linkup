const ModelAttendUser = require('../../models/access/zkAccess/ModelAttendUser');

exports.list = function(req, res) {
  ModelAttendUser.list().then(data => res.json(data));
};
