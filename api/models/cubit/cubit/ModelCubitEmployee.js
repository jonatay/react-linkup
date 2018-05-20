const cubitDbs = require('../../../services/postgres/cubit_dbs');

const sqlList = 'SELECT * FROM cubit.employees';

exports.list = () =>
  Promise.all(cubitDbs.map(db => db.any(sqlList))).then(data =>
    data.reduce((ret, iData) => ret.concat(iData), [])
  );
