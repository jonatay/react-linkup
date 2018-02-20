do $$

// quick (ha) script to convert old cost_centre (and related) to new tran_group
// gets distinct query (flat tbl) of all cost centre for each purch_type and registration
// sorts into distinct groups by cc.id then pushes into p_t, reg arrays
// finally insert/update groups

//find and build json tree
var sqlFind =
	"SELECT cc.id, cc.name, cc.description, cc.is_vat, pt.description AS purchase_type, " +
	" v.registration FROM fleet.cost_centre cc " +
	"JOIN fleet.cost_centre_purchase_type ccpt 	ON ccpt.cost_centre_id = cc.id " +
	"JOIN fleet.purchase_types pt 				ON pt.id = ccpt.purchase_type_id " +
	"JOIN fleet.cost_centre_vehicle ccv 		ON ccv.cost_centre_id = cc.id " +
	"JOIN fleet.vehicles v 						ON v.id = ccv .vehicle_id";
var ccs = plv8.execute(sqlFind);
var jTGrps = {};
for (var ixd = ccs.length - 1; ixd >= 0; ixd--) {
	var row = ccs[ixd];
	rowId = row.id;
	if (!jTGrps[rowId]) {
		jTGrps[rowId] = {
			name: row.name.toProperCase(),
			description: row.description.toProperCase(),
			is_vat: row.is_vat,
			registrations: [],
			purchase_types: []
		};
	}
	var reg = row.registration.trim();
	if (jTGrps[rowId].registrations.indexOf(reg) < 0) {
		jTGrps[rowId].registrations.push(reg);
	}
	var pt = row.purchase_type.trim();
	if (jTGrps[rowId].purchase_types.indexOf(pt) < 0) {
		jTGrps[rowId].purchase_types.push(pt);
	}
}

//insert json tree
for (var key in jTGrps) {
	if (jTGrps.hasOwnProperty(key)) {
		var group = jTGrps[key];
		//plv8.elog(NOTICE, group.purchase_types);
		var sqlInsert =
			"INSERT INTO fleet.fleet_tran_group" +
			" (name,description,is_vat,fims_registrations,fims_purchase_types)" +
			" VALUES ($1,$2,$3,$4,$5) ON CONFLICT (name) DO UPDATE " +
			" SET (description,is_vat,fims_registrations,fims_purchase_types)" +
			" = ($2,$3,$4,$5) WHERE fleet_tran_group.name = $1 RETURNING id, name," +
			" fims_registrations, fims_purchase_types";
		var jIns = plv8.execute(sqlInsert, [
			group.name,
			group.description,
			group.is_vat,
			group.registrations,
			group.purchase_types
		]);
		plv8.elog(NOTICE, JSON.stringify(jIns));
	}
}

//remove directors from other groups
// **TODO** REALLY NEED AN EDITOR **TODO**
var sqlFindDir =
	"SELECT name, fims_registrations, fims_purchase_types FROM fleet.fleet_tran_group WHERE name LIKE 'Directors%'";
var sqlFindRest =
	"SELECT id, name, fims_registrations FROM fleet.fleet_tran_group WHERE " +
	" fims_purchase_types = $1 AND name NOT LIKE 'Directors%'";

var aDirs = plv8.execute(sqlFindDir);
for (var i = aDirs.length - 1; i >= 0; i--) {
	var jDir = aDirs[i];
	var aGrps = plv8.execute(sqlFindRest, [jDir.fims_purchase_types]);
	for (var g = aGrps.length - 1; g >= 0; g--) {
		var jGrp = aGrps[g];
		//_.difference([1, 2, 3, 4, 5], [5, 2, 10]);
		// plv8.elog(NOTICE, jGrp.fims_registrations);
		var aRegDiff = _.difference(
			jGrp.fims_registrations,
			jDir.fims_registrations
		);
		// plv8.elog(NOTICE, jGrp.fims_registrations);
		var sqlUpdate = 
			"UPDATE fleet.fleet_tran_group SET (fims_registrations) = ($2) WHERE id=$1 RETURNING name, fims_registrations";
		var jUpd = plv8.execute(sqlUpdate, [jGrp.id, aRegDiff])[0];
		plv8.elog(NOTICE, jUpd.name + ', ' + jUpd.fims_registrations)
	}
}

// for (var i = jTGrps.length - 1; i >= 0; i--) {
// }

// plv8.elog(NOTICE, JSON.stringify(jTGrps));

$$ language plv8;
