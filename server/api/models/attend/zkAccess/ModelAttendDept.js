const sql = require("mssql");
const table = "dbo.DEPARTMENTS";
const config = process.env.ZK_ACCESS_MSSQL_CONN;

module.exports.list = () =>
  new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
      console.log("zkDEPARTMENTS: connected, querying");
      return pool
        .request()
        .query(
          "select DEPTID AS id, DEPTNAME AS name, SUPDEPTID AS parent_id, code from " +
            table
        );
    })
    .then(result => {
      let rows = result.recordset;
      console.log("zkDEPARTMENTS: queried ", rows.length, " recs returned");
      sql.close();

      return rows;
    })
    .catch(error => {
      // res.status(500).send({ message: '${error}' });
      console.log(error);
      sql.close();
      return { error };
    });

module.exports.listByDept = depts =>
  new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
      console.log("zkDEPARTMENTS: connected, querying");
      return pool.request().query(
        `SELECT DEPTID AS id, DEPTNAME AS name, SUPDEPTID AS parent_id, code 
             FROM ${table} 
             WHERE DEPTID IN ('${depts.join("','")}')`
      );
    })
    .then(result => {
      let rows = result.recordset;
      console.log("zkDEPARTMENTS: queried ", rows.length, " recs returned");
      sql.close();

      return rows;
    })
    .catch(error => {
      // res.status(500).send({ message: '${error}' });
      console.log(error);
      sql.close();
      return { error };
    });
