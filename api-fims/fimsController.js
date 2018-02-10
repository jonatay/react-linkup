const { getNext, postBatchImport } = require('./model-fims-period');
const { postBatch } = require('./model-fims-voucher');

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
  const data = JSON.parse(req.body.data);
  postBatch(data, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      postBatchImport(data, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          getNext((err, result) => {
            if (err) {
              res.json(err);
            } else {
              res.json(result);
            }
          });
        }
      });
    }
  });
};
