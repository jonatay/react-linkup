// connect to a database if needed, then pass it to `callback`:
const Promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: Promise,
  capSQL: true,
  query(e) {
    console.log('query:', e.query);
  }
};

// Fix for parsing of numeric fields
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
// above fixes pg returning numeric filds as text

var pgp = require('pg-promise')(options);

var cubitDbs = JSON.parse(process.env.POSTGRES_CUBIT).map(c => ({
  ccc: c.ccc,
  db: pgp(process.env.POSTGRES_CONNECT.replace('/linkup', `/${c.db}`))
}));

//cubitDbs.map(({ db }) => db.any('SELECT sname FROM cubit.employees').then(data=>console.log(data)));

module.exports = cubitDbs;
