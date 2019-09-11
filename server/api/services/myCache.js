const NodeCache = require("node-cache");
module.exports = new NodeCache({ stdTTL: 5000, checkperiod: 120 });
