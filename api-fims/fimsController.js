const db = require('./pg-db');

const sqlGetAvailablePeriod = `
SELECT year, month FROM fleet.fims_period 
  WHERE (when_received is null OR must_refresh) 
  ORDER BY year,month 
  LIMIT 1
`;

const sqlGetLastPeriod = `
SELECT year, month FROM fleet.fims_period 
  ORDER BY year DESC,month DESC
  LIMIT 1
`;

const sqlGetUniqueByPeriod = `
SELECT id FROM fleet.fims_period 
WHERE year=$[year] AND month=$[month]
`;

const sqlInsert = `
INSERT INTO fleet.fims_period(
    year, month, when_received, rows_received, account, must_refresh)
  VALUES 
    ($[year], $[month], $[when_received], $[rows_received], $[account], $[must_refresh]);
`;

const sqlUpdate = `
UPDATE fleet.fims_period
  SET 
    year=$[year], month=$[month], 
    when_received=$[when_received], 
    rows_received=$[rows_received],
    account=$[account],
    must_refresh=$[must_refresh]
  WHERE id=$[id];
`;

// use getNext Date to advance mth by 1 and check against today
const getNextDate = myDate => {
  //console.log(myDate);
  let dNow = new Date();
  let mthNow = dNow.getUTCMonth() + 1; //months from 1-12
  let yrNow = dNow.getUTCFullYear();
  let yrRet = myDate.month < 12 ? myDate.year : myDate.year + 1;
  let mthRet = myDate.month < 12 ? myDate.month + 1 : 1;
  //console.log(yrRet, yrNow, mthRet, mthNow)
  if (yrNow > yrRet || (yrNow = yrRet && mthNow > mthRet)) {
    return { year: yrRet, month: mthRet < 10 ? '0' + mthRet : '' + mthRet };
  } else return { sinceLastCutoff: true };
};

module.exports.get_period = (req, res) => {
  db.any(sqlGetAvailablePeriod).then(data => {
    if (data[0]) {
      res.json(data);
    } else {
      db
        .any(sqlGetLastPeriod) // get last period in table
        .then(data => {
          let nxtPer = data[0]
            ? getNextDate(data[0])
            : { year: 2015, month: '10' };
          console.log(`..returning period ${nxtPer.year}-${nxtPer.month}`);
          res.json(nxtPer);
        })
        .catch(err => {
          res.json(err);
        });
    }
  });
};

module.exports.postBatchImport = (req, res) => {
  let period = {
    year: data.reqParam.year,
    month: data.reqParam.month,
    when_received: new Date(),
    rows_received: data.reqParam.rows,
    account: data.reqParam.account,
    must_refresh: false
  };
  db.any(sqlGetUniqueByPeriod, period).then(data => {
    console.log(data);
    if (data[0]) {
      console.log(data[0]);
    } else {
      db.any(sqlInsert, period).then(data => {
        res.json('done');
      });
    }
  });
};
