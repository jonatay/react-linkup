
create or replace function fleet.fleet_tran_type_get_fims(i_name varchar(30)) returns integer as $$
	var sqlFind = "select id FROM fleet.fleet_tran_type where upper($1) = ANY (fims_purchase_types)";
	var sqlInsert = 'INSERT INTO fleet.fleet_tran_type (name, fims_purchase_types) VALUES ($1, $2) RETURNING id';
	var jRes = plv8.execute(sqlFind, [i_name]);
	if (jRes.length == 1) {
		return jRes[0].id;
	} else if (jRes.length == 0) {
		return plv8.execute(sqlInsert, [i_name.toProperCase(), [i_name.toUpperCase()]])[0].id;
	} else {
		throw 'wobbly, found too many tran_types for:'+i_name;
	};

$$ language plv8;

select * from fleet.fleet_tran_type_get_fims('test');
select * from fleet.fleet_tran_type_get_fims('TEST');
select * from fleet.fleet_tran_type_get_fims('WHATEVER');
select * from fleet.fleet_tran_type_get_fims('jono');
select * from fleet.fleet_tran_type_get_fims('JONO');
DELETE FROM fleet.fleet_tran_type WHERE upper('jono') = ANY (fims_purchase_types) RETURNING *;
