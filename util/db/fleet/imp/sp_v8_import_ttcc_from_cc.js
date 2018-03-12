CREATE OR REPLACE FUNCTION fleet.import_ttcc_from_cc() returns JSON as $$
//
//
// select all transaction_type with [cc_ids] linked via ttcc
const sqlListTranTypes =
	"SELECT tt.*, array_agg(cc.id) AS cc_ids " +
	"FROM fleet.transaction_type tt  " +
	"LEFT JOIN fleet.transaction_type_cost_centre ttcc ON ttcc.transaction_type_id = tt.id  " +
	"LEFT JOIN fleet.cost_centre cc ON cc.id = ttcc.cost_centre_id " +
	"GROUP BY tt.id";
// for each tt.fims_purchase_types, select cc's with fims_purchase_type in cc.purchase_types
const sqlGetCCsByPurchaseType =
	"SELECT array_agg(id)  AS ids from fleet.cost_centre " +
	" WHERE position($1 in purchase_types) > 0";
// comp ids, create new ttcc for each missing
const sqlInsertTtCc =
	"INSERT INTO fleet.transaction_type_cost_centre " +
	" (transaction_type_id, cost_centre_id) VALUES ($1,$2) ";
var ret = [];

const rwsTT = plv8.execute(sqlListTranTypes);
_.each(rwsTT, function(tt, key, list) {
	_.each(tt.fims_purchase_types, function(pt, key, list) {
		const rwCcIds = plv8.execute(sqlGetCCsByPurchaseType, [pt]);
		const insCcIds = _.difference(rwCcIds[0].ids, tt.cc_ids);
		ret.push({
			pt: pt,
			insCcIds: insCcIds,
			ptCcids: rwCcIds[0].ids,
			ttCcids: tt.cc_ids
		});
		_.each(insCcIds, function(ccid) {
			plv8.execute(sqlInsertTtCc, [tt.id, ccid]);
		});
	});
});
return ret;
$$ language plv8;

SELECT * FROM fleet.import_ttcc_from_cc();

