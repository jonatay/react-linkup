// connect to a database if needed, then pass it to `callback`:
const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise,
  capSQL: true,
  query(e) {
    if (e.query.includes('hr.sal_summ')) {
      console.log('******************** db.query *******************');
      console.log('query:', e.query);
      console.log('*************************************************');
    }
  },
  error: (err, e) => {
    if (err instanceof QueryResultError) {
      // A query returned unexpected number of records, and thus rejected;
      // we can check the error code, if we want specifics:
      if (err.code === qrec.noData) {
        console.log('expected some data, but received none');
      }
      if (err.code === qrec.notEmpty) {
        console.log('expected no data, but received some');
      }
      if (err.code === qrec.multiple) {
        console.log('expected one data, but received multiple');
      }
      // If you write QueryResultError into the console,
      // you will get a nicely formatted output.
      console.log(err);
      // See also: err, e.query, e.params, etc.
    }
  }
};

// Fix for parsing of numeric fields
const pg = require('pg');
const types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
// above fixes pg returning numeric filds as text

const pgp = require('pg-promise')(options);
const QueryResultError = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const db = pgp(process.env.POSTGRES_CONNECT);

module.exports = db;
