(function() {
	getNameFromArray = function(tblName, arrFld, strFld, str) {
		var sqlFind =
			"select id from " +
			tblName +
			" where upper($1) = ANY (" +
			arrFld +
			")";
		var sqlInsert =
			"INSERT INTO " +
			tblName +
			" (" +
			strFld +
			", " +
			arrFld +
			") VALUES ($1, $2) RETURNING id";

		var jRes = plv8.execute(sqlFind, [str]);
		if (jRes.length == 1) {
			return jRes[0].id;
		} else if (jRes.length == 0) {
			return plv8.execute(sqlInsert, [
				str.toProperCase(),
				[str.toUpperCase()]
			])[0].id;
		} else {
			throw "wobbly, found too many rows for:" +
				str +
				" in table:" +
				tblName;
		}
	};
})();
