var Alloy = require('alloy');

exports.definition = {
	config: {
		"columns": {
			"PATIENTID": "INTEGER",
			"TIME": "TEXT",
			"PULSE": "INTEGER",
			"O2": "INTEGER"
		},
		"adapter": {
			"type": "sql_new",
			"collection_name": "pulseox",
			"idAttribute": "patientid",
			"db_name": Alloy.Globals.dbPath
		}
	}
}

