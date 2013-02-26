/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

module.exports = new function ()
{
	var finish;
	var valueOf;
	var opensync;
	var _databaseType = Ti.App.Properties.getString("database.type");
	var _Database;
	var _DbDir;
	
	this.init = function (testUtils)
	{
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;

		opensync = require('appcelerator.oracle.opensync');
		if (_databaseType == 'bdb') {
			_Database = opensync.Database;
		} else {
			_Database = Ti.Database;
		}
		
		// There isn't a property to get the application folder on Android, so we get the parent
		// of the cache folder
		var appDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory).parent;
		_DbDir = appDir.nativePath + '/databases/';
	};

	this.name = "appcelerator.oracle.opensync";

	// Test that module is loaded
	this.testModule = function (testRun)
	{
		// Verify that the module is defined
		valueOf(testRun, opensync).shouldBeObject();
		valueOf(testRun, _Database).shouldBeObject();

		finish(testRun);
	};

	// Test that all of the constants are defined
	this.testNamespace = function (testRun)
	{
		valueOf(testRun, _Database).shouldBeObject();

		valueOf(testRun, _Database.FIELD_TYPE_UNKNOWN).shouldBeNumber();
		valueOf(testRun, _Database.FIELD_TYPE_STRING).shouldBeNumber();
		valueOf(testRun, _Database.FIELD_TYPE_INT).shouldBeNumber();
		valueOf(testRun, _Database.FIELD_TYPE_FLOAT).shouldBeNumber();
		valueOf(testRun, _Database.FIELD_TYPE_DOUBLE).shouldBeNumber();

		valueOf(testRun, _Database.open).shouldBeFunction();

		finish(testRun);
	};

	this.testDatabaseProxy = function (testRun)
	{
		var db = _Database.open('test.db');
		valueOf(testRun, db).shouldBeObject();

		valueOf(testRun, db.close).shouldBeFunction();
		valueOf(testRun, db.execute).shouldBeFunction();
		valueOf(testRun, db.remove).shouldBeFunction();
		valueOf(testRun, db.getName).shouldBeFunction();
		valueOf(testRun, db.getLastInsertRowId).shouldBeFunction();
		valueOf(testRun, db.getRowsAffected).shouldBeFunction();

		valueOf(testRun, db.name).shouldBeString();
		valueOf(testRun, db.name).shouldBe('test.db');
		valueOf(testRun, db.lastInsertRowId).shouldBeNumber();
		valueOf(testRun, db.rowsAffected).shouldBeNumber();

		db.close();

		finish(testRun);
	};

	this.testDatabaseResultProxy = function (testRun)
	{
		var db = _Database.open('test.db');

		db.execute('CREATE TABLE IF NOT EXISTS people (name TEXT, phone_number TEXT, city TEXT)');
		var rows = db.execute('SELECT rowid,name,phone_number,city FROM people');

		valueOf(testRun, rows).shouldBeObject();
		valueOf(testRun, rows.close).shouldBeFunction();
		valueOf(testRun, rows.field).shouldBeFunction();
		valueOf(testRun, rows.getField).shouldBeFunction();
		valueOf(testRun, rows.fieldByName).shouldBeFunction();
		valueOf(testRun, rows.getFieldByName).shouldBeFunction();
		valueOf(testRun, rows.getFieldCount).shouldBeFunction();
		valueOf(testRun, rows.fieldName).shouldBeFunction();
		valueOf(testRun, rows.getFieldName).shouldBeFunction();
		valueOf(testRun, rows.getRowCount).shouldBeFunction();
		valueOf(testRun, rows.isValidRow).shouldBeFunction();
		valueOf(testRun, rows.next).shouldBeFunction();

		valueOf(testRun, rows.fieldCount).shouldBeNumber();
		valueOf(testRun, rows.rowCount).shouldBeNumber();

		db.close();

		finish(testRun);
	};

	/////////////////////////////////////////////////////////////////////////////////////
	// Old Drillbit tests -- converted to Anvil

	this.testDatabaseLH2147 = function (testRun)
	{
		var db = _Database.open('test.db');
		try {
			valueOf(testRun, db).shouldNotBeNull();

			var rs = db.execute("drop table if exists Test");
			valueOf(testRun, rs).shouldBeNull();

			rs = db.execute("create table if not exists Test(row text)");
			valueOf(testRun, rs).shouldBeNull();

			rs = db.execute("pragma table_info(Test)");
			valueOf(testRun, rs).shouldNotBeNull();
			valueOf(testRun, rs.fieldCount).shouldBeGreaterThan(0);
			rs.close();

			rs = db.execute("select * from Test");
			valueOf(testRun, rs).shouldNotBeNull();
			valueOf(testRun, rs.getFieldCount()).shouldBe(1);
			valueOf(testRun, rs.rowCount).shouldBe(0);
			rs.close();
		} finally {
			db.close();
			db.remove();
		}

		var file = Ti.Filesystem.getFile(_DbDir + 'test.db');
		valueOf(testRun, file.exists()).shouldBeFalse();

		finish(testRun);
	};

	this.testDatabaseInsert = function (testRun)
	{
		var db = _Database.open('test.db');
		try {
			valueOf(testRun, db).shouldNotBeNull();

			var rs = db.execute("drop table if exists Test");
			valueOf(testRun, rs).shouldBeNull();

			rs = db.execute("create table if not exists Test(row text)");
			valueOf(testRun, rs).shouldBeNull();

			db.execute("insert into Test(row) values(?)", "My TestRow");

			rs = db.execute("select * from Test");
			valueOf(testRun, rs).shouldNotBeNull();
			valueOf(rs.isValidRow()).shouldBe(true);
			valueOf(rs.getFieldCount()).shouldBe(1);
			if (_databaseType != 'bdb') {
				valueOf(rs.rowCount).shouldBe(1);
			}
			valueOf(rs.getField(0)).shouldBe("My TestRow");
			rs.close();
		} finally {
			db.close();
			db.remove();
		}

		var file = Ti.Filesystem.getFile(_DbDir + 'test.db');
		valueOf(testRun, file.exists()).shouldBeFalse();

		finish(testRun);
	};

	this.testDatabaseCount = function (testRun)
	{
		var testRowCount = 100;
		var db = _Database.open('test.db');
		try {
			valueOf(testRun, db).shouldNotBeNull();

			var rs = db.execute("drop table if exists data");
			valueOf(testRun, rs).shouldBeNull();

			db.execute('CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, val TEXT)');
			for (var i = 1; i <= testRowCount; i++) {
			    db.execute('INSERT INTO data (val) VALUES(?)','our value:' + i);
			}

		    rs = db.execute("SELECT * FROM data");
		    var rowCount = rs.rowCount;
		    var realCount = 0;
		    while (rs.isValidRow()) {
		        realCount += 1;
		        rs.next();
		    }
			rs.close();

		    valueOf(realCount).shouldBe(testRowCount);
			if (_databaseType != 'bdb') {
		        valueOf(rowCount).shouldBe(testRowCount);
		        valueOf(rowCount).shouldBe(realCount);
			}
		} finally {
			db.close();
			db.remove();
		}

		finish(testRun);
	};

	this.testDatabaseRollback = function (testRun)
	{
		var db = _Database.open('test.db');
		var testRowCount = 30;
		try {
			valueOf(testRun, db).shouldNotBeNull();

			var rs = db.execute("drop table if exists data");
			valueOf(testRun, rs).shouldBeNull();

			db.execute('CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, val TEXT)');

			db.execute('BEGIN TRANSACTION');
			for (var i = 1; i <= testRowCount; i++) {
			    db.execute('INSERT INTO data (val) VALUES(?)','our value:' + i);
			}
			rs = db.execute("SELECT * FROM data");
			if (_databaseType != 'bdb') {
		        valueOf(rs.rowCount).shouldBe(testRowCount);
			}
			rs.close();

			db.execute('ROLLBACK TRANSACTION');

			rs = db.execute("SELECT * FROM data");
			valueOf(rs.rowCount).shouldBe(0);
			rs.close();

			db.execute('drop table if exists data');
		} finally {
			db.close();
			db.remove();
		}

		finish(testRun);
	};

	this.testDatabaseSavepointRollback = function (testRun)
	{
		var db = _Database.open('test.db');
		var testRowCount = 30;
		try {
			valueOf(testRun, db).shouldNotBeNull();

			var rs = db.execute("drop table if exists data");
			valueOf(testRun, rs).shouldBeNull();

			// Devices with Android API Levels before 8 don't support savepoints causing
			// a false failure on those devices. Try and detect and only do
			// this complex test if savepoints work
			var savepointSupported = true;
			try {
				db.execute('SAVEPOINT test');
				db.execute('RELEASE SAVEPOINT test');
			} catch (E) {
				savepointSupported = false;
			}

			if (savepointSupported) {
				db.execute('BEGIN DEFERRED TRANSACTION');
				db.execute('CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, val TEXT)');
				db.execute('SAVEPOINT FOO');
				for (var i = 1; i <= testRowCount; i++) {
				    db.execute('INSERT INTO data (val) VALUES(?)','our value:' + i);
				}
				db.execute('ROLLBACK TRANSACTION TO SAVEPOINT FOO');
				db.execute('COMMIT TRANSACTION');

				rs = db.execute("SELECT * FROM data");
				valueOf(rs.rowCount).shouldBe(0);
				rs.close();

				db.execute('BEGIN TRANSACTION');
				db.execute('drop table if exists data');
				db.execute('ROLLBACK TRANSACTION');

				rs = db.execute("SELECT * FROM data");
				valueOf(testRun, rs).shouldNotBeNull();
				rs.close();
			}
		} finally {
			db.close();
			db.remove();
		}

		finish(testRun);
	};

	// https://appcelerator.lighthouseapp.com/projects/32238-titanium-mobile/tickets/2917-api-doc-dbexecute
	this.testDatabaseLH2917 = function (testRun)
	{
		var db = _Database.open('test.db');
		var rowCount = 10;
		var	resultSet, i, counter;

		valueOf(testRun, db).shouldBeObject();

		try {
			db.execute('CREATE TABLE IF NOT EXISTS stuff (id INTEGER, val TEXT)');
			db.execute('DELETE FROM stuff'); //clear table of all existing data

		  //test that the execute method works with and without an array as the second argument

			for(i = 1; i <= rowCount / 2; ++i) {
				 db.execute('INSERT INTO stuff (id, val) VALUES(?, ?)', i, 'our value' + i);
			}

			while(i <= rowCount) {
				 db.execute('INSERT INTO stuff (id, val) VALUES(?, ?)', [i, 'our value' + i]);
				 ++i;
			}

			resultSet = db.execute('SELECT * FROM stuff');

			valueOf(resultSet).shouldNotBeNull();
			valueOf(resultSet).shouldBeObject();
			if (_databaseType != 'bdb') {
				valueOf(resultSet.rowCount).shouldBe(rowCount);
			}

			counter = 1;
			while(resultSet.isValidRow()) {
				valueOf(resultSet.fieldByName('id')).shouldBe(counter);
			  valueOf(resultSet.fieldByName('val')).shouldBe('our value' + counter);
			  ++counter;

				resultSet.next();
			}
			resultSet.close()
		} catch(e) {
			Titanium.API.debug('error occurred: ' + e);
		} finally {
			db.close();
			db.remove();
	 	}

		finish(testRun);
	};

	//https://appcelerator.lighthouseapp.com/projects/32238/tickets/3393-db-get-api-extended-to-support-typed-return-value
	this.testTypedGettersAndSetters = function (testRun)
	{
		var db = _Database.open('test.db');
		var rowCount = 10;
		var resultSet = null, i, counter, current_float, float_factor = 0.5555;

		var isAndroid = (Ti.Platform.osname === 'android');
		valueOf(testRun, db).shouldBeObject();

		try {
			counter = 1;
			i = 1;

			db.execute('CREATE TABLE IF NOT EXISTS stuff (id INTEGER, f REAL, val TEXT)');
			db.execute('DELETE FROM stuff;'); //clear table of all existing data

			var insert_float;
			while(i <= rowCount) {
			   insert_float = float_factor * i;
				 db.execute('INSERT INTO stuff (id, f, val) VALUES(?, ?, ?)', [i, insert_float, 'our value' + i]);
				 ++i;
			}

			resultSet = db.execute('SELECT * FROM stuff');

			valueOf(resultSet).shouldNotBeNull();
			valueOf(resultSet).shouldBeObject();
			if (_databaseType != 'bdb') {
				valueOf(resultSet.rowCount).shouldBe(rowCount);
			}

			while(resultSet.isValidRow()) {

				current_float = counter * float_factor;

				valueOf(resultSet.fieldByName('id', _Database.FIELD_TYPE_INT)).shouldBe(resultSet.field(0, _Database.FIELD_TYPE_INT));
				valueOf(resultSet.fieldByName('id', _Database.FIELD_TYPE_INT)).shouldBe(counter);

			  	valueOf(resultSet.fieldByName('id', _Database.FIELD_TYPE_INT)).shouldBe(counter);
				valueOf(resultSet.fieldByName('id', _Database.FIELD_TYPE_INT)).shouldBe(counter);

				valueOf(resultSet.fieldByName('f', _Database.FIELD_TYPE_INT)).shouldBe(resultSet.field(1, _Database.FIELD_TYPE_INT));
				valueOf(resultSet.fieldByName('f', _Database.FIELD_TYPE_INT)).shouldBe(parseInt(counter * float_factor));

				var f_val = resultSet.fieldByName('f', _Database.FIELD_TYPE_FLOAT);
 	  			valueOf(Math.floor(Math.round(f_val * 10000))/10000).shouldBe(current_float);
				valueOf(resultSet.fieldByName('f', _Database.FIELD_TYPE_DOUBLE)).shouldBe(current_float);

				valueOf(resultSet.fieldByName('val', _Database.FIELD_TYPE_STRING)).shouldBe('our value' + counter);
				valueOf(resultSet.fieldByName('id', _Database.FIELD_TYPE_STRING)).shouldBe(counter.toString());
				valueOf(resultSet.fieldByName('f', _Database.FIELD_TYPE_STRING)).shouldBe(current_float.toString());


				// WARNING: On iOS, the following functions throw an uncaught exception -

					valueOf(function() {
						resultSet.fieldByName('val', _Database.FIELD_TYPE_INT);
					}).shouldThrowException();

					valueOf(function() {
						resultSet.fieldByName('val', _Database.FIELD_TYPE_DOUBLE);
					}).shouldThrowException();

					valueOf(function() {
						resultSet.fieldByName('val', _Database.FIELD_TYPE_FLOAT);
					}).shouldThrowException();

					valueOf(function() {
						resultSet.field(2, _Database.FIELD_TYPE_DOUBLE);
					}).shouldThrowException();

					valueOf(function() {
						resultSet.field(2, _Database.FIELD_TYPE_FLOAT);
					}).shouldThrowException();

					valueOf(function() {
						resultSet.field(2, _Database.FIELD_TYPE_INT);
					}).shouldThrowException();

			  ++counter;

				resultSet.next();
			}

		} finally {
			if(null != resultSet) {
				resultSet.close();
			}

			if(null != db) {
				db.close();
			}
		}

		finish(testRun);
	};

	this.testDatabaseExceptions = function (testRun)
	{
		var isAndroid = (Ti.Platform.osname === 'android');
		valueOf( function() { _Database.open("fred://\\"); }).shouldThrowException();
		var db = null;
		try {
			db = _Database.open('Test');

			valueOf( function() {
				_Database.execute("select * from notATable");
			}).shouldThrowException();

			db.execute('CREATE TABLE IF NOT EXISTS stuff (id INTEGER, val TEXT)');
			db.execute('INSERT INTO stuff (id, val) values (1, "One")');

			valueOf( function() {
				db.execute('SELECT * FROM idontexist');
			}).shouldThrowException();

			var rs = db.execute("SELECT id FROM stuff WHERE id = 1");

			valueOf( function() {
				rs.field(2);
			}).shouldThrowException();

			valueOf( function() {
				rs.field(2);
			}).shouldThrowException();

			valueOf( function() {
				rs.fieldName(2);
			}).shouldThrowException();

			if (rs != null) {
				rs.close();
			}
		} finally {
			if (db != null) {
				db.close();
			db.remove();
			}
		}

		finish(testRun);
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this);
};
