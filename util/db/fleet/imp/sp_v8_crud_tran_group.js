create or replace function fleet.fleet_tran_group_get_fims(i_registration varchar(20), i_purchase_type varchar(20)) returns integer as $$
var iReg = i_registration.toUpperCase();
var sqlFind =
	"SELECT id FROM fleet.fleet_tran_group WHERE $1 = ANY (fims_registrations) AND $2 = ANY (fims_purchase_types)";
//var sqlInsert = 'INSERT INTO fleet.fleet_tran_group (name, fims_names) VALUES ($1, $2) RETURNING id';
var jRes = plv8.execute(sqlFind, [i_registration, i_purchase_type]);
if (jRes.length == 1) {
	return jRes[0].id;
} else if (jRes.length == 0) {
	throw "wobbly, no tran_group found for: " +
		i_registration + ", " + i_purchase_type;
} else {
	throw "wobbly, found too many tran_groups for:" + i_registration + ', ' + i_purchase_type;
}

$$ language plv8;

select * from fleet.fleet_tran_group_get_fims('NV12225', 'FUEL') id;
select * from fleet.fleet_tran_group_get_fims('NV12502', 'MISC') id;
--should throw wobbly
select * from fleet.fleet_tran_group_get_fims('JONO ZN', 'MISC') id;
