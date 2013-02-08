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
			opensync = require('ti.oracle.opensync.bdb');
		} else {
			opensync = require('ti.oracle.opensync.sql');
		}
	};

	this.name = "ti.oracle.opensync";

	// Test that all of the namespace APIs are available
	this.testApi = function (testRun)
	{
		var session = opensync.createBGSession();

		// Verify that all of the methods are exposed
		valueOf(testRun, session.isOpen).shouldBeFunction();
		valueOf(testRun, session.agentEnabled).shouldBeFunction();
		valueOf(testRun, session.close).shouldBeFunction();
		valueOf(testRun, session.enableAgent).shouldBeFunction();
		valueOf(testRun, session.pause).shouldBeFunction();
		valueOf(testRun, session.resume).shouldBeFunction();
		valueOf(testRun, session.showUI).shouldBeFunction();
		valueOf(testRun, session.start).shouldBeFunction();
		valueOf(testRun, session.stop).shouldBeFunction();
		valueOf(testRun, session.waitForStatus).shouldBeFunction();
		valueOf(testRun, session.getAgentStatus).shouldBeFunction();
		valueOf(testRun, session.getAgentStatusCode).shouldBeFunction();
		valueOf(testRun, session.getFatalError).shouldBeFunction();
		valueOf(testRun, session.getSyncStatus).shouldBeFunction();
		valueOf(testRun, session.setMessageHandler).shouldBeFunction();

		finish(testRun);
	};

	// Test that all of the constants are defined
	this.testSessionConstants = function (testRun)
	{
		// Verify that all of the constants are exposed
		valueOf(testRun, opensync.BGSession.DISABLE_PROP).shouldBeString();

		finish(testRun);
	};

	this.testBGExceptionConstants = function (testRun)
	{
		valueOf(testRun, opensync.BGSession.ACTIVE_CONNECTIONS_PRESENT).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.AGENT_DEFUNCT).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.AGENT_DISABLED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.AGENT_NOT_RUNNING).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.ANOTHER_INSTANCE).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.CONTROL_CONNECTION_CLOSED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_COMMAND).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_COND_SUBTYPE).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_COND_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_DATE_FORMAT).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_EVENT_SUBTYPE).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_EVENT_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_NUMERIC_PARAMETER).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_PARAMETER).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_RULE_CLASS).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_RULE_SUBTYPE).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_RULE_SUBTYPE_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_RULE_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_SESSION).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_STRING_PARAMETER).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_WAIT_STATUS).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.NO_BG_PUBS).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.OPERATION_NOT_ALLOWED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.PAUSE_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.READER_CANCELED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.RESUME_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.SQL_RULE_MISSING_QUERY).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.START_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.STOP_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.TOO_MANY_READERS).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.UNSUPPORTED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.WAIT_TIMEOUT).shouldBeNumber();

		finish(testRun);
	};

	this.testBGMessageConstants = function (testRun)
	{
		valueOf(testRun, opensync.BGSession.AGENT_PAUSED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.AGENT_RESUMED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.AGENT_STARTED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.AGENT_STOPPED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.APPLY_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.APPLY_FINISHED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.APPLY_STARTED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.BATTERY_LOW).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.COMPOSE_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.COMPOSE_FINISHED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.COMPOSE_STARTED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.DUPLICATE_PLATFORM_DB).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INTERNAL_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.INVALID_SERVER_NOTIFICATION).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.MEMORY_LOW).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.NET_AUTODIAL_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.NET_MANAGER_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.NETWORK_CHANGED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.NETWORK_EVAL).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.NO_NETWORK).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.PLAT_FULE_IN_NON_PLAT_DB).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.POWER_MANAGER_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.RULE_EVAL_DB_LOCKED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.RULE_EVAL_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.SERVER_NOTIFICATION).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.SERVER_NOTIFICATION_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.SYNC_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.SYNC_FINISHED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.SYNC_STARTED).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.TRACE).shouldBeNumber();
		valueOf(testRun, opensync.BGSession.UNKNOWN).shouldBeNumber();
		
		finish(testRun);
	};

	this.testBGAgentStatusConstants = function (testRun)
	{
		valueOf(testRun, opensync.BGAgentStatus.STOPPED).shouldBeNumber();
		valueOf(testRun, opensync.BGAgentStatus.START_PENDING).shouldBeNumber();
		valueOf(testRun, opensync.BGAgentStatus.RUNNING).shouldBeNumber();
		valueOf(testRun, opensync.BGAgentStatus.PAUSE_PENDING).shouldBeNumber();
		valueOf(testRun, opensync.BGAgentStatus.PAUSED).shouldBeNumber();
		valueOf(testRun, opensync.BGAgentStatus.RESUME_PENDING).shouldBeNumber();
		valueOf(testRun, opensync.BGAgentStatus.STOP_PENDING).shouldBeNumber();
		valueOf(testRun, opensync.BGAgentStatus.DEFUNCT).shouldBeNumber();

		finish(testRun);
	};

	// Test a session
	this.testCreateBGSession = function (testRun)
	{
		var session = opensync.createBGSession();
		valueOf(testRun, session).shouldBeObject();
		session.close();

		finish(testRun);
	};

	// Test property setting
	this.testAgentStatus = function (testRun)
	{
		var session = opensync.createBGSession();
		var agentStatus = session.getAgentStatus();
		valueOf(testRun, agentStatus).shouldBeObject();

		valueOf(testRun, opensync.BGAgentStatus.statusName).shouldBeFunction();

		valueOf(testRun, agentStatus.appName).shouldBeString();
		valueOf(testRun, agentStatus.batteryPower).shouldBeNumber();
		valueOf(testRun, agentStatus.clientId).shouldBeString();
		valueOf(testRun, agentStatus.networkName).shouldBeString();
		valueOf(testRun, agentStatus.networkSpeed).shouldBeNumber();
		valueOf(testRun, agentStatus.processId).shouldBeNumber();
		valueOf(testRun, agentStatus.statusCode).shouldBeNumber();
		session.close();

		finish(testRun);
	};

	this.testSyncStatus = function (testRun)
	{
		var session = opensync.createBGSession();
		session.start();
		var syncStatus = session.getSyncStatus();
		valueOf(testRun, syncStatus).shouldBeObject();

		valueOf(testRun, syncStatus.endTime).shouldBeNumber();
		if (syncStatus.lastError != null) {
			valueOf(testRun, syncStatus.lastError).shouldBeString();
		}
		valueOf(testRun, syncStatus.prio).shouldBeNumber();
		valueOf(testRun, syncStatus.progressStage).shouldBeNumber();
		valueOf(testRun, syncStatus.progressVal).shouldBeNumber();
		if (syncStatus.pubs != null) {
			valueOf(testRun, syncStatus.pubs).shouldBeArray();
		}
		valueOf(testRun, syncStatus.startTime).shouldBeNumber();

		try {
			session.stop();
		} catch (e) {}
		session.close();

		finish(testRun);
	};
	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this);
};
