--DROP FUNCTION fleet.get_cost_centre_by_vehicle_tran_type(i_vehicle_id INTEGER, i_tran_type_id INTEGER);
CREATE OR REPLACE FUNCTION fleet.get_cost_centre_by_vehicle_tran_type(i_vehicle_id INTEGER, i_tran_type_id INTEGER) returns INTEGER as $$
//
//
// --cost_centre_id by combining v -> v_cc_g -> cc_g -> cc & tt -> tt_cc -> cc (LOOK AT ERD TO UNDERSTAND THIS)
const rowCC = plv8.execute(
	"SELECT cc.id FROM fleet.cost_centre cc" +
		" JOIN fleet.cost_centre_group ccg ON ccg.id = cc.cost_centre_group_id" +
		" JOIN fleet.vehicle_cost_centre_group vcg ON vcg.cost_centre_group_id = ccg.id" +
		" JOIN fleet.vehicle v ON v.id = vcg.vehicle_id" +
		" JOIN fleet.transaction_type_cost_centre tcc ON tcc.cost_centre_id = cc.id" +
		" JOIN fleet.transaction_type tt ON tt.id = tcc.transaction_type_id" +
		" WHERE v.id = $1 AND tt.id = $2",
	[i_vehicle_id, i_tran_type_id]
);
return rowCC.length //> 0 ? rowCC[0].id : null;
//
//
$$ language plv8;

SELECT * FROM fleet.get_cost_centre_by_vehicle_tran_type(191,2);
SELECT * FROM fleet.get_cost_centre_by_vehicle_tran_type(276,2);
SELECT * FROM fleet.get_cost_centre_by_vehicle_tran_type(191,8);
SELECT * FROM fleet.get_cost_centre_by_vehicle_tran_type(276,8);

