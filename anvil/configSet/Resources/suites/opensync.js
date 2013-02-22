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
	this.init = function (testUtils)
	{
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;

		if (_databaseType == 'bdb') {
			opensync = require('appcelerator.oracle.opensync.bdb');
		} else {
			opensync = require('appcelerator.oracle.opensync.sql');
		}
	};

	this.name = "appcelerator.oracle.opensync";

	// Test that module is loaded
	this.testModule = function (testRun)
	{
		// Verify that the module is defined
		valueOf(testRun, opensync).shouldBeObject();

		finish(testRun);
	};

	// Test that all of the namespaces are available
	this.testNamespaces = function (testRun)
	{
		// Verify the 'namespaces'
		valueOf(testRun, opensync.ose).shouldBeObject();
		valueOf(testRun, opensync.syncagent).shouldBeObject();

		finish(testRun);
	};

	// Test that all of the properties are available
	this.testProperties = function (testRun)
	{
		// Verify the 'properties'
		valueOf(testRun, opensync.syncFilesRootDir).shouldBeString();

		finish(testRun);
	};

	// Test that all of the APIs are available
	this.testAPIs = function (testRun)
	{
		// Verify the 'APIs'
		valueOf(testRun, opensync.getSyncFilesRootDir).shouldBeFunction();

		finish(testRun);
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this);
};
