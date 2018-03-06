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
  console.log(req.body);
  res.json('ok');
  // const data = JSON.parse(req.body.data);
  // postBatch(data, (err, result) => {
  //   postBatchImport(data, (err, result) => {
  //     getNext((err, result) => {
  //       if (err) {
  //         res.json(err);
  //       } else {
  //         res.json(result);
  //       }
  //     });
  //   });
  // });
};
