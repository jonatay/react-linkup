
create or replace function fleet.merchant_get_fims(i_name varchar(20), i_town varchar(20), i_oil_coy varchar(20)) returns integer as $$
	var sqlFind = "select id FROM fleet.merchant where upper($1) = ANY (fims_names)";
	var sqlInsert = 'INSERT INTO fleet.merchant (name, fims_names, town, oil_coy) VALUES ($1, $2, $3, $4) RETURNING id';
	var jRes = plv8.execute(sqlFind, [i_name]);
	if (jRes.length == 1) {
		return jRes[0].id;
	} else if (jRes.length == 0) {
		return plv8.execute(sqlInsert, [i_name.toProperCase(), [i_name.toUpperCase()], i_town.toProperCase(), i_oil_coy.toUpperCase()])[0].id;
	} else {
		throw 'wobbly, found too many merchants for:'+i_name;
	};

$$ language plv8;

select * from fleet.merchant_get_fims('test', 'test', 'tst') id;
select * from fleet.merchant_get_fims('TEST', 'test', 'tst');
select * from fleet.merchant_get_fims('WHATEVER', 'test', 'tst');
select * from fleet.merchant_get_fims('jono', 'joville', 'jo');
select * from fleet.merchant_get_fims('JONO', 'joville', 'jo');
DELETE FROM fleet.merchant WHERE upper('jono') = ANY (fims_names) RETURNING *;
