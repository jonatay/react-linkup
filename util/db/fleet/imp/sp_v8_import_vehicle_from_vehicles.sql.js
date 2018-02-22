DROP FUNCTION fleet.import_vehicle_from_vehicles();
CREATE OR REPLACE FUNCTION fleet.import_vehicle_from_vehicles() returns JSON as $$
//
//// select all fleet.vehicles - including c_c_v -> for each {vs} also got {vs_ccids}
var sqlVs =
	"SELECT v.registration, v.vehicle_description, v.driver_name, array_agg(cc.id) AS cc_ids " +
	" FROM fleet.vehicles v " +
	"LEFT JOIN fleet.cost_centre_vehicle ccv ON ccv.vehicle_id = v.id " +
	"LEFT JOIN fleet.cost_centre cc ON cc.id = ccv.cost_centre_id " +
	"GROUP BY v.registration, v.vehicle_description, v.driver_name";
// select from fleet.vehicle {v} where registration matches
var sqlV =
	"SELECT v.id, array_agg(cc.id) AS cc_ids FROM fleet.vehicle v " +
	"LEFT JOIN fleet.vehicle_cost_centre vcc ON vcc.vehicle_id = v.id " +
	"LEFT JOIN fleet.cost_centre cc ON cc.id = vcc.cost_centre_id " +
	"WHERE v.registration = $1" +
	"GROUP BY v.id ";
// if {v} i.e. found
//     select {v_ccids} from v_c_c
//			if !{v_ccids} then insert {vs_ccids} for {v.id}
var sqlCcidInsert =
	"INSERT INTO fleet.vehicle_cost_centre " +
	" (vehicle_id, cost_centre_id) VALUES ($1, $2) ";
// if !{v}
//    insert {vs} and get new {v}
var sqlVehicleInsert =
	"INSERT INTO fleet.vehicle " +
	" (name, registration, fims_registrations, fims_names, fims_drivers) " +
	" VALUES ( $1, $2, ARRAY[$3], ARRAY[$4], ARRAY[$5] ) " +
	" RETURNING id, ARRAY[]::text[] AS cc_ids";
//    insert {vs_ccids} for {v.id}

// return {vs.reg} , {v action}, {vs_ccids action}
var res = [];
var rwsVs = plv8.execute(sqlVs);
for (var vs = 0; vs < rwsVs.length; vs++) {
	var recVs = rwsVs[vs];
	var vsReg = recVs.registration.trim();
	var vsCcids = recVs.cc_ids;
	var rwsF = plv8.execute(sqlV, [vsReg]);
	if (rwsF.length === 0) {
		rwsF = plv8.execute(sqlVehicleInsert, [
			recVs.vehicle_description.toProperCase(),
			vsReg,vsReg,
			recVs.vehicle_description,
			recVs.driver_name
		]);
		res.push({ status: "INSERT vehicle", vsReg: vsReg, vId: rwsF[0].id });
	}
	if (rwsF.length === 1) {
		var vId = rwsF[0].id;
		var vCcids = rwsF[0].cc_ids;
		var ccIds = _.difference(vsCcids, vCcids);
		for (var i = 0; i < ccIds.length; i++) {
			var ccId = ccIds[i];
			plv8.execute(sqlCcidInsert, [vId, ccId]);
		}
		res.push({
			status: "found vehicle",
			vsReg: vsReg,
			vId: vId,
			ccIds: ccIds
		});
	} else {
		res.push({
			status: "**FOUND MULTIPLE V**",
			vsReg: vsReg,
			vsCcids: vsCcids
		});
	}
}
return res;
//
//
$$ language plv8;

SELECT * FROM fleet.import_vehicle_from_vehicles();



