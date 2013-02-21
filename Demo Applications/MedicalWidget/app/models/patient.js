var Alloy = require('alloy');

exports.definition = {
	config: {
		"columns": {
			"LASTNAME": "TEXT",
			"FIRSTNAME": "TEXT",
			"ID": "INTEGER",
			"DOCTORID": "INTEGER",
			"NURSEID": "INTEGER"
		},
		"adapter": {
			"type": "sql_new",
			"collection_name": "patient",
			"idAttribute": "id",
			"db_name": Alloy.Globals.dbPath
		}
	}	
}

