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
		valueOf(testRun, opensync.bgSession.DISABLE_PROP).shouldBeString();

		finish(testRun);
	}

	this.testBGExceptionConstants = function (testRun)
	{
		valueOf(testRun, opensync.bgSession.ACTIVE_CONNECTIONS_PRESENT).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.AGENT_DEFUNCT).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.AGENT_DISABLED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.AGENT_NOT_RUNNING).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.ANOTHER_INSTANCE).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.CONTROL_CONNECTION_CLOSED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_COMMAND).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_COND_SUBTYPE).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_COND_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_DATE_FORMAT).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_EVENT_SUBTYPE).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_EVENT_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_NUMERIC_PARAMETER).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_PARAMETER).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_RULE_CLASS).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_RULE_SUBTYPE).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_RULE_SUBTYPE_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_RULE_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_SESSION).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_STRING_PARAMETER).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_WAIT_STATUS).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.NO_BG_PUBS).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.OPERATION_NOT_ALLOWED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.PAUSE_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.READER_CANCELED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.RESUME_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.SQL_RULE_MISSING_QUERY).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.START_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.STOP_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.TOO_MANY_READERS).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.UNSUPPORTED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.WAIT_TIMEOUT).shouldBeNumber();

		finish(testRun);
	}

	this.testBGMessageConstants = function (testRun)
	{
		valueOf(testRun, opensync.bgSession.AGENT_PAUSED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.AGENT_RESUMED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.AGENT_STARTED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.AGENT_STOPPED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.APPLY_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.APPLY_FINISHED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.APPLY_STARTED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.BATTERY_LOW).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.COMPOSE_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.COMPOSE_FINISHED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.COMPOSE_STARTED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.DUPLICATE_PLATFORM_DB).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INTERNAL_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.INVALID_SERVER_NOTIFICATION).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.MEMORY_LOW).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.NET_AUTODIAL_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.NET_MANAGER_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.NETWORK_CHANGED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.NETWORK_EVAL).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.NO_NETWORK).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.PLAT_FULE_IN_NON_PLAT_DB).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.POWER_MANAGER_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.RULE_EVAL_DB_LOCKED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.RULE_EVAL_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.SERVER_NOTIFICATION).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.SERVER_NOTIFICATION_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.SYNC_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.SYNC_FINISHED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.SYNC_STARTED).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.TRACE).shouldBeNumber();
		valueOf(testRun, opensync.bgSession.UNKNOWN).shouldBeNumber();
		
		finish(testRun);
	}

	this.testBGAgentStatusConstants = function (testRun)
	{
		valueOf(testRun, opensync.bgAgentStatus.STOPPED).shouldBeNumber();
		valueOf(testRun, opensync.bgAgentStatus.START_PENDING).shouldBeNumber();
		valueOf(testRun, opensync.bgAgentStatus.RUNNING).shouldBeNumber();
		valueOf(testRun, opensync.bgAgentStatus.PAUSE_PENDING).shouldBeNumber();
		valueOf(testRun, opensync.bgAgentStatus.PAUSED).shouldBeNumber();
		valueOf(testRun, opensync.bgAgentStatus.RESUME_PENDING).shouldBeNumber();
		valueOf(testRun, opensync.bgAgentStatus.STOP_PENDING).shouldBeNumber();
		valueOf(testRun, opensync.bgAgentStatus.DEFUNCT).shouldBeNumber();

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

		valueOf(testRun, opensync.bgAgentStatus.statusName).shouldBeFunction();

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
	}
	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this);
};
