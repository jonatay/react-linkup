create or replace
		function fleet.vehicle_get_fims(i_name varchar(30), i_registration varchar(10), i_driver varchar(30)) returns integer as $$

suName = i_name.toUpperCase();
suReg = i_registration.toUpperCase();
suDriver = i_driver.toUpperCase();
var sqlFind =
	"SELECT id FROM fleet.vehicle WHERE $1 = ANY (fims_names) " +
	"AND $2 = ANY (fims_registrations) " +
	"AND $3 = ANY (fims_drivers) ";

var aFind = plv8.execute(sqlFind, [suName, suReg, suDriver]);
if (aFind.length == 1) {
	//found 1 - returning id
	return aFind[0].id;
} else if (aFind.length == 0) {
	//found 0 - check if veh exists via reg
	sqlFindReg =
		"SELECT * FROM fleet.vehicle WHERE UPPER(registration) = UPPER($1)";
	var aFindReg = plv8.execute(sqlFindReg, [suReg]);
	if (aFindReg.length == 1) {
		// found veh, just update its fims_keys
		jVeh = aFindReg[0];
		if (jVeh.fims_names.indexOf(suName)) {
			jVeh.fims_names.push(suName);
		}
		if (jVeh.fims_registrations.indexOf(suReg)) {
			jVeh.fims_registrations.push(suReg);
		}
		if (jVeh.fims_drivers.indexOf(suDriver)) {
			jVeh.fims_drivers.push(suDriver);
		}
		sqlUpdate =
			"UPDATE fleet.vehicle SET (fims_names, fims_registrations, fims_drivers) = ($2,$3,$4) " +
			"WHERE registration=$1 RETURNING id";
		return plv8.execute(sqlUpdate, [suReg, jVeh.fims_names, jVeh.fims_registrations, jVeh.fims_drivers])[0].id;
	} else if (aFindReg.length == 0) {
		// no veh, insert new
		var sqlInsert =
			"INSERT INTO fleet.vehicle (name, registration, fims_registrations, fims_names, fims_drivers) " +
			"VALUES ($1,$2,$3,$4,$5) RETURNING id";
		return plv8.execute(sqlInsert, [
			i_name.toProperCase(),
			suReg,
			[suReg],
			[suName],
			[suDriver]
		])[0].id;
	} else {
		throw "wobbly, found too many vehicles for:" + i_registration;
	}
} else {
	throw (
		"wobbly, found too many vehicles for:" + i_name,
		+", " + i_registration + ", " + i_driver
	);
}

$$ language plv8;

SELECT * FROM fleet.vehicle_get_fims('Jonos super super','JONO ZN','Jono');
SELECT * FROM fleet.vehicle_get_fims('Jonos super dooper','jono ZN','jt');
SELECT * FROM fleet.vehicle_get_fims('Jonos super wooper','JONO zn','Jono');
DELETE FROM fleet.vehicle WHERE registration = 'JONO ZN' RETURNING *;
