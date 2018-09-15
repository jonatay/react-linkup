const ModelUser = require('../../models/access/zkAccess/ModelUser');

exports.list = function(req, res) {
  ModelUser.list().then(data => res.json(data));
};
