var Alloy = require('alloy');

exports.definition = {
	
	config: {
		"columns": {
			"PATIENTID": "INTEGER",
			"TIME": "TEXT",
			"BP": "INTEGER"
		},
		"adapter": {
			"type": "sql_new",
			"collection_name": "bp",
			"db_name": Alloy.Globals.dbPath
		}
	}	
}

