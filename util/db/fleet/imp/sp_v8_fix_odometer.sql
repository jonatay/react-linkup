--drop function fleet.fleet_tran_fix_odometer();
create or replace function fleet.fleet_tran_fix_odometer() returns JSON as $$

function averageDailyMileage(vehicle_id, tran_date) {
	var sql = 'SELECT transaction_date, odometer FROM fleet.fleet_transaction WHERE vehicle_id = $1 AND odometer > 0 AND transaction_date BETWEEN $2 AND $3 ORDER BY transaction_date';
	var res = plv8.execute(sql,[vehicle_id, tran_date.addDays(-90),tran_date.addDays(+90)]);
	var days = Date.daysBetween(res[0].transaction_date, res[res.length-1].transaction_date);
	var kms = res[res.length-1].odometer - res[0].odometer;
	var adm = kms/days;
	plv8.elog(INFO, days, kms);
	return parseInt(adm);
}

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

Date.daysBetween = function(date1, date2) {
  if (!date1 instanceof Date || !date2 instanceof Date) {
    return NaN;
  }
  var one_day = 1000 * 60 * 60 * 24; //Get 1 day in milliseconds
  var date1_ms = date1.getTime(); // Convert both dates to milliseconds
  var date2_ms = date2.getTime();
  var difference_ms = date2_ms - date1_ms; // Calculate the difference in milliseconds    
  return Math.round(difference_ms / one_day); // Convert back to days and return
}

function findPrevIdx(aOds, i) {
  var k = i - 1;
  while (k > 0 && !aOds[k].odometer) {
    k--;
  }
  return k;
}

function findNextIdx(aOds, i) {
  var k = i + 1;
  while (k < aOds.length - 1 && !aOds[k].odometer) {
    k++;
  }
  return k;
}

var sqlGetVehicles = 'SELECT id FROM fleet.vehicle ORDER BY id';
var sqlGetOdos = 'SELECT ft.id, ft.vehicle_id, ft.registration, ft.transaction_date, ft.odometer, fv.fuel_litres, fv.oil_litres, fv.purchase_description ' +
  ' FROM fleet.fleet_transaction ft ' +
  ' JOIN fleet.fims_voucher fv ON fv.id = ft.fims_voucher_id' +
  ' WHERE ft.vehicle_id = $1 ORDER BY ft.transaction_date;'

var aVehicles = plv8.execute(sqlGetVehicles);
aOut = [];
for (var i = 0; i < aVehicles.length; i++) {

  var id = aVehicles[i].id;
  var aOds = plv8.execute(sqlGetOdos, [id]);
  for (var j = 0; j < aOds.length; j++) {
    var od = aOds[j];
    if (!od.odometer) {
      var ip = findPrevIdx(aOds, j);
      var ix = findNextIdx(aOds, j);
      var adm = averageDailyMileage(od.vehicle_id, od.transaction_date);
      aOut.push([od.registration, j, ip, ix, adm]);
      break;
    }
  }
}
return aOut;

$$ language plv8;
select * from fleet.fleet_tran_fix_odometer();


