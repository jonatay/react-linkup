--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.4

-- Started on 2018-03-08 16:57:43

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 31 (class 2615 OID 70852259)
-- Name: fleet; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA fleet;


ALTER SCHEMA fleet OWNER TO postgres;

SET search_path = fleet, pg_catalog;

--
-- TOC entry 4621 (class 1255 OID 70852568)
-- Name: convert_vcc_to_vccg(); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION convert_vcc_to_vccg() RETURNS json
    LANGUAGE plv8
    AS $_$
//
//// for every vcc-cc (distinct)... (with ccg from cc)
const sqlSelect =
	"SELECT DISTINCT cc.cost_centre_group_id, vcc.vehicle_id FROM fleet.cost_centre cc " +
	"LEFT JOIN fleet.vehicle_cost_centre vcc ON vcc.cost_centre_id = cc.id";
// check for vccg exists...
const sqlFind =
	"SELECT id FROM fleet.vehicle_cost_centre_group vccg " +
	"WHERE vccg.vehicle_id = $1 AND vccg.cost_centre_group_id = $2";
// create if not
const sqlInsert =
	"INSERT INTO fleet.vehicle_cost_centre_group " +
	" (vehicle_id, cost_centre_group_id) VALUES ($1,$2)";
// do the thing...
var ret = [];
const rwsVcc = plv8.execute(sqlSelect);
_.each(rwsVcc, function(vcc, key, list) {
	var rwsVccg = plv8.execute(sqlFind, [
		vcc.vehicle_id,
		vcc.cost_centre_group_id
	]);
	if (rwsVccg.length === 0) {
		plv8.execute(sqlInsert, [vcc.vehicle_id, vcc.cost_centre_group_id]);
		ret.push({
			status: "NOT",
			vehicle_id: vcc.vehicle_id,
			cost_centre_group_id: vcc.cost_centre_group_id
		});
	} else {
		ret.push({
			status: "found",
			vehicle_id: vcc.vehicle_id,
			cost_centre_group_id: rwsVccg[0].cost_centre_group_id
		});
	}
});
// done the thing, returning feedback...
return ret;
//
$_$;


ALTER FUNCTION fleet.convert_vcc_to_vccg() OWNER TO postgres;

--
-- TOC entry 4610 (class 1255 OID 70852260)
-- Name: driver_get_fims(character varying); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION driver_get_fims(i_name character varying) RETURNS integer
    LANGUAGE plv8
    AS $_$

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



$_$;


ALTER FUNCTION fleet.driver_get_fims(i_name character varying) OWNER TO postgres;

--
-- TOC entry 4612 (class 1255 OID 70852261)
-- Name: driver_insert_fims_name(character varying); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION driver_insert_fims_name(i_name character varying) RETURNS integer
    LANGUAGE plv8
    AS $_$

	String.prototype.toProperCase = function () {

	    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

	};

	var sqlInsert = 'INSERT INTO fleet.driver (name, fims_names) VALUES ($1, $2) RETURNING id';

	return plv8.execute(sqlInsert, [i_name.toProperCase(), [i_name.toUpperCase()]]);

$_$;


ALTER FUNCTION fleet.driver_insert_fims_name(i_name character varying) OWNER TO postgres;

--
-- TOC entry 4613 (class 1255 OID 70852262)
-- Name: fleet_tran_group_get_fims(character varying, character varying); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION fleet_tran_group_get_fims(i_registration character varying, i_purchase_type character varying) RETURNS integer
    LANGUAGE plv8
    AS $_$

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



$_$;


ALTER FUNCTION fleet.fleet_tran_group_get_fims(i_registration character varying, i_purchase_type character varying) OWNER TO postgres;

--
-- TOC entry 4614 (class 1255 OID 70852263)
-- Name: fleet_tran_type_get_fims(character varying); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION fleet_tran_type_get_fims(i_name character varying) RETURNS integer
    LANGUAGE plv8
    AS $_$

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



$_$;


ALTER FUNCTION fleet.fleet_tran_type_get_fims(i_name character varying) OWNER TO postgres;

--
-- TOC entry 4609 (class 1255 OID 70852264)
-- Name: func_cost_centre(integer, integer, character varying); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION func_cost_centre(in_vehicle_id integer, in_purchase_type_id integer, in_period character varying) RETURNS SETOF record
    LANGUAGE plpgsql
    AS $$




	DECLARE




  	cost_centre_rec RECORD;




	BEGIN




  	FOR cost_centre_rec IN SELECT 




  			id, name, 0 AS vehicle_count 




  		FROM fleet.cost_centre 




  	LOOP




  		SELECT INTO 




  				cost_centre_rec.vehicle_count 




  				count(ccv.id) as vehicle_count 




  			FROM fleet.cost_centre_vehicle ccv 




  			WHERE ccv.cost_centre_id = cost_centre_rec.id;




  		RETURN NEXT cost_centre_rec;




  	END LOOP;




	END;




$$;


ALTER FUNCTION fleet.func_cost_centre(in_vehicle_id integer, in_purchase_type_id integer, in_period character varying) OWNER TO postgres;

--
-- TOC entry 4611 (class 1255 OID 70852265)
-- Name: func_cost_centre_report(integer, integer, character varying); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION func_cost_centre_report(in_vehicle_id integer, in_purchase_type_id integer, in_period character varying) RETURNS SETOF record
    LANGUAGE plpgsql
    AS $$




	DECLARE




  	cost_centre_rec RECORD;




  	rec_count integer;




	BEGIN




  	FOR cost_centre_rec IN SELECT 




  			id, name




  		FROM cost_centre




  	LOOP




  		--**** vehicle id ****--




  		IF in_vehicle_id >= 0 THEN




  			SELECT count(ccv.id) INTO rec_count 




  				FROM cost_centre_vehicle ccv




  				WHERE ccv.cost_centre_id = cost_centre_rec.id




  				AND ccv.vehicle_id = in_vehicle_id;




  			IF rec_count = 0 THEN




  				CONTINUE;




  			END IF;




  		END IF;




  		--**** purchase type id ****--




  		IF in_purchase_type_id >= 0 THEN




  			SELECT count(ccp.id) INTO rec_count 




  				FROM cost_centre_purchase_type ccp




  				WHERE ccp.cost_centre_id = cost_centre_rec.id




  					AND ccp.purchase_type_id = in_purchase_type_id;




  			IF rec_count = 0 THEN




  				CONTINUE;




  			END IF;




  		END IF;




			--**** done RETURN the Record ****---




  		RETURN NEXT cost_centre_rec;




  	END LOOP;




	END;




$$;


ALTER FUNCTION fleet.func_cost_centre_report(in_vehicle_id integer, in_purchase_type_id integer, in_period character varying) OWNER TO postgres;

--
-- TOC entry 4615 (class 1255 OID 70852266)
-- Name: import_fleet_from_fims(); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION import_fleet_from_fims() RETURNS json
    LANGUAGE plv8
    AS $_$
var maxId =
	plv8.execute("SELECT max(fims_voucher_id) FROM fleet.fleet_transaction")[0][
		"max"
	] || 0;
var rwsFimsV = plv8.execute(
	"SELECT * from fleet.fims_voucher WHERE id > $1 ORDER BY id",
	[maxId]
);
var result = { maxId: maxId, rwsFimsV: rwsFimsV.length, detail: [] };
load_module("get_name_from_array");
for (var i = 0; i < rwsFimsV.length; i++) {
	var fimV = rwsFimsV[i];
	// tran date
	var iYr = parseInt(fimV.transaction_date.substr(0, 4)); //20170727
	var iMth = parseInt(fimV.transaction_date.substr(4, 2)); //20170727
	var iDay = parseInt(fimV.transaction_date.substr(6, 2)); //20170727
	var dTran = new Date(iYr, iMth - 1, iDay + 1);
	//process date
	var iPYr = parseInt(fimV.process_date.substr(0, 4)); //20170727
	var iPMth = parseInt(fimV.process_date.substr(4, 2)); //20170727
	var iPDay = parseInt(fimV.process_date.substr(6, 2)); //20170727
	var dProc = new Date(iPYr, iPMth - 1, iPDay + 1);
	//tax yr
	var iTaxYr = iMth < 3 ? iYr : iYr + 1;
	//lookups (that ALWAYS return id, if missing-insert/upd EXCEPT tran_group)
	var idDriver = plv8.execute("SELECT * from fleet.driver_get_fims($1) id", 
		[fimV.driver])[0].id;
	var idTranType = plv8.execute(
		"SELECT * from fleet.fleet_tran_type_get_fims($1) id",
		[fimV.purchase_description]
	)[0].id;
	var idMerchant = plv8.execute(
		"SELECT * from fleet.merchant_get_fims($1,$2,$3) id",
		[fimV.merchant_name, fimV.merchant_town, fimV.oil_company]
	)[0].id;
	var idTranGroup = plv8.execute(
		"SELECT * from fleet.fleet_tran_group_get_fims($1,$2) id",
		[fimV.registration, fimV.purchase_description]
	)[0].id;
	var idVehicle = plv8.execute(
		"SELECT * FROM fleet.vehicle_get_fims($1,$2,$3) id",
		[fimV.vehicle_description, fimV.registration, fimV.driver]
	)[0].id;
	//transaction
	var jTran = {
		tax_year: iTaxYr,
		tax_month: iMth,
		transaction_date: dTran,
		process_date: dProc,
		registration: fimV.registration,
		tran_type_id: idTranType,
		tran_group_id: idTranGroup,
		vehicle_id: idVehicle,
		driver_id: idDriver,
		fims_voucher_id: fimV.id,
		merchant_id: idMerchant,
		amount: fimV.amount,
		odometer: fimV.odometer,
		jdata: {
			description: fimV.purchase_description,
			toll_lane: fimV.toll_lane,
			batch: fimV.batch,
			oil_litres: fimV.oil_litres,
			private_usage: fimV.private_usage,
			warnings: fimV.warnings,
			toll_vehicle_class: fimV.toll_vehicle_class,
			toll_transaction_type: fimV.toll_transaction_type,
			toll_match_indicator: fimV.toll_match_indicator,
			toll_discount: fimV.toll_discount,
			batch_index: fimV.batch_index,
			request_period: fimV.request_period
		}
	};
	var sqlInsert =
		"INSERT INTO fleet.fleet_transaction ( " +
		" tax_year, " +
		" tax_month, " +
		" transaction_date, " +
		" process_date, " +
		" registration, " +
		" tran_type_id, " +
		" tran_group_id, " +
		" vehicle_id, " +
		" driver_id, " +
		" fims_voucher_id, " +
		" merchant_id, " +
		" amount, " +
		" odometer, " +
		" jdata " +
		") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id";
	//result.detail.push(tran);
	result.detail.push(
		plv8.execute(sqlInsert, [
			jTran.tax_year,
			jTran.tax_month,
			jTran.transaction_date,
			jTran.process_date,
			jTran.registration,
			jTran.tran_type_id,
			jTran.tran_group_id,
			jTran.vehicle_id,
			jTran.driver_id,
			jTran.fims_voucher_id,
			jTran.merchant_id,
			jTran.amount,
			jTran.odometer,
			jTran.jdata
		])[0].id
	);
}
return result;

$_$;


ALTER FUNCTION fleet.import_fleet_from_fims() OWNER TO postgres;

--
-- TOC entry 4620 (class 1255 OID 70852567)
-- Name: import_vehicle_from_vehicles(); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION import_vehicle_from_vehicles() RETURNS json
    LANGUAGE plv8
    AS $_$
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
$_$;


ALTER FUNCTION fleet.import_vehicle_from_vehicles() OWNER TO postgres;

--
-- TOC entry 4616 (class 1255 OID 70852267)
-- Name: merchant_get_fims(character varying, character varying, character varying); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION merchant_get_fims(i_name character varying, i_town character varying, i_oil_coy character varying) RETURNS integer
    LANGUAGE plv8
    AS $_$

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



$_$;


ALTER FUNCTION fleet.merchant_get_fims(i_name character varying, i_town character varying, i_oil_coy character varying) OWNER TO postgres;

--
-- TOC entry 4617 (class 1255 OID 70852268)
-- Name: vehicle_get_by_role_daterange(character varying, date, date); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION vehicle_get_by_role_daterange(i_role character varying, i_from date, i_to date) RETURNS json
    LANGUAGE plv8 IMMUTABLE
    AS $_$

var sqlGet = "SELECT v.registration, v.id AS vehicle_id, v.name AS vehicle_name, " +
  " d.id AS driver_id, d.name AS driver_name, " +
  " tg.id AS fleet_tran_group_id, tg.name AS fleet_tran_group, " +
  " tt.id AS fleet_tran_type_id, tt.name AS fleet_tran_type, " +
  " SUM(ft.amount) AS amount, COUNT(ft.*) AS tran_count, " +
  " MIN(ft.odometer) AS min_odometer, MAX(ft.odometer) AS max_odometer " +
  "FROM fleet.fleet_transaction ft " +
  "JOIN fleet.fleet_tran_group tg ON tg.id = ft.tran_group_id " +
  "JOIN fleet.fleet_permission fp ON tg.id = ANY(fp.ids) AND $1 = ANY(fp.roles) " +
  "JOIN fleet.vehicle v on v.id = ft.vehicle_id " +
  "JOIN fleet.driver d on d.id = ft.driver_id " +
  "JOIN fleet.fleet_tran_type tt ON tt.id = ft.tran_type_id " +
  "WHERE ft.transaction_date BETWEEN $2 AND $3 " +
  "GROUP BY v.registration, v.id, v.name, d.id, d.name, tg.id, tg.name, tt.id, tt.name " +
  "ORDER BY v.registration, tg.name, tt.name ";

var aData = plv8.execute(sqlGet, [i_role, i_from, i_to]);
var aResult = [];
var jVehicle = {};

for (var i = aData.length - 1; i >= 0; i--) {
  var jRow = aData[i];
  // test if 1. vehicle blank OR 2. vehicle id changed
  if (!jVehicle.id || jVehicle.id != jRow.vehicle_id) {
    // if id changed, but not first
    if (jVehicle.id) {
      aResult.push(jVehicle);
    }
    // create new one
    jVehicle = {
      registration: jRow.registration,
      id: jRow.vehicle_id,
      name: jRow.vehicle_name,
      open_odometer: -1,
      close_odometer: -1,
      driver: {
        id: jRow.driver_id,
        name: jRow.driver_name
      },
      transactions: []
    }
  }
  // insert tran data
  jVehicle.transactions.push({
    tran_type_id: jRow.fleet_tran_type_id,
    tran_type_name: jRow.fleet_tran_type,
    tran_group_id: jRow.fleet_tran_group_id,
    tran_group_name: jRow.fleet_tran_group,
    amount: jRow.amount
  });
  //odometer
  if (jVehicle.open_odometer === -1 || jVehicle.open_odometer > jRow.min_odometer) {
    jVehicle.open_odometer = jRow.min_odometer;
  }
  if (jVehicle.close_odometer < jRow.max_odometer) {
    jVehicle.close_odometer = jRow.max_odometer;
  }
}
// push the last
aResult.push(jVehicle);

return aResult;
$_$;


ALTER FUNCTION fleet.vehicle_get_by_role_daterange(i_role character varying, i_from date, i_to date) OWNER TO postgres;

--
-- TOC entry 4618 (class 1255 OID 70852269)
-- Name: vehicle_get_fims(character varying, character varying, character varying); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION vehicle_get_fims(i_name character varying, i_registration character varying, i_driver character varying) RETURNS integer
    LANGUAGE plv8
    AS $_$



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



$_$;


ALTER FUNCTION fleet.vehicle_get_fims(i_name character varying, i_registration character varying, i_driver character varying) OWNER TO postgres;

--
-- TOC entry 4619 (class 1255 OID 70852569)
-- Name: vehicle_get_list(); Type: FUNCTION; Schema: fleet; Owner: postgres
--

CREATE FUNCTION vehicle_get_list() RETURNS SETOF json
    LANGUAGE plv8 IMMUTABLE
    AS $_$

const sqlSelect = "SELECT * from fleet.vehicle";
const sqlSelCcg = "SELECT * from fleet.cost_centre_group ccg "+
"JOIN fleet.vehicle_cost_centre_group vccg ON vccg.cost_centre_group_id = ccg.id "+
" WHERE vccg.vehicle_id = $1"

rwsV = plv8.execute(sqlSelect);
_.each(rwsV, function(vehicle) {
	var ret = JSON.parse(JSON.stringify(vehicle)); 
	ret.cost_centre_groups = plv8.execute(sqlSelCcg,[vehicle.id])
	plv8.return_next(ret);
});

$_$;


ALTER FUNCTION fleet.vehicle_get_list() OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 4432 (class 1259 OID 70852270)
-- Name: cost_centre; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE cost_centre (
    id integer NOT NULL,
    name character varying,
    description text,
    registrations text,
    purchase_types text,
    is_vat boolean,
    sequence integer,
    cost_centre_group_id integer
);


ALTER TABLE cost_centre OWNER TO postgres;

--
-- TOC entry 4447 (class 1259 OID 70852520)
-- Name: cost_centre_group; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE cost_centre_group (
    id integer NOT NULL,
    name character varying(20),
    description character varying
);


ALTER TABLE cost_centre_group OWNER TO postgres;

--
-- TOC entry 4446 (class 1259 OID 70852518)
-- Name: cost_centre_group_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE cost_centre_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cost_centre_group_id_seq OWNER TO postgres;

--
-- TOC entry 18983 (class 0 OID 0)
-- Dependencies: 4446
-- Name: cost_centre_group_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE cost_centre_group_id_seq OWNED BY cost_centre_group.id;


--
-- TOC entry 4433 (class 1259 OID 70852276)
-- Name: cost_centre_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE cost_centre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cost_centre_id_seq OWNER TO postgres;

--
-- TOC entry 18984 (class 0 OID 0)
-- Dependencies: 4433
-- Name: cost_centre_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE cost_centre_id_seq OWNED BY cost_centre.id;


--
-- TOC entry 4434 (class 1259 OID 70852288)
-- Name: driver; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE driver (
    id integer NOT NULL,
    name character varying(30),
    employee_code character varying(5),
    fims_names character varying(20)[],
    employee_id integer,
    jdata json
);


ALTER TABLE driver OWNER TO postgres;

--
-- TOC entry 4435 (class 1259 OID 70852294)
-- Name: driver_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE driver_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE driver_id_seq OWNER TO postgres;

--
-- TOC entry 18985 (class 0 OID 0)
-- Dependencies: 4435
-- Name: driver_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE driver_id_seq OWNED BY driver.id;


--
-- TOC entry 4436 (class 1259 OID 70852296)
-- Name: fims_period; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE fims_period (
    id integer NOT NULL,
    cal_year integer,
    cal_month integer,
    when_received timestamp without time zone,
    rows_received integer,
    must_refresh boolean DEFAULT false,
    account character varying(10),
    batch_total numeric(10,2),
    jdata json,
    rows_transactions integer,
    transactions_total numeric(10,2),
    when_imported timestamp without time zone
);


ALTER TABLE fims_period OWNER TO postgres;

--
-- TOC entry 4437 (class 1259 OID 70852300)
-- Name: fims_period_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE fims_period_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fims_period_id_seq OWNER TO postgres;

--
-- TOC entry 18986 (class 0 OID 0)
-- Dependencies: 4437
-- Name: fims_period_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE fims_period_id_seq OWNED BY fims_period.id;


--
-- TOC entry 4438 (class 1259 OID 70852302)
-- Name: fims_voucher; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE fims_voucher (
    id integer NOT NULL,
    cut_off_date character varying(10),
    registration character varying(10),
    batch character varying(10),
    driver character varying(50),
    vehicle_description character varying(50),
    transaction_date character varying(10),
    process_date character varying(10),
    merchant_name character varying(50),
    merchant_town character varying(50),
    oil_company character varying(25),
    odometer character varying(15),
    fuel_litres character varying(15),
    oil_litres character varying(15),
    private_usage character(1),
    warnings text,
    purchase_description character varying(50),
    toll_lane character varying(20),
    toll_vehicle_class character varying(15),
    toll_transaction_type character varying(20),
    toll_match_indicator character varying(25),
    amount character varying(11),
    toll_discount character varying(15),
    batch_index integer,
    fims_period_id integer
);


ALTER TABLE fims_voucher OWNER TO postgres;

--
-- TOC entry 4439 (class 1259 OID 70852308)
-- Name: fims_voucher_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE fims_voucher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fims_voucher_id_seq OWNER TO postgres;

--
-- TOC entry 18987 (class 0 OID 0)
-- Dependencies: 4439
-- Name: fims_voucher_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE fims_voucher_id_seq OWNED BY fims_voucher.id;


--
-- TOC entry 4440 (class 1259 OID 70852326)
-- Name: fleet_transaction; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE fleet_transaction (
    id integer NOT NULL,
    tax_year integer,
    tax_month integer,
    transaction_date date,
    process_date date,
    registration character varying(10),
    cost_centre_id integer,
    vehicle_id integer,
    driver_id integer,
    fims_voucher_id integer,
    merchant_id integer,
    amount numeric(9,2),
    jdata json,
    transaction_type_id integer
);


ALTER TABLE fleet_transaction OWNER TO postgres;

--
-- TOC entry 4441 (class 1259 OID 70852332)
-- Name: fleet_transaction_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE fleet_transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fleet_transaction_id_seq OWNER TO postgres;

--
-- TOC entry 18988 (class 0 OID 0)
-- Dependencies: 4441
-- Name: fleet_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE fleet_transaction_id_seq OWNED BY fleet_transaction.id;


--
-- TOC entry 4442 (class 1259 OID 70852342)
-- Name: merchant; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE merchant (
    id integer NOT NULL,
    name character varying(30),
    town character varying(30),
    oil_coy character varying(30),
    fims_names character varying(30)[],
    jdata json
);


ALTER TABLE merchant OWNER TO postgres;

--
-- TOC entry 4443 (class 1259 OID 70852348)
-- Name: merchant_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE merchant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE merchant_id_seq OWNER TO postgres;

--
-- TOC entry 18989 (class 0 OID 0)
-- Dependencies: 4443
-- Name: merchant_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE merchant_id_seq OWNED BY merchant.id;


--
-- TOC entry 4449 (class 1259 OID 70852536)
-- Name: transaction_type; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE transaction_type (
    id integer NOT NULL,
    name character varying(20),
    fims_purchase_types character varying(20)[],
    vat_rate numeric(4,2),
    jdata json
);


ALTER TABLE transaction_type OWNER TO postgres;

--
-- TOC entry 4453 (class 1259 OID 70852600)
-- Name: transaction_type_cost_centre; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE transaction_type_cost_centre (
    id integer NOT NULL,
    transaction_type_id integer,
    cost_centre_id integer,
    start_date date
);


ALTER TABLE transaction_type_cost_centre OWNER TO postgres;

--
-- TOC entry 4452 (class 1259 OID 70852598)
-- Name: transaction_type_cost_centre_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE transaction_type_cost_centre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE transaction_type_cost_centre_id_seq OWNER TO postgres;

--
-- TOC entry 18990 (class 0 OID 0)
-- Dependencies: 4452
-- Name: transaction_type_cost_centre_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE transaction_type_cost_centre_id_seq OWNED BY transaction_type_cost_centre.id;


--
-- TOC entry 4448 (class 1259 OID 70852534)
-- Name: transaction_type_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE transaction_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE transaction_type_id_seq OWNER TO postgres;

--
-- TOC entry 18991 (class 0 OID 0)
-- Dependencies: 4448
-- Name: transaction_type_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE transaction_type_id_seq OWNED BY transaction_type.id;


--
-- TOC entry 4444 (class 1259 OID 70852355)
-- Name: vehicle; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE vehicle (
    id integer NOT NULL,
    name character varying(30),
    registration character varying(10),
    make character varying(20),
    model character varying(30),
    year integer,
    fims_registrations character varying(10)[],
    fims_names character varying(30)[],
    fims_drivers character varying(30)[],
    jdata json,
    is_active boolean DEFAULT true
);


ALTER TABLE vehicle OWNER TO postgres;

--
-- TOC entry 4451 (class 1259 OID 70852548)
-- Name: vehicle_cost_centre_group; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE vehicle_cost_centre_group (
    id integer NOT NULL,
    cost_centre_group_id integer,
    vehicle_id integer,
    start_date date
);


ALTER TABLE vehicle_cost_centre_group OWNER TO postgres;

--
-- TOC entry 4450 (class 1259 OID 70852546)
-- Name: vehicle_cost_centre_group_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE vehicle_cost_centre_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vehicle_cost_centre_group_id_seq OWNER TO postgres;

--
-- TOC entry 18992 (class 0 OID 0)
-- Dependencies: 4450
-- Name: vehicle_cost_centre_group_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE vehicle_cost_centre_group_id_seq OWNED BY vehicle_cost_centre_group.id;


--
-- TOC entry 4455 (class 1259 OID 70852628)
-- Name: vehicle_driver; Type: TABLE; Schema: fleet; Owner: postgres
--

CREATE TABLE vehicle_driver (
    id integer NOT NULL,
    vehicle_id integer,
    driver_id integer,
    start_date date
);


ALTER TABLE vehicle_driver OWNER TO postgres;

--
-- TOC entry 4454 (class 1259 OID 70852626)
-- Name: vehicle_driver_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE vehicle_driver_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vehicle_driver_id_seq OWNER TO postgres;

--
-- TOC entry 18993 (class 0 OID 0)
-- Dependencies: 4454
-- Name: vehicle_driver_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE vehicle_driver_id_seq OWNED BY vehicle_driver.id;


--
-- TOC entry 4445 (class 1259 OID 70852361)
-- Name: vehicle_id_seq; Type: SEQUENCE; Schema: fleet; Owner: postgres
--

CREATE SEQUENCE vehicle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vehicle_id_seq OWNER TO postgres;

--
-- TOC entry 18994 (class 0 OID 0)
-- Dependencies: 4445
-- Name: vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: fleet; Owner: postgres
--

ALTER SEQUENCE vehicle_id_seq OWNED BY vehicle.id;


--
-- TOC entry 18804 (class 2604 OID 70852376)
-- Name: cost_centre id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY cost_centre ALTER COLUMN id SET DEFAULT nextval('cost_centre_id_seq'::regclass);


--
-- TOC entry 18813 (class 2604 OID 70852523)
-- Name: cost_centre_group id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY cost_centre_group ALTER COLUMN id SET DEFAULT nextval('cost_centre_group_id_seq'::regclass);


--
-- TOC entry 18805 (class 2604 OID 70852379)
-- Name: driver id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY driver ALTER COLUMN id SET DEFAULT nextval('driver_id_seq'::regclass);


--
-- TOC entry 18806 (class 2604 OID 70852380)
-- Name: fims_period id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fims_period ALTER COLUMN id SET DEFAULT nextval('fims_period_id_seq'::regclass);


--
-- TOC entry 18808 (class 2604 OID 70852381)
-- Name: fims_voucher id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fims_voucher ALTER COLUMN id SET DEFAULT nextval('fims_voucher_id_seq'::regclass);


--
-- TOC entry 18809 (class 2604 OID 70852384)
-- Name: fleet_transaction id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fleet_transaction ALTER COLUMN id SET DEFAULT nextval('fleet_transaction_id_seq'::regclass);


--
-- TOC entry 18810 (class 2604 OID 70852386)
-- Name: merchant id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY merchant ALTER COLUMN id SET DEFAULT nextval('merchant_id_seq'::regclass);


--
-- TOC entry 18814 (class 2604 OID 70852539)
-- Name: transaction_type id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY transaction_type ALTER COLUMN id SET DEFAULT nextval('transaction_type_id_seq'::regclass);


--
-- TOC entry 18816 (class 2604 OID 70852603)
-- Name: transaction_type_cost_centre id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY transaction_type_cost_centre ALTER COLUMN id SET DEFAULT nextval('transaction_type_cost_centre_id_seq'::regclass);


--
-- TOC entry 18811 (class 2604 OID 70852388)
-- Name: vehicle id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY vehicle ALTER COLUMN id SET DEFAULT nextval('vehicle_id_seq'::regclass);


--
-- TOC entry 18815 (class 2604 OID 70852551)
-- Name: vehicle_cost_centre_group id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY vehicle_cost_centre_group ALTER COLUMN id SET DEFAULT nextval('vehicle_cost_centre_group_id_seq'::regclass);


--
-- TOC entry 18817 (class 2604 OID 70852631)
-- Name: vehicle_driver id; Type: DEFAULT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY vehicle_driver ALTER COLUMN id SET DEFAULT nextval('vehicle_driver_id_seq'::regclass);


--
-- TOC entry 18837 (class 2606 OID 70852528)
-- Name: cost_centre_group cost_centre_group_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY cost_centre_group
    ADD CONSTRAINT cost_centre_group_pkey PRIMARY KEY (id);


--
-- TOC entry 18819 (class 2606 OID 70852392)
-- Name: cost_centre cost_centre_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY cost_centre
    ADD CONSTRAINT cost_centre_pkey PRIMARY KEY (id);


--
-- TOC entry 18821 (class 2606 OID 70852398)
-- Name: driver driver_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY driver
    ADD CONSTRAINT driver_pkey PRIMARY KEY (id);


--
-- TOC entry 18823 (class 2606 OID 70852589)
-- Name: fims_period fims_period_cal_year_cal_month_key; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fims_period
    ADD CONSTRAINT fims_period_cal_year_cal_month_key UNIQUE (cal_year, cal_month);


--
-- TOC entry 18825 (class 2606 OID 70852400)
-- Name: fims_period fims_period_pk; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fims_period
    ADD CONSTRAINT fims_period_pk PRIMARY KEY (id);


--
-- TOC entry 18827 (class 2606 OID 70852576)
-- Name: fims_voucher fims_voucher_fims_period_id_batch_index_key; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fims_voucher
    ADD CONSTRAINT fims_voucher_fims_period_id_batch_index_key UNIQUE (fims_period_id, batch_index);


--
-- TOC entry 18833 (class 2606 OID 70852406)
-- Name: merchant merchant_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY merchant
    ADD CONSTRAINT merchant_pkey PRIMARY KEY (id);


--
-- TOC entry 18831 (class 2606 OID 70852414)
-- Name: fleet_transaction transaction_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fleet_transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- TOC entry 18843 (class 2606 OID 70852605)
-- Name: transaction_type_cost_centre transaction_type_cost_centre_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY transaction_type_cost_centre
    ADD CONSTRAINT transaction_type_cost_centre_pkey PRIMARY KEY (id);


--
-- TOC entry 18839 (class 2606 OID 70852544)
-- Name: transaction_type transaction_type_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY transaction_type
    ADD CONSTRAINT transaction_type_pkey PRIMARY KEY (id);


--
-- TOC entry 18841 (class 2606 OID 70852556)
-- Name: vehicle_cost_centre_group vehicle_cost_centre_group_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY vehicle_cost_centre_group
    ADD CONSTRAINT vehicle_cost_centre_group_pkey PRIMARY KEY (id);


--
-- TOC entry 18845 (class 2606 OID 70852633)
-- Name: vehicle_driver vehicle_driver_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY vehicle_driver
    ADD CONSTRAINT vehicle_driver_pkey PRIMARY KEY (id);


--
-- TOC entry 18835 (class 2606 OID 70852416)
-- Name: vehicle vehicle_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (id);


--
-- TOC entry 18829 (class 2606 OID 70852420)
-- Name: fims_voucher voucher_pkey; Type: CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fims_voucher
    ADD CONSTRAINT voucher_pkey PRIMARY KEY (id);


--
-- TOC entry 18846 (class 2606 OID 70852529)
-- Name: cost_centre cost_centre_cost_centre_group_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY cost_centre
    ADD CONSTRAINT cost_centre_cost_centre_group_id_fkey FOREIGN KEY (cost_centre_group_id) REFERENCES cost_centre_group(id);


--
-- TOC entry 18847 (class 2606 OID 70852423)
-- Name: driver driver_employee_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY driver
    ADD CONSTRAINT driver_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES hr.employee(id);


--
-- TOC entry 18848 (class 2606 OID 70852570)
-- Name: fims_voucher fims_voucher_fims_period_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fims_voucher
    ADD CONSTRAINT fims_voucher_fims_period_id_fkey FOREIGN KEY (fims_period_id) REFERENCES fims_period(id);


--
-- TOC entry 18853 (class 2606 OID 70852616)
-- Name: fleet_transaction fleet_transaction_cost_centre_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fleet_transaction
    ADD CONSTRAINT fleet_transaction_cost_centre_id_fkey FOREIGN KEY (cost_centre_id) REFERENCES cost_centre(id);


--
-- TOC entry 18849 (class 2606 OID 70852428)
-- Name: fleet_transaction fleet_transaction_driver_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fleet_transaction
    ADD CONSTRAINT fleet_transaction_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES driver(id);


--
-- TOC entry 18850 (class 2606 OID 70852433)
-- Name: fleet_transaction fleet_transaction_fims_voucher_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fleet_transaction
    ADD CONSTRAINT fleet_transaction_fims_voucher_id_fkey FOREIGN KEY (fims_voucher_id) REFERENCES fims_voucher(id);


--
-- TOC entry 18851 (class 2606 OID 70852438)
-- Name: fleet_transaction fleet_transaction_merchant_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fleet_transaction
    ADD CONSTRAINT fleet_transaction_merchant_id_fkey FOREIGN KEY (merchant_id) REFERENCES merchant(id);


--
-- TOC entry 18854 (class 2606 OID 70852621)
-- Name: fleet_transaction fleet_transaction_transaction_type_fk; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fleet_transaction
    ADD CONSTRAINT fleet_transaction_transaction_type_fk FOREIGN KEY (transaction_type_id) REFERENCES transaction_type(id);


--
-- TOC entry 18852 (class 2606 OID 70852453)
-- Name: fleet_transaction fleet_transaction_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY fleet_transaction
    ADD CONSTRAINT fleet_transaction_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 18858 (class 2606 OID 70852611)
-- Name: transaction_type_cost_centre transaction_type_cost_centre_cost_centre_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY transaction_type_cost_centre
    ADD CONSTRAINT transaction_type_cost_centre_cost_centre_id_fkey FOREIGN KEY (cost_centre_id) REFERENCES cost_centre(id);


--
-- TOC entry 18857 (class 2606 OID 70852606)
-- Name: transaction_type_cost_centre transaction_type_cost_centre_transaction_type_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY transaction_type_cost_centre
    ADD CONSTRAINT transaction_type_cost_centre_transaction_type_id_fkey FOREIGN KEY (transaction_type_id) REFERENCES transaction_type(id);


--
-- TOC entry 18855 (class 2606 OID 70852557)
-- Name: vehicle_cost_centre_group vehicle_cost_centre_group_cost_centre_group_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY vehicle_cost_centre_group
    ADD CONSTRAINT vehicle_cost_centre_group_cost_centre_group_id_fkey FOREIGN KEY (cost_centre_group_id) REFERENCES cost_centre_group(id);


--
-- TOC entry 18856 (class 2606 OID 70852562)
-- Name: vehicle_cost_centre_group vehicle_cost_centre_group_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY vehicle_cost_centre_group
    ADD CONSTRAINT vehicle_cost_centre_group_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 18860 (class 2606 OID 70852639)
-- Name: vehicle_driver vehicle_driver_driver_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY vehicle_driver
    ADD CONSTRAINT vehicle_driver_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES driver(id);


--
-- TOC entry 18859 (class 2606 OID 70852634)
-- Name: vehicle_driver vehicle_driver_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: fleet; Owner: postgres
--

ALTER TABLE ONLY vehicle_driver
    ADD CONSTRAINT vehicle_driver_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


-- Completed on 2018-03-08 16:57:46

--
-- PostgreSQL database dump complete
--

