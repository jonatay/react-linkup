const { getNext, postBatchImport } = require('./model-fims-period');
const { insertBatch } = require('./model-fims-voucher');

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
  console.log(req.params);
  insertBatch(req.params, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      postBatchImport(req.params, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          getNext(config, db, (err, result) => {
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
