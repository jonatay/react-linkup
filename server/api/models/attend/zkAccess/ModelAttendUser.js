const sql = require("mssql");
const table = "dbo.USERINFO";
const config = process.env.ZK_ACCESS_MSSQL_CONN;

module.exports.list = () =>
  new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
      console.log("zkUSERINFO: connected, querying");
      return pool.request().query(
        `select USERID AS id, 
                  lastname + ', ' + Name AS name, 
                  Badgenumber AS auth_id, 
                  DEFAULTDEPTID AS dept_id 
                  FROM ${table}`
      );
    })
    .then(result => {
      let rows = result.recordset;
      console.log("zkUSERINFO: queried ", rows.length, " recs returned");
      sql.close();
      return rows;
    })
    .catch(error => {
      // res.status(500).send({ message: '${error}' });
      console.log("zkUSERINFO: ERROR", error);
      sql.close();
      return { error };
    });

module.exports.listByDept = depts =>
  new sql.ConnectionPool(config)
    .connect()
    .then(pool =>
      pool.request().query(
        `SELECT USERID AS id, 
                  lastname + ', ' + Name AS name, 
                  Badgenumber AS auth_id, 
                  DEFAULTDEPTID AS dept_id
           FROM ${table}
           WHERE DEFAULTDEPTID IN ('${depts.join("','")}')
           `
      )
    )
    .then(({ recordset }) => {
      //console.log(recordset);
      return recordset;
    });

/*

  function() {
  return new Promise((resolve, reject) => {
    sql.connect(msSqlConnection).then(pool=> {
      console.log('zkUSERINFO: ');
      return pool.request()
        .query("select USERID AS id, lastname + ', ' + Name AS name, Badgenumber AS auth_id, DEFAULTDEPTID AS dept_id from " + table)
        .then(recordsets => {

          sql.close();
          resolve(recordsets.recordset);
        })
        .catch(err => reject(err));
    });
  });
};
   */
