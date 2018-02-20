// create or replace function fleet.import_fleet_from_fims() returns JSON as $$

// *** find 'max' fims_voucher_id int fleet_transaction
var maxId =
	plv8.execute("SELECT max(fims_voucher_id) FROM fleet.fleet_transaction")[0][
		"max"
	] || 0;
// ** get all vouchers with id > max
var rwsFimsV = plv8.execute(
	"SELECT * from fleet.fims_voucher WHERE id > $1 ORDER BY id",
	[maxId]
);

var result = { maxId: maxId, rwsFimsV: rwsFimsV.length, detail: [] };
load_module("get_name_from_array");
for (var i = 0; i < rwsFimsV.length; i++) {
	var fimV = rwsFimsV[i];
	// tran date
	var iYr = parseInt(fimV.transaction_date.substr(0, 4)); //20170727
	var iMth = parseInt(fimV.transaction_date.substr(4, 2)); //20170727
	var iDay = parseInt(fimV.transaction_date.substr(6, 2)); //20170727
	var dTran = new Date(iYr, iMth - 1, iDay + 1);
	//process date
	var iPYr = parseInt(fimV.process_date.substr(0, 4)); //20170727
	var iPMth = parseInt(fimV.process_date.substr(4, 2)); //20170727
	var iPDay = parseInt(fimV.process_date.substr(6, 2)); //20170727
	var dProc = new Date(iPYr, iPMth - 1, iPDay + 1);
	//tax yr
	var iTaxYr = iMth < 3 ? iYr : iYr + 1;
	//lookups (that ALWAYS return id, if missing-insert/upd EXCEPT tran_group)
	var idDriver = plv8.execute("SELECT * from fleet.driver_get_fims($1) id", [
		fimV.driver
	])[0].id;
	var idTranType = plv8.execute(
		"SELECT * from fleet.fleet_tran_type_get_fims($1) id",
		[fimV.purchase_description]
	)[0].id;
	var idMerchant = plv8.execute(
		"SELECT * from fleet.merchant_get_fims($1,$2,$3) id",
		[fimV.merchant_name, fimV.merchant_town, fimV.oil_company]
	)[0].id;
	var idTranGroup = plv8.execute(
		"SELECT * from fleet.fleet_tran_group_get_fims($1,$2) id",
		[fimV.registration, fimV.purchase_description]
	)[0].id;
	var idVehicle = plv8.execute(
		"SELECT * FROM fleet.vehicle_get_fims($1,$2,$3) id",
		[fimV.vehicle_description, fimV.registration, fimV.driver]
	)[0].id;
	//transaction
	var jTran = {
		tax_year: iTaxYr,
		tax_month: iMth,
		transaction_date: dTran,
		process_date: dProc,
		registration: fimV.registration,
		tran_type_id: idTranType,
		tran_group_id: idTranGroup,
		vehicle_id: idVehicle,
		driver_id: idDriver,
		fims_voucher_id: fimV.id,
		merchant_id: idMerchant,
		amount: fimV.amount,
		odometer: fimV.odometer,
		jdata: {
			description: fimV.purchase_description,
			toll_lane: fimV.toll_lane,
			batch: fimV.batch,
			oil_litres: fimV.oil_litres,
			private_usage: fimV.private_usage,
			warnings: fimV.warnings,
			toll_vehicle_class: fimV.toll_vehicle_class,
			toll_transaction_type: fimV.toll_transaction_type,
			toll_match_indicator: fimV.toll_match_indicator,
			toll_discount: fimV.toll_discount,
			batch_index: fimV.batch_index,
			request_period: fimV.request_period
		}
	};
	var sqlInsert =
		"INSERT INTO fleet.fleet_transaction ( " +
		" tax_year, " +
		" tax_month, " +
		" transaction_date, " +
		" process_date, " +
		" registration, " +
		" tran_type_id, " +
		" tran_group_id, " +
		" vehicle_id, " +
		" driver_id, " +
		" fims_voucher_id, " +
		" merchant_id, " +
		" amount, " +
		" odometer, " +
		" jdata " +
		") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id";
	//result.detail.push(tran);
	result.detail.push(
		plv8.execute(sqlInsert, [
			jTran.tax_year,
			jTran.tax_month,
			jTran.transaction_date,
			jTran.process_date,
			jTran.registration,
			jTran.tran_type_id,
			jTran.tran_group_id,
			jTran.vehicle_id,
			jTran.driver_id,
			jTran.fims_voucher_id,
			jTran.merchant_id,
			jTran.amount,
			jTran.odometer,
			jTran.jdata
		])[0].id
	);
}
return result;

// $$ language plv8;

// --DELETE FROM fleet.fleet_transaction;

// SELECT * FROM fleet.import_fleet_from_fims();

/* tec nc
tax_year
tax_month
tran_type_id
tran_group_id
vehicle_id
driver_id
fims_voucher_id
transaction_date
process_date
merchant_id
odometer
description
amount
jdata


-- DO $$
--   plv8.elog(WARNING, 'plv8.version = ' + plv8.version); // Will output the PL/v8 installed as a PostgreSQL `WARNING`.
--   load_module('get_name_from_array');
--   plv8.elog(WARNING, goiNameFromArray('fleet.driver', 'fims_names', 'name', 'JONO'));
-- $$ LANGUAGE plv8;

-- var aFimsV = plv8.execute('SELECT * FROM fleet.fims_voucher');
-- var result = { rows: aFimsV.length};
-- var plan = plv8.prepare( );
-- var cursor = plan.cursor( [1] );
-- var sum = 0, row;
-- while (row = cursor.fetch()) {
--     sum += row.num;
-- }
-- cursor.close();
-- plan.free();
*/
