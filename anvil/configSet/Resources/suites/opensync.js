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
			opensync = require('oracle.opensync.bdb');
		} else {
			opensync = require('oracle.opensync.sql');
		}
	};

	this.name = "oracle.opensync";

	// Test that module is loaded
	this.testModule = function (testRun)
	{
		// Verify that the module is defined
		valueOf(testRun, opensync).shouldBeObject();
		finish(testRun);
	};

	// Test that all of the namespace APIs are available
	this.testNamespaces = function (testRun)
	{
		// Verify the 'namespaces'
		valueOf(testRun, opensync.oseSession).shouldBeObject();
		valueOf(testRun, opensync.bgAgentStatus).shouldBeObject();
		valueOf(testRun, opensync.oseProgressListener).shouldBeObject();
		valueOf(testRun, opensync.bgSession).shouldBeObject();

		finish(testRun);
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this);
};
