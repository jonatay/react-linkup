
create or replace function fleet.driver_get_fims(i_name varchar(20)) returns integer as $$
	var sqlFind = "select id FROM fleet.driver where upper($1) = ANY (fims_names)";
	var sqlInsert = 'INSERT INTO fleet.driver (name, fims_names) VALUES ($1, $2) RETURNING id';
	var jRes = plv8.execute(sqlFind, [i_name]);
	if (jRes.length == 1) {
		return jRes[0].id;
	} else if (jRes.length == 0) {
		return plv8.execute(sqlInsert, [i_name.toProperCase(), [i_name.toUpperCase()]])[0].id;
	} else {
		throw 'wobbly, found too many drivers for:'+i_name;
	};

$$ language plv8;

select * from fleet.driver_get_fims('test') id;
select * from fleet.driver_get_fims('TEST');
select * from fleet.driver_get_fims('WHATEVER');
select * from fleet.driver_get_fims('jono');
select * from fleet.driver_get_fims('JONO');
DELETE FROM fleet.driver WHERE upper('jono') = ANY (fims_names) RETURNING *;
-- select * from fleet.driver_insert_fims_name('jonp')
