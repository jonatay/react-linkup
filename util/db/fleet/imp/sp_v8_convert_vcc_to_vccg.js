CREATE OR REPLACE FUNCTION fleet.convert_vcc_to_vccg() returns JSON as $$
//
//// for every vcc-cc (distinct)... (with ccg from cc)
const sqlSelect =
	"SELECT DISTINCT cc.cost_centre_group_id, vcc.vehicle_id FROM fleet.cost_centre cc " +
	"LEFT JOIN fleet.vehicle_cost_centre vcc ON vcc.cost_centre_id = cc.id";
// check for vccg exists...
const sqlFind =
	"SELECT id FROM fleet.vehicle_cost_centre_group vccg " +
	"WHERE vccg.vehicle_id = $1 AND vccg.cost_centre_group_id = $2";
// create if not
const sqlInsert =
	"INSERT INTO fleet.vehicle_cost_centre_group " +
	" (vehicle_id, cost_centre_group_id) VALUES ($1,$2)";
// do the thing...
var ret = [];
const rwsVcc = plv8.execute(sqlSelect);
_.each(rwsVcc, function(vcc, key, list) {
	var rwsVccg = plv8.execute(sqlFind, [
		vcc.vehicle_id,
		vcc.cost_centre_group_id
	]);
	if (rwsVccg.length === 0) {
		plv8.execute(sqlInsert, [vcc.vehicle_id, vcc.cost_centre_group_id]);
		ret.push({
			status: "NOT",
			vehicle_id: vcc.vehicle_id,
			cost_centre_group_id: vcc.cost_centre_group_id
		});
	} else {
		ret.push({
			status: "found",
			vehicle_id: vcc.vehicle_id,
			cost_centre_group_id: rwsVccg[0].cost_centre_group_id
		});
	}
});
// done the thing, returning feedback...
return ret;
//
$$ language plv8;


SELECT * FROM fleet.convert_vcc_to_vccg();