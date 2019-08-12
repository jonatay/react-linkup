const ModelSimplePayPayPoint = require('../../models/simplePay/ModelSimplePayPayPoint');

exports.list = (req, res) => {
  ModelSimplePayPayPoint.list().then(payPoints => res.json({ payPoints }));
};
