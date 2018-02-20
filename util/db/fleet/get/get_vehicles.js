--DROP  FUNCTION fleet.vehicle_get_by_role_daterange(i_role VARCHAR(15),i_from DATE, i_to DATE);
CREATE OR REPLACE FUNCTION fleet.vehicle_get_by_role_daterange(i_role VARCHAR(15),i_from DATE, i_to DATE) returns json as $$

var sqlGet = "SELECT v.registration, v.id AS vehicle_id, v.name AS vehicle_name, " +
  " d.id AS driver_id, d.name AS driver_name, " +
  " tg.id AS fleet_tran_group_id, tg.name AS fleet_tran_group, " +
  " tt.id AS fleet_tran_type_id, tt.name AS fleet_tran_type, " +
  " SUM(ft.amount) AS amount, COUNT(ft.*) AS tran_count, " +
  " MIN(ft.odometer) AS min_odometer, MAX(ft.odometer) AS max_odometer " +
  "FROM fleet.fleet_transaction ft " +
  "JOIN fleet.fleet_tran_group tg ON tg.id = ft.tran_group_id " +
  "JOIN fleet.fleet_permission fp ON tg.id = ANY(fp.ids) AND $1 = ANY(fp.roles) " +
  "JOIN fleet.vehicle v on v.id = ft.vehicle_id " +
  "JOIN fleet.driver d on d.id = ft.driver_id " +
  "JOIN fleet.fleet_tran_type tt ON tt.id = ft.tran_type_id " +
  "WHERE ft.transaction_date BETWEEN $2 AND $3 " +
  "GROUP BY v.registration, v.id, v.name, d.id, d.name, tg.id, tg.name, tt.id, tt.name " +
  "ORDER BY v.registration, tg.name, tt.name ";

var aData = plv8.execute(sqlGet, [i_role, i_from, i_to]);
var aResult = [];
var jVehicle = {};

for (var i = aData.length - 1; i >= 0; i--) {
  var jRow = aData[i];
  // test if 1. vehicle blank OR 2. vehicle id changed
  if (!jVehicle.id || jVehicle.id != jRow.vehicle_id) {
    // if id changed, but not first
    if (jVehicle.id) {
      aResult.push(jVehicle);
    }
    // create new one
    jVehicle = {
      registration: jRow.registration,
      id: jRow.vehicle_id,
      name: jRow.vehicle_name,
      open_odometer: -1,
      close_odometer: -1,
      driver: {
        id: jRow.driver_id,
        name: jRow.driver_name
      },
      transactions: []
    }
  }
  // insert tran data
  jVehicle.transactions.push({
    tran_type_id: jRow.fleet_tran_type_id,
    tran_type_name: jRow.fleet_tran_type,
    tran_group_id: jRow.fleet_tran_group_id,
    tran_group_name: jRow.fleet_tran_group,
    amount: jRow.amount
  });
  //odometer
  if (jVehicle.open_odometer === -1 || jVehicle.open_odometer > jRow.min_odometer) {
    jVehicle.open_odometer = jRow.min_odometer;
  }
  if (jVehicle.close_odometer < jRow.max_odometer) {
    jVehicle.close_odometer = jRow.max_odometer;
  }
}
// push the last
aResult.push(jVehicle);

return aResult;
$$ language plv8 IMMUTABLE;

select * from fleet.vehicle_get_by_role_daterange('manager', '2017-02-23', '2017-03-30');