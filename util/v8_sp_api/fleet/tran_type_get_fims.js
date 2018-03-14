DROP FUNCTION fleet.transaction_type_get_fims(i_name varchar(30));
CREATE OR REPLACE FUNCTION fleet.transaction_type_get_fims(i_name varchar(30)) returns integer as $$
//
	var sqlFind = "select id FROM fleet.transaction_type where upper($1) = ANY (fims_purchase_types)";
	var sqlInsert = 'INSERT INTO fleet.transaction_type (name, fims_purchase_types) VALUES ($1, $2) RETURNING id';
	var jRes = plv8.execute(sqlFind, [i_name]);
	if (jRes.length == 1) {
		return jRes[0].id;
	} else if (jRes.length == 0) {
		return plv8.execute(sqlInsert, [i_name.toProperCase(), [i_name.toUpperCase()]])[0].id;
	} else {
		throw 'wobbly, found too many tran_types for:'+i_name;
	};
//
$$ language plv8;

select * from fleet.transaction_type_get_fims('tyres');
select * from fleet.transaction_type_get_fims('fuel');
select * from fleet.transaction_type_get_fims('brakes');
select * from fleet.transaction_type_get_fims('jono');
select * from fleet.transaction_type_get_fims('JONO');
DELETE FROM fleet.transaction_type WHERE upper('jono') = ANY (fims_purchase_types) RETURNING *;
