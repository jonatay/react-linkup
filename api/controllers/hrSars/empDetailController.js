const Promise = require('bluebird');

const ModelEmpDetail = require('../../models/hrSars/ModelEmpDetail');

exports.list = (req, res) => {
  ModelEmpDetail.list().then(data =>
    res.json({ status: 'list', empDetails: data })
  );
};
