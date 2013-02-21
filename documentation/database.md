# Oracle Opensync Module

## Database

The top-level Database proxy, used for creating and accessing the module's Berkeley Database.

### Berkeley Database

Berkeley DB is a general-purpose, high-performance, embedded database that is designed for high-throughput applications. The primary goal of Berkeley DB is to deliver fast, scalable and flexible data management services to your application while remaining transparent to the end-user. Berkeley DB executes in the same process as your application.

Berkeley DB provides the following features that are expected of client/server enterprise-scale SQL databases: high throughput, high availability, high concurrency, replication, low-latency reads, non-blocking writes, failure recovery, data scalability, in-memory caching, ACID transactions, automatic and catastrophic recovery. Berkeley DB offers advanced features in a self-contained, small footprint software library.

The mobile client was built to use the Berkeley DB SQL interface, which adds a SQL API to the Berkeley DB storage engine. The mobile client uses this interface to facilitate synchronization between the client and the back-end database.

Your interaction with the BDB SQL interface is almost identical to SQLite. You use the same APIs, the same command shell environment, the same SQL statements, and the same PRAGMAs to work with the database created by the BDB SQL interface as you would if you were using SQLite.

### Compatibility with Titanium.Database APIs

The Opensync module's Berkeley Database APIs are nearly 100% equivalent to the Titanium Database APIs. 

* opensync.Database is equivalent to Titanium.Database
* opensync.Database.DB is equivalent to Titanium.Database.DB
* opensync.Database.ResultSet is equivalent to Titanium.Database.ResultSet

In most cases, anywhere that you would use the Titanium.Database namespace you can replace with the opensync.Database namespace. The following example, taken from the `Database` application in the example folder, demonstrates this. The `database` variable is set to the namespace for the type of database that has been selected (either SQLite or Berkeley).

#### Example:

	var dbname;
	try {
		// Select the database API namespace to use
		//   For Berkeley, get the Database proxy from the Opensync module
		//   For SQLite, get the Database proxy from Titanium
		// API calls should be the same regardless of which API namespace is used
		if (switchDB.value) {
			database = require('ti.oracle.opensync.bdb').Database;
			dbname = 'testbdb';
		} else {
			database = Ti.Database;
			dbname = 'testsql';
		}
		db = database.open(dbname);
		// Create the 'people' table if it doesn't already exist.
		db.execute('CREATE TABLE IF NOT EXISTS people (name TEXT, phone_number TEXT, city TEXT)');
		// For demo purposes, clear out any existing data each time the database is opened
		db.execute('DELETE FROM people');
		statusText.value = "Database opened successfully";
	} catch (e) {
		statusText.value = "<Exception>"
	}

## Useful Links

[Oracle Berkeley DB](http://www.oracle.com/technetwork/products/berkeleydb/overview/index.html)
[Titanium.Database](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Database)
[Titanium.Database.DB](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Database.DB)
[Titanium.Database.ResultSet](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Database.ResultSet)

## Methods

### [Database.DB](db.html) open(dbName)

Opens a Berkeley DB database and returns a reference to it. If the database does not exist, creates an empty database file and returns a reference to this opened database.

Always close the database after use.

* dbname [string/Ti.Filesystem.File]: The database name to open or create. If a Ti.Filesystem.File object is specified the database will be open READONLY. 

_Throws exception on error_

## Constants

### FIELD\_TYPE\_DOUBLE
Constant for requesting a column's value returned in double form.
### FIELD\_TYPE\_FLOAT
Constant for requesting a column's value returned in float form.
### FIELD\_TYPE\_INT
Constant for requesting a column's value returned in integer form.
### FIELD\_TYPE\_STRING
Constant for requesting a column's value returned in string form.
### FIELD\_TYPE\_UNKNOWN

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.
