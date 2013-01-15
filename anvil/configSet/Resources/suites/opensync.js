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
	var OPENSYNC_SERVER = Ti.App.Properties.getString("oracle.opensync.server");
	this.init = function (testUtils)
	{
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;
		opensync = require('oracle.opensync');
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
	this.testApi = function (testRun)
	{
		finish(testRun);
	};

	// Test that all of the properties are defined
	this.testProperties = function (testRun)
	{
		finish(testRun);
	};

	// Test that all of the constants are defined
	this.testConstants = function (testRun)
	{
		finish(testRun);
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this);
};
