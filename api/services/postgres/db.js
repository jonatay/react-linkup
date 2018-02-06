// connect to a database if needed, then pass it to `callback`:
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise,
  capSQL:true,
  query(e) {
    console.log('query:', e.query);
  }
};

var pgp = require('pg-promise')(options);
var db = pgp(process.env.POSTGRES_CONNECT);

module.exports = db;
