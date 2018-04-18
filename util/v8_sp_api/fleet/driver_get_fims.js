
--DROP FUNCTION fleet.driver_get_fims(i_name varchar(20));
CREATE OR REPLACE FUNCTION fleet.driver_get_fims(i_name varchar(20), i_registration varchar(20)) returns integer as $$
	var sqlFind = "SELECT id FROM fleet.driver WHERE UPPER($1) = ANY (fims_names) AND UPPER($2) = ANY (fims_registrations)";
	var sqlInsert = 'INSERT INTO fleet.driver (name, fims_names, fims_registrations) VALUES ($1, $2, $3) RETURNING id';
	var jRes = plv8.execute(sqlFind, [i_name, i_registration]);
	if (jRes.length == 1) {
		return jRes[0].id;
	} else if (jRes.length == 0) {
		return plv8.execute(sqlInsert, [i_name.toProperCase(), [i_name.toUpperCase()], [i_registration.toUpperCase()]])[0].id;
	} else {
		throw 'wobbly, found too many drivers for:'+i_name;
	};

$$ language plv8;

select * from fleet.driver_get_fims('test', 'nv1234') id;
select * from fleet.driver_get_fims('TEST', 'nv1234');
select * from fleet.driver_get_fims('WHATEVER', 'nv1234');
select * from fleet.driver_get_fims('jono', 'nv1234');
select * from fleet.driver_get_fims('JONO', 'nv1234');
DELETE FROM fleet.driver WHERE upper('jono') = ANY (fims_names) RETURNING *;
DELETE FROM fleet.driver WHERE upper('WHATEVER') = ANY (fims_names) RETURNING *;
-- select * from fleet.driver_insert_fims_name('jonp')
