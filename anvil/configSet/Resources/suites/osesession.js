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
		var session = opensync.createOSESession();
		
		// Verify that all of the methods are exposed
		valueOf(testRun, session.isOpen).shouldBeFunction();
		valueOf(testRun, session.sync).shouldBeFunction();
		valueOf(testRun, session.cancelSync).shouldBeFunction();
		valueOf(testRun, session.close).shouldBeFunction();
		valueOf(testRun, session.saveUser).shouldBeFunction();
		valueOf(testRun, session.selectPub).shouldBeFunction();

		// Verify properties that also have method getters and setters
		valueOf(testRun, session.getAppRoot).shouldBeFunction();
		valueOf(testRun, session.setAppRoot).shouldBeFunction();
		valueOf(testRun, session.getBackground).shouldBeFunction();
		valueOf(testRun, session.setBackground).shouldBeFunction();
		valueOf(testRun, session.getEncryptDatabases).shouldBeFunction();
		valueOf(testRun, session.setEncryptDatabases).shouldBeFunction();
		valueOf(testRun, session.getEncryptionType).shouldBeFunction();
		valueOf(testRun, session.setEncryptionType).shouldBeFunction();
		valueOf(testRun, session.setNewPassword).shouldBeFunction();
		valueOf(testRun, session.setPassword).shouldBeFunction();
		valueOf(testRun, session.getForceRefresh).shouldBeFunction();
		valueOf(testRun, session.setForceRefresh).shouldBeFunction();
		valueOf(testRun, session.getProxy).shouldBeFunction();
		valueOf(testRun, session.setProxy).shouldBeFunction();
		valueOf(testRun, session.getSavePassword).shouldBeFunction();
		valueOf(testRun, session.setSavePassword).shouldBeFunction();
		valueOf(testRun, session.getSyncApps).shouldBeFunction();
		valueOf(testRun, session.setSyncApps).shouldBeFunction();
		valueOf(testRun, session.getSyncDirection).shouldBeFunction();
		valueOf(testRun, session.setSyncDirection).shouldBeFunction();
		valueOf(testRun, session.getSyncNewPub).shouldBeFunction();
		valueOf(testRun, session.setSyncNewPub).shouldBeFunction();
		valueOf(testRun, session.getSyncPriority).shouldBeFunction();
		valueOf(testRun, session.setSyncPriority).shouldBeFunction();
		valueOf(testRun, session.getTransportType).shouldBeFunction();
		valueOf(testRun, session.setTransportType).shouldBeFunction();
		valueOf(testRun, session.getURL).shouldBeFunction();
		valueOf(testRun, session.setURL).shouldBeFunction();
		valueOf(testRun, session.getUseFiles).shouldBeFunction();
		valueOf(testRun, session.setUseFiles).shouldBeFunction();
		valueOf(testRun, session.getUser).shouldBeFunction();
		valueOf(testRun, session.getUseResume).shouldBeFunction();
		valueOf(testRun, session.setUseResume).shouldBeFunction();

		finish(testRun);
	};

	// Test that all of the properties are defined
	this.testProperties = function (testRun)
	{
		var session = opensync.createOSESession();

		// Verify that all of the properties are exposed
		valueOf(testRun, session.appRoot).shouldBeString();
		valueOf(testRun, session.background).shouldBeBoolean();
		valueOf(testRun, session.encryptDatabases).shouldBeBoolean();
		valueOf(testRun, session.encryptionType).shouldBeNumber();
		valueOf(testRun, session.forceRefresh).shouldBeBoolean();
		valueOf(testRun, session.proxy).shouldBeString();
		valueOf(testRun, session.savePassword).shouldBeBoolean();
		valueOf(testRun, session.syncApps).shouldBeBoolean();
		valueOf(testRun, session.syncDirection).shouldBeNumber();
		valueOf(testRun, session.syncNewPub).shouldBeBoolean();
		valueOf(testRun, session.syncPriority).shouldBeNumber();
		valueOf(testRun, session.transportType).shouldBeNumber();
		valueOf(testRun, session.url).shouldBeString();
		valueOf(testRun, session.useFiles).shouldBeBoolean();
		valueOf(testRun, session.user).shouldBeString();
		valueOf(testRun, session.useResume).shouldBeBoolean();

		finish(testRun);
	};

	// Test that all of the constants are defined
	this.testConstants = function (testRun)
	{
		var session = opensync.createOSESession();

		// Verify that all of the constants are exposed
		valueOf(testRun, session.DIR_RECEIVE).shouldBeNumber();
		valueOf(testRun, session.DIR_SEND).shouldBeNumber();
		valueOf(testRun, session.DIR_SENDRECEIVE).shouldBeNumber();
		valueOf(testRun, session.ENC_AES).shouldBeNumber();
		valueOf(testRun, session.ENC_NONE).shouldBeNumber();
		valueOf(testRun, session.ENC_SSL).shouldBeNumber();
		valueOf(testRun, session.PRIO_DEFAULT).shouldBeNumber();
		valueOf(testRun, session.PRIO_HIGH).shouldBeNumber();
		valueOf(testRun, session.PRIO_LOWEST).shouldBeNumber();
		valueOf(testRun, session.TR_HTTP).shouldBeNumber();
		valueOf(testRun, session.TR_USER).shouldBeNumber();

		valueOf(testRun, session.APPLY).shouldBeNumber();
		valueOf(testRun, session.COMPOSE).shouldBeNumber();
		valueOf(testRun, session.IDLE).shouldBeNumber();
		valueOf(testRun, session.PREPARE).shouldBeNumber();
		valueOf(testRun, session.PROCESS).shouldBeNumber();
		valueOf(testRun, session.RECEIVE).shouldBeNumber();
		valueOf(testRun, session.SEND).shouldBeNumber();

		finish(testRun);
	};

	// Test a session
	this.testCreateOSESession = function (testRun)
	{
		var session = opensync.createOSESession({
			user: 'testUser',
			password: 'password'
		});
		//NOTE: Oracle OpenSync uppercases user IDs
		valueOf(testRun, session.user).shouldBe("TESTUSER");
		session.close();

		// Null session data without a saved session
		var session2 = opensync.createOSESession();
		valueOf(testRun, session2.user).shouldBe("");
		session2.close();

		// Should create a new session object
		var session3 = opensync.createOSESession({
			user: 'secondUser'
		});
		valueOf(testRun, session3.user).shouldBe("SECONDUSER");
		session3.close();

		finish(testRun);
	};

	// Test property setting
	this.testPropertySetGet = function (testRun)
	{
		var session = opensync.createOSESession({
			user: 'testUser',
			password: 'password'
		});
		valueOf(testRun, session.user).shouldBe("TESTUSER");

		session.appRoot = "test";
		valueOf(testRun, session.appRoot).shouldBe("test");

		session.background = true;
		valueOf(testRun, session.background).shouldBeTrue();
		session.background = false;
		valueOf(testRun, session.background).shouldBeFalse();

		session.encryptDatabases = true;
		valueOf(testRun, session.encryptDatabases).shouldBeTrue();
		session.encryptDatabases = false;
		valueOf(testRun, session.encryptDatabases).shouldBeFalse();

		session.encryptionType = session.ENC_AES;
		valueOf(testRun, session.encryptionType).shouldBe(session.ENC_AES);
		session.encryptionType = session.ENC_SSL;
		valueOf(testRun, session.encryptionType).shouldBe(session.ENC_SSL);
		session.encryptionType = session.ENC_NONE;
		valueOf(testRun, session.encryptionType).shouldBe(session.ENC_NONE);

		session.forceRefresh = true;
		valueOf(testRun, session.forceRefresh).shouldBeTrue();
		session.forceRefresh = false;
		valueOf(testRun, session.forceRefresh).shouldBeFalse();

		session.proxy = "testproxy";
		valueOf(testRun, session.proxy).shouldBe("testproxy");

		session.savePassword = true;
		valueOf(testRun, session.savePassword).shouldBeTrue();
		session.savePassword = false;
		valueOf(testRun, session.savePassword).shouldBeFalse();

		session.syncApps = true;
		valueOf(testRun, session.syncApps).shouldBeTrue();
		session.syncApps = false;
		valueOf(testRun, session.syncApps).shouldBeFalse();

		session.syncDirection = session.DIR_SEND;
		valueOf(testRun, session.syncDirection).shouldBe(session.DIR_SEND);
		session.syncDirection = session.DIR_RECEIVE;
		valueOf(testRun, session.syncDirection).shouldBe(session.DIR_RECEIVE);
		session.syncDirection = session.DIR_SENDRECEIVE;
		valueOf(testRun, session.syncDirection).shouldBe(session.DIR_SENDRECEIVE);

		session.syncNewPub = true;
		valueOf(testRun, session.syncNewPub).shouldBeTrue();
		session.syncNewPub = false;
		valueOf(testRun, session.syncNewPub).shouldBeFalse();

		session.syncPriority = session.PRIO_DEFAULT;
		valueOf(testRun, session.syncPriority).shouldBe(session.PRIO_DEFAULT);
		session.syncPriority = session.PRIO_HIGH;
		valueOf(testRun, session.syncPriority).shouldBe(session.PRIO_HIGH);
		session.syncPriority = session.PRIO_LOWEST;
		valueOf(testRun, session.syncPriority).shouldBe(session.PRIO_LOWEST);

		session.transportType = session.TR_HTTP;
		valueOf(testRun, session.transportType).shouldBe(session.TR_HTTP);
		session.transportType = session.TR_USER;
		valueOf(testRun, session.transportType).shouldBe(session.TR_USER);

		session.url = "http://1.1.1.1:5901";
		valueOf(testRun, session.url).shouldBe("http://1.1.1.1:5901");

		session.useFiles = true;
		valueOf(testRun, session.useFiles).shouldBeTrue();
		session.useFiles = false;
		valueOf(testRun, session.useFiles).shouldBeFalse();

		session.useResume = true;
		valueOf(testRun, session.useResume).shouldBeTrue();
		session.useResume = false;
		valueOf(testRun, session.useResume).shouldBeFalse();

		session.close();

		finish(testRun);
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this);
};
