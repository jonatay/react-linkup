SELECT cc.id FROM fleet.cost_centre cc
		JOIN fleet.cost_centre_group ccg ON ccg.id = cc.cost_centre_group_id
		JOIN fleet.vehicle_cost_centre_group vcg ON vcg.cost_centre_group_id = ccg.id
		JOIN fleet.vehicle v ON v.id = vcg.vehicle_id
		JOIN fleet.transaction_type_cost_centre tcc ON tcc.cost_centre_id = cc.id
		JOIN fleet.transaction_type tt ON tt.id = tcc.transaction_type_id
		WHERE v.id = 276 AND tt.id = 2;

SELECT * FROM fleet.vehicle WHERE id = 276;
SELECT * FROM fleet.vehicle_cost_centre_group WHERE vehicle_id = 276;
SELECT * FROM fleet.cost_centre cc JOIN fleet.cost_centre_group ccg ON ccg.id = cc.cost_centre_group_id WHERE cc.cost_centre_group_id = 1;

SELECT cc.* FROM fleet.cost_centre cc
		JOIN fleet.cost_centre_group ccg ON ccg.id = cc.cost_centre_group_id
		JOIN fleet.vehicle_cost_centre_group vcg ON vcg.cost_centre_group_id = ccg.id
		JOIN fleet.vehicle v ON v.id = vcg.vehicle_id
		WHERE v.id = 276;

SELECT cc.* FROM fleet.cost_centre cc
		JOIN fleet.transaction_type_cost_centre tcc ON tcc.cost_centre_id = cc.id
		JOIN fleet.transaction_type tt ON tt.id = tcc.transaction_type_id
		WHERE tt.id = 2;