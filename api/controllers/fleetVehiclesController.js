const db = require('../services/postgres/db');

const sqlGetVehicles = `
SELECT v.registration, v.id AS vehicle_id, v.name AS vehicle_name,
   d.id AS driver_id, d.name AS driver_name,
   tg.id AS fleet_tran_group_id, tg.name AS fleet_tran_group,
   tt.id AS fleet_tran_type_id, tt.name AS fleet_tran_type,
   SUM(ft.amount) AS amount, COUNT(ft.*) AS tran_count,
   MIN(ft.odometer) AS min_odometer, MAX(ft.odometer) AS max_odometer
  FROM fleet.fleet_transaction ft
  JOIN fleet.fleet_tran_group tg ON tg.id = ft.tran_group_id
  JOIN fleet.fleet_permission fp ON tg.id = ANY(fp.ids) AND $1 = ANY(fp.roles)
  JOIN fleet.vehicle v on v.id = ft.vehicle_id
  JOIN fleet.driver d on d.id = ft.driver_id
  JOIN fleet.fleet_tran_type tt ON tt.id = ft.tran_type_id
  WHERE ft.transaction_date BETWEEN $2 AND $3
  GROUP BY v.registration, v.id, v.name, d.id, d.name, tg.id, tg.name, tt.id, tt.name
  ORDER BY v.registration, tg.name, tt.name
`

