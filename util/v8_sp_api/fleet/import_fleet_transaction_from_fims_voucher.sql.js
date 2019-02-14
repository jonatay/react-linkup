--DROP FUNCTION fleet.import_fleet_transaction_from_fims_voucher(i_fims_period_id integer);
CREATE OR REPLACE FUNCTION fleet.import_fleet_transaction_from_fims_voucher(i_fims_period_id integer) returns SETOF JSON as $$
//
// --get fims_period
 plv8.elog(NOTICE,JSON.stringify(i_fims_period_id));
const rowFimsPeriod = plv8.execute(
	"SELECT * FROM fleet.fims_period WHERE id = $0",
	[i_fims_period_id]
);
// --get vouchers
const rwsVoucher = plv8.execute(
	"SELECT * FROM fleet.fims_voucher WHERE fims_period_id = $0",
	[i_fims_period_id]
);
res = [];
// --then forEach rws
_.each(rwsVoucher, function(voucher) {
	var tran = {};
	// --now get-createFromEmpDetailsParams needed
	tran.invoice_number = "FIMS IMP INV";
	tran.fims_voucher_id = voucher.id;
	tran.amount = Math.round(parseFloat(voucher.amount) * 100) / 100;
	tran.registration = voucher.registration;
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
	tran.odometer = voucher.odometer;
	//tran date
	var yr = parseInt(voucher.transaction_date.substr(0, 4));
	var mt = parseInt(voucher.transaction_date.substr(4, 2)) - 1;
	var dy = parseInt(voucher.transaction_date.substr(6, 2));
	tran.transaction_date = new Date(Date.UTC(yr, mt, dy));
	//proc date
	yr = parseInt(voucher.process_date.substr(0, 4));
	mt = parseInt(voucher.process_date.substr(4, 2)) - 1;
	dy = parseInt(voucher.process_date.substr(6, 2));
	tran.process_date = new Date(Date.UTC(yr, mt, dy));
	//tax date
	yr = rowFimsPeriod[0].cal_year;
	mt = rowFimsPeriod[0].cal_month;
	tran.tax_year = yr === 0 ? 0 : mt <= 2 ? yr : yr + 1; // --TODO: Put get tax-yr as SP i.e. sys-config-option:tax-year
	tran.tax_month = mt === 0 ? 0 : mt;

	//--lookups
	// --vehicle (by registration)
	tran.vehicle_id = plv8.execute(
		"SELECT vehicle_get_fims AS id FROM fleet.vehicle_get_fims($0, $1, $2)",
		[voucher.vehicle_description, voucher.registration, voucher.driver]
	)[0].id;
	// --merchant (by name,town,oil)
	tran.merchant_id = plv8.execute(
		"SELECT merchant_get_fims AS id FROM fleet.merchant_get_fims($0, $1, $2)",
		[voucher.merchant_name, voucher.merchant_town, voucher.oil_company]
	)[0].id;
	// --transaction_type_id (by purchase_type in tt.fims_purchase_types) INCLUDE VAT RATE =114-(114/1.14) = 14
	tran.transaction_type_id = plv8.execute(
		"SELECT transaction_type_get_fims AS id FROM fleet.transaction_type_get_fims($0)",
		[voucher.purchase_description]
	)[0].id;
	//jrt 180412- make provision for earlier vat rate
	const ttRec = plv8.execute(
		"SELECT vat_rate, jdata FROM fleet.transaction_type WHERE id = $0",
		[tran.transaction_type_id]
	)[0];
	const vatRate = ttRec.vat_rate;
	// jdata has this in: {"previousVat": [{"vatRate":0.14, "untilDate":"2018-03-31"}]}
	if (
		ttRec.jdata &&
		ttRec.jdata.previousVat &&
		ttRec.jdata.previousVat.length === 1
	) {
		//vat prev date
		const untilDate = ttRec.jdata.previousVat[0].untilDate;
		yr = parseInt(untilDate.substr(0, 4));
		mt = parseInt(untilDate.substr(4, 2)) - 1;
		dy = parseInt(untilDate.substr(6, 2));
		const prevVatDate = new Date(Date.UTC(yr, mt, dy));
		if (prevVatDate <= tran.transaction_date) {
			vatRate = ttRec.jdata.previousVat[0].vatRate;
		}
	}
	tran.vat_amount =
		vatRate === 0
			? 0
			: Math.round((tran.amount - tran.amount / (vatRate + 1)) * 100) /
				100;

	// --cost_centre_id by combining v -> v_cc_g -> cc_g -> cc & tt -> tt_cc -> cc (LOOK AT ERD TO UNDERSTAND THIS)
	const rowCC = plv8.execute(
		"SELECT cc.id FROM fleet.cost_centre cc" +
			" JOIN fleet.cost_centre_group ccg ON ccg.id = cc.cost_centre_group_id" +
			" JOIN fleet.vehicle_cost_centre_group vcg ON vcg.cost_centre_group_id = ccg.id" +
			" JOIN fleet.vehicle v ON v.id = vcg.vehicle_id" +
			" JOIN fleet.transaction_type_cost_centre tcc ON tcc.cost_centre_id = cc.id" +
			" JOIN fleet.transaction_type tt ON tt.id = tcc.transaction_type_id" +
			" WHERE v.id = $0 AND tt.id = $1",
		[tran.vehicle_id, tran.transaction_type_id]
	);
	tran.cost_centre_id = rowCC.length === 1 ? rowCC[0].id : null;
	// // --driver (by driver in d.fims_names)
	tran.driver_id = plv8.execute(
		"SELECT * FROM fleet.driver_get_fims($0, $1) AS id",
		[voucher.driver, voucher.registration]
	)[0].id;
	tran.jdata = {};
	//--res.push(tran);
	plv8.return_next(tran);
});
//--return res;//
$$ language plv8;

SELECT * FROM fleet.import_fleet_transaction_from_fims_voucher('831');

