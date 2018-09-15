const sql = require('mssql');
const table = 'dbo.USERINFO';
const msSqlConnection = process.env.ZK_ACCESS_MSSQL_CONN;

module.exports.list = function() {
  return new Promise((resolve, reject) => {
    console.log('zkUSERINFO: connection');
    sql.connect(msSqlConnection).then(function() {
      console.log('zkUSERINFO: connected, querying');
      new sql.Request()
        .query("select USERID AS id, lastname + ', ' + Name AS name, Badgenumber AS auth_id, DEFAULTDEPTID AS dept_id from " + table)
        .then(recordsets => {
          console.log(
            'zkUSERINFO: queried ',
            recordsets.recordset.length,
            ' recs returned'
          );
          sql.close();
          resolve(recordsets.recordset);
        })
        .catch(err => reject(err));
    });
  });
};
