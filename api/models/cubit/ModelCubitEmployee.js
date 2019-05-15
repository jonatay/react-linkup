const Promise = require('bluebird');
const cubitDbs = require('../../services/postgres/cubit_dbs');

const sqlList = 'SELECT * FROM cubit.employees';

const sqlGet = 'SELECT * FROM cubit.employees WHERE enum = $[enum]';
const sqlGetL = 'SELECT * FROM cubit.lemployees WHERE enum = $[enum]';

exports.list = () =>
  Promise.all(cubitDbs.map(({db}) => db.any(sqlList))).then(data =>
    data.reduce((ret, iData) => ret.concat(iData), [])
  );

// ES5
var flatten = function flatten(list) {
  return list.reduce(function(a, b) {
    return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []);
};

exports.get = employeeCode =>
  Promise.map(cubitDbs, cdb =>
    Promise.map(
      [
        cdb.db.any(sqlGet, { enum: employeeCode }),
        cdb.db.any(sqlGetL, { enum: employeeCode })
      ],
      empl => empl
    )
  ).then(
    res => flatten(res)[0] //.reduce((acc, item) => (item.lenght > 0 ? acc.concat(item) : acc), [])
  );
