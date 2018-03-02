CREATE OR REPLACE FUNCTION fleet.vehicle_get_list() returns SETOF json as $$

const sqlSelect = "SELECT * from fleet.vehicle";
const sqlSelCcg = "SELECT * from fleet.cost_centre_group ccg "+
"JOIN fleet.vehicle_cost_centre_group vccg ON vccg.cost_centre_group_id = ccg.id "+
" WHERE vccg.vehicle_id = $1"

rwsV = plv8.execute(sqlSelect);
_.each(rwsV, function(vehicle) {
	var ret = JSON.parse(JSON.stringify(vehicle)); 
	ret.cost_centre_groups = plv8.execute(sqlSelCcg,[vehicle.id])
	plv8.return_next(ret);
});

$$ language plv8 IMMUTABLE;

SELECT * FROM fleet.vehicle_get_list();