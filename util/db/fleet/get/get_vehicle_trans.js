--DROP  FUNCTION fleet.get_vehicle_tran(i_vehicle_id integer,i_from DATE, i_to DATE);
CREATE OR REPLACE FUNCTION fleet.get_vehicle_tran(i_vehicle_id integer,i_from DATE, i_to DATE) returns json as $$

var sqlGet = "SELECT tr.*, tg.name AS tran_group, tt.name AS tran_type, "+
    " m.name AS merchant, m.town AS merchant_town, m.oil_coy AS merchant_oil_coy, d.name AS driver "+
  " FROM fleet.fleet_transaction tr" +
  " JOIN fleet.fleet_tran_group tg ON tg.id = tr.tran_group_id " +
  " JOIN fleet.fleet_tran_type tt ON tt.id = tr.tran_type_id " +
  " JOIN fleet.merchant m ON m.id = tr.merchant_id " +
  " JOIN fleet.driver d ON d.id = tr.driver_id " +
  " WHERE tr.vehicle_id = $1 AND tr.transaction_date BETWEEN $2 AND $3 " +
  " ORDER BY transaction_date";

var aData = plv8.execute(sqlGet, [i_vehicle_id, i_from, i_to]);
return aData;
$$ language plv8 IMMUTABLE;

select * from fleet.get_vehicle_tran(200, '2017-02-23', '2017-03-30');