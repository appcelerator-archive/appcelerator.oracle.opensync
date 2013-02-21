var Alloy = require('alloy');

exports.definition = {
	
	config: {
		"columns": {
			"LASTNAME": "TEXT",
			"FIRSTNAME": "TEXT",
			"ID": "INTEGER"
		},
		"adapter": {
			"type": "sql_new",
			"collection_name": "nurse",
			"idAttribute": "id",
			"db_name": Alloy.Globals.dbPath
		}
	}	
}

