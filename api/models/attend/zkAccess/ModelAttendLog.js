const sql = require('mssql');
const config = process.env.ZK_ACCESS_MSSQL_CONN;

const qryList = `
SELECT 
  USERID AS user_id, 
  CHECKTIME AS log_time, 
  CHECKTYPE AS check_type, 
  VERIFYCODE as ver_code, 
  LOGID as log_id, 
  sn 
FROM dbo.CHECKINOUT
  WHERE CHECKTIME BETWEEN @date_from AND @date_to
`;

const qryListByDepts = `
DECLARE @myParams TABLE (id INT)
INSERT INTO @myParams VALUES (18)
SELECT 
  c.USERID AS USER_ID,
  d.DEPTNAME AS department,
  u.name, u.lastname,
  CHECKTIME AS log_time, 
  CHECKTYPE AS check_type, 
  VERIFYCODE as ver_code, 
  LOGID as log_id, 
  sn,
  u.DEFAULTDEPTID AS department_id
FROM dbo.CHECKINOUT c
JOIN dbo.USERINFO u ON c.USERID = u.USERID
JOIN dbo.DEPARTMENTS d ON u.DEFAULTDEPTID = d.DEPTID

WHERE CHECKTIME BETWEEN '2018-08-01' AND '2018-09-30'
  AND d.DEPTID IN (SELECT id FROM @myParams)
`;

module.exports.list = ({ dateFrom, dateTo }) =>
  new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
      console.log('zkCHECKINOUT: connected, querying');
      let vdFrom = dateFrom.slice(0, 10) + 'T00:00:00.001Z';
      let vdTo = dateTo.slice(0, 10) + 'T23:59:59.999Z';
      console.log(vdFrom, vdTo);

      console.log(vdFrom, vdTo);
      return pool
        .request()
        .input('date_from', sql.VarChar, vdFrom)
        .input('date_to', sql.VarChar, vdTo)
        .query(qryList);
    })
    .then(result => {
      let rows = result.recordset;
      console.log('zkCHECKINOUT: queried ', rows.length, ' recs returned');
      sql.close();
      return rows;
    })
    .catch(error => {
      // res.status(500).send({ message: '${error}' });
      console.log('zkCHECKINOUT: ERROR ', error);
      sql.close();
      return { error };
    });

module.exports.listByDepts = ({
  users,
  dateRange: [dateFrom, dateTo],
  excludeWeekends
}) => new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('zkCHECKINOUT: connected, querying');
    let vdFrom = dateFrom.slice(0, 10) + 'T00:00:00.001Z';
    let vdTo = dateTo.slice(0, 10) + 'T23:59:59.999Z';
    console.log(vdFrom, vdTo);

    console.log(vdFrom, vdTo);
    return pool
      .request()
      .input('date_from', sql.VarChar, vdFrom)
      .input('date_to', sql.VarChar, vdTo)
      .query(qryListByUsers);
  })
  .then(result => {
    let rows = result.recordset;
    console.log('zkCHECKINOUT: queried ', rows.length, ' recs returned');
    sql.close();
    return rows;
  })
  .catch(error => {
    // res.status(500).send({ message: '${error}' });
    console.log('zkCHECKINOUT: ERROR ', error);
    sql.close();
    return { error };
  });
