DROP FUNCTION fleet.import_fleet_transaction_from_fims_voucher(i_fims_period_id integer);
CREATE OR REPLACE FUNCTION fleet.import_fleet_transaction_from_fims_voucher(i_fims_period_id integer) returns JSON as $$
//
// --get vouchers
const rwsVoucher = plv8.execute(
	"SELECT * FROM fleet.fims_voucher WHERE fims_period_id = $1",
	[i_fims_period_id]
);
res = [];
// --then forEach rws
_.each(rwsVoucher, function(voucher) {
	var tran = {};
	// --now get-create needed
	tran.fims_voucher_id = voucher.id;
	tran.amount = parseInt(parseFloat(voucher.amount)*100)/100
	tran.description =
		voucher.driver.toProperCase() +
		" in " +
		voucher.registration +
		" buys " +
		voucher.purchase_description.toProperCase() +
		" at " +
		voucher.merchant_name.toProperCase() +
		" in " +
		voucher.merchant_town.toProperCase();
	var yr = parseInt(voucher.transaction_date.substr(0, 4));
	var mt = parseInt(voucher.transaction_date.substr(4, 2)) - 1;
	var dy = parseInt(voucher.transaction_date.substr(6, 2));
	tran.transaction_date = new Date(Date.UTC(yr, mt, dy));
	tran.tax_year = mt <= 2 ? yr : yr + 1; // --TODO: Put get tax-yr as SP i.e. sys-config-option:tax-year
	tran.tax_month = mt;
	yr = parseInt(voucher.process_date.substr(0, 4));
	mt = parseInt(voucher.process_date.substr(4, 2)) - 1;
	dy = parseInt(voucher.process_date.substr(6, 2));
	tran.process_date = new Date(Date.UTC(yr, mt, dy));
	//--lookups
	// --vehicle (by registration)
	tran.vehicle_id = plv8.execute(
		"SELECT vehicle_get_fims AS id FROM fleet.vehicle_get_fims($1, $2, $3)",
		[voucher.vehicle_description, voucher.registration, voucher.driver]
	)[0].id;
	// --transaction_type_id (by purchase_type in tt.fims_purchase_types)
	tran.transaction_type_id = plv8.execute(
		"SELECT id FROM fleet.transaction_type WHERE $1 = any(fims_purchase_types)",
		[voucher.purchase_description.toUpperCase()]
	)[0].id;
	// --cost_centre_id by combining v -> v_cc_g -> cc_g -> cc & tt -> tt_cc -> cc (LOOK AT ERD TO UNDERSTAND THIS)
	tran.cost_centre_id = plv8.execute(
		"SELECT cc.id FROM fleet.cost_centre cc" +
			" JOIN fleet.cost_centre_group ccg ON ccg.id = cc.cost_centre_group_id" +
			" JOIN fleet.vehicle_cost_centre_group vcg ON vcg.cost_centre_group_id = ccg.id" +
			" JOIN fleet.vehicle v ON v.id = vcg.vehicle_id" +
			" JOIN fleet.transaction_type_cost_centre tcc ON tcc.cost_centre_id = cc.id" +
			" JOIN fleet.transaction_type tt ON tt.id = tcc.transaction_type_id" +
			" WHERE v.id = $1 AND tt.id = $2",
		[tran.vehicle_id, tran.transaction_type_id]
	)[0].id;
	// // --driver (by driver in d.fims_names)
	tran.driver_id = plv8.execute(
		"SELECT * FROM fleet.driver_get_fims($1) AS id",
		[voucher.driver]
	)[0].id;
	res.push(tran);
});
return res;
//
$$ language plv8;

SELECT * FROM fleet.import_fleet_transaction_from_fims_voucher(26);

