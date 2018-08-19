const db = require('../api/services/postgres/db');

const sqlGetAvailablePeriod = `
SELECT cal_year, cal_month FROM fleet.fims_period 
  WHERE (when_received is null OR must_refresh) 
  ORDER BY cal_year,cal_month 
  LIMIT 1
`;

const sqlGetLastPeriod = `
SELECT cal_year, cal_month FROM fleet.fims_period 
  ORDER BY cal_year DESC,cal_month DESC
  LIMIT 1
`;

const sqlGetUniqueByPeriod = `
SELECT id FROM fleet.fims_period 
WHERE cal_year=$[cal_year] AND cal_month=$[cal_month]
`;

const sqlInsert = `
INSERT INTO fleet.fims_period(
    cal_year, cal_month, when_received, rows_received, account, must_refresh)
  VALUES 
    ($[cal_year], $[cal_month], $[when_received], $[rows_received], $[account], $[must_refresh]);
`;

const sqlUpdate = `
UPDATE fleet.fims_period
  SET 
    cal_year=$[cal_year], cal_month=$[cal_month], 
    when_received=$[when_received], 
    rows_received=$[rows_received],
    account=$[account],
    must_refresh=$[must_refresh]
  WHERE id=$[id];
`;

// use getNext Date to advance mth by 1 and check against today
const getNextDate = myDate => {
  console.log(myDate);
  let dNow = new Date();
  let mthNow = dNow.getUTCMonth() + 1; //months from 1-12
  let yrNow = dNow.getUTCFullYear();
  let yrRet = myDate.cal_month < 12 ? myDate.cal_year : myDate.cal_year + 1;
  let mthRet = myDate.cal_month < 12 ? myDate.cal_month + 1 : 1;
  //console.log(yrRet, yrNow, mthRet, mthNow)
  if (yrNow > yrRet || (yrNow === yrRet && mthNow > mthRet)) {
    return {
      sinceLastCutoff: false,
      year: yrRet,
      month: mthRet < 10 ? '0' + mthRet : '' + mthRet
    };
  } else return { sinceLastCutoff: true, year: yrNow, month: mthNow };
};

module.exports.getNext = callback => {
  db
    .any(sqlGetAvailablePeriod) //get first available
    .then(data => {
      if (data[0]) {
        // there is available row (i.e. no when_received or must_update
        callback(null, data);
      } else {
        db
          .any(sqlGetLastPeriod) // get last period in table
          .then(data => {
            let nxtPer = data[0]
              ? getNextDate(data[0])
              : { year: 2015, month: '10' };
            console.log(`..returning period ${nxtPer.year}-${nxtPer.month}`);
            callback(null, nxtPer);
          })
          .catch(err => {
            callback(err);
          });
      }
    });
};

module.exports.postBatchImport = (params, callback) => {
  console.log([
    'modelFimsPeriod-postBatchImport listParams.reqParam got:',
    params.reqParam
  ]);

  let dNow = new Date();
  let mthNow = dNow.getUTCMonth() + 1; //months from 1-12
  let yrNow = dNow.getUTCFullYear();
  let { reqParam } = params;

  const period = {
    year: reqParam.year > 0 ? reqParam.year : yrNow,
    month: reqParam.month > 0 ? reqParam.month : mthNow,
    when_received: new Date(),
    rows_received: reqParam.rows,
    account: reqParam.account,
    must_refresh: false
  };
  console.log(['revised period is:', period]);

  db.any(sqlGetUniqueByPeriod, period).then(data => {
    console.log('sqlGetUniqueByPeriod', data);
    if (data[0]) {
      db
        .any(sqlUpdate, Object.assign(period, { id: data[0].id }))
        .then(data => {
          callback(null, { status: 'mod period', data });
        });
    } else {
      db.any(sqlInsert, period).then(data => {
        callback(null, { status: 'ins period', data });
      });
    }
  });
};
