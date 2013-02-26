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
	this.init = function (testUtils)
	{
		finish = testUtils.finish;
		valueOf = testUtils.valueOf;

		opensync = require('appcelerator.oracle.opensync');
	};

	this.name = "appcelerator.oracle.opensync";

	// Test that all of the namespaces are available
	this.testNamespaces = function (testRun)
	{
		// Verify the 'namespaces'
		valueOf(testRun, opensync.ose).shouldBeObject();
		valueOf(testRun, opensync.ose.OSESession).shouldBeObject();
		valueOf(testRun, opensync.ose.OSEProgressListener).shouldBeObject();

		finish(testRun);
	};

	// Test that all of the APIs are available
	this.testAPIs = function (testRun)
	{
		// Verify the 'APIs'
		valueOf(testRun, opensync.ose.createOSESession).shouldBeFunction();

		finish(testRun);
	}

	// Test that all of the constants are defined
	this.testOSESessionConstants = function (testRun)
	{
		// Verify that all of the constants are exposed
		valueOf(testRun, opensync.ose.OSESession.DIR_RECEIVE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.DIR_SEND).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.DIR_SENDRECEIVE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.ENC_AES).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.ENC_NONE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.ENC_SSL).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PRIO_DEFAULT).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PRIO_HIGH).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PRIO_LOWEST).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.TR_HTTP).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.TR_USER).shouldBeNumber();

		finish(testRun);
	};

	this.testOSEExceptionConstants = function (testRun)
	{
		valueOf(testRun, opensync.ose.OSESession.CONFIG_LOAD_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.CONFIG_SAVE_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.CONNECTION_TO_SRV_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.DATABASE_NOT_FOUND).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.EMPTY_PASSWORD).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.EMPTY_USER).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.ENCRYPTION_ID_MISMATCH).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.ERR_CREDENTIALS).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.ERROR_RESUME_RECEIVE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.ERROR_RESUME_SEND).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.HTTP_RESPONSE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.HTTP_TRANSPORT_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INTERNAL_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_BUFFER).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_DML_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_ENCR_VER).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_ENCRYPTION_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_HANDLE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_HTTP_URL).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_INT_OPT).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_OPCODE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_PLUGIN_FLAGS).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_PRIORITY).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_SESS).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_STR_OPT).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_STRING_LENGTH).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_SYNC_DIRECTION).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.INVALID_TRANSPORT_TYPE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.MISSING_DEFAULT_DATABASE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.MISSING_PLUGIN_API).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.NOT_SUPPORTED).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.OPCODE_LENGTH_OVERRUN).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.OPCODE_LENGTH_UNDERRUN).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.OPCODE_OUT_OF_SEQUENCE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PASSWORD_NOT_SPECIFIED).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PLUGIN_CLASS_INIT_FAILED).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PLUGIN_CLASS_NOT_FOUND).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PLUGIN_EXCEPTION).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PLUGIN_ID_NOT_FOUND).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PUBLICATION_ID_MISMATCH).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PUBLICATION_ID_NOT_FOUND).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.PUBLICATION_NOT_FOUND).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.SERVER_ERROR).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.SNAP_NAME_NOT_FOUND).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.SNAPSHOT_ID_EXISTS).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.SNAPSHOT_ID_NOT_FOUND).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.SYNC_CANCELED).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.TRANS_NOT_FOUND).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.UNCOMPRESSED_DATA).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.UNEXP_TERM_OPCODE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.UNEXPECTED_BLOB_DATA).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.UNEXPECTED_OPCODE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.UNINIT_USER_TRANSPORT).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.UNRECOGNIZED_DATA).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.USER_NOT_SPECIFIED).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSESession.USER_TRANSPORT_ERROR).shouldBeNumber();

		finish(testRun);
	};

	this.testOSEProgressListenerConstants = function (testRun)
	{
		valueOf(testRun, opensync.ose.OSEProgressListener.APPLY).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSEProgressListener.COMPOSE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSEProgressListener.IDLE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSEProgressListener.PREPARE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSEProgressListener.PROCESS).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSEProgressListener.RECEIVE).shouldBeNumber();
		valueOf(testRun, opensync.ose.OSEProgressListener.SEND).shouldBeNumber();

		finish(testRun);
	};

	this.testOSESessionAPIs = function (testRun)
	{
		var session = opensync.ose.createOSESession();
		
		// Verify that all of the methods are exposed
		valueOf(testRun, session.isOpen).shouldBeFunction();
		valueOf(testRun, session.sync).shouldBeFunction();
		valueOf(testRun, session.cancelSync).shouldBeFunction();
		valueOf(testRun, session.close).shouldBeFunction();
		valueOf(testRun, session.saveUser).shouldBeFunction();
		valueOf(testRun, session.selectPub).shouldBeFunction();

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

	// Test a session
	this.testCreateOSESession = function (testRun)
	{
		var session = opensync.ose.createOSESession({
			user: 'testUser',
			password: 'password'
		});
		//NOTE: Oracle OpenSync uppercases user IDs
		valueOf(testRun, session.getUser()).shouldBe("TESTUSER");
		session.close();

		// Null session data without a saved session
		var session2 = opensync.ose.createOSESession();
		valueOf(testRun, session2.isOpen()).shouldBeFalse();
		valueOf(testRun, function() { session2.close(); }).shouldThrowException();

		// Should create a new session object
		var session3 = opensync.ose.createOSESession({
			user: 'secondUser'
		});
		valueOf(testRun, session3.getUser()).shouldBe("SECONDUSER");
		session3.close();

		finish(testRun);
	};

	// Test property setting
	this.testSetGet = function (testRun)
	{
		var session = opensync.ose.createOSESession({
			user: 'testUser',
			password: 'password'
		});
		valueOf(testRun, session.getUser()).shouldBe("TESTUSER");

		session.setAppRoot("test");
		valueOf(testRun, session.getAppRoot()).shouldBe("test");

		session.setBackground(true);
		valueOf(testRun, session.getBackground()).shouldBeTrue();
		session.setBackground(false);
		valueOf(testRun, session.getBackground()).shouldBeFalse();

		session.setEncryptDatabases(true);
		valueOf(testRun, session.getEncryptDatabases()).shouldBeTrue();
		session.setEncryptDatabases(false);
		valueOf(testRun, session.getEncryptDatabases()).shouldBeFalse();

		session.setEncryptionType(opensync.ose.OSESession.ENC_AES);
		valueOf(testRun, session.getEncryptionType()).shouldBe(opensync.ose.OSESession.ENC_AES);
		session.setEncryptionType(opensync.ose.OSESession.ENC_SSL);
		valueOf(testRun, session.getEncryptionType()).shouldBe(opensync.ose.OSESession.ENC_SSL);
		session.setEncryptionType(opensync.ose.OSESession.ENC_NONE);
		valueOf(testRun, session.getEncryptionType()).shouldBe(opensync.ose.OSESession.ENC_NONE);

		session.setForceRefresh(true);
		valueOf(testRun, session.getForceRefresh()).shouldBeTrue();
		session.setForceRefresh(false);
		valueOf(testRun, session.getForceRefresh()).shouldBeFalse();

		session.setProxy("testproxy");
		valueOf(testRun, session.getProxy()).shouldBe("testproxy");

		session.setSavePassword(true);
		valueOf(testRun, session.getSavePassword()).shouldBeTrue();
		session.setSavePassword(false);
		valueOf(testRun, session.getSavePassword()).shouldBeFalse();

		session.setSyncApps(true);
		valueOf(testRun, session.getSyncApps()).shouldBeTrue();
		session.setSyncApps(false);
		valueOf(testRun, session.getSyncApps()).shouldBeFalse();

		session.setSyncDirection(opensync.ose.OSESession.DIR_SEND);
		valueOf(testRun, session.getSyncDirection()).shouldBe(opensync.ose.OSESession.DIR_SEND);
		session.setSyncDirection(opensync.ose.OSESession.DIR_RECEIVE);
		valueOf(testRun, session.getSyncDirection()).shouldBe(session.DIR_RECEIVE);
		session.setSyncDirection(opensync.ose.OSESession.DIR_SENDRECEIVE);
		valueOf(testRun, session.getSyncDirection()).shouldBe(session.DIR_SENDRECEIVE);

		session.setSyncNewPub(true);
		valueOf(testRun, session.getSyncNewPub()).shouldBeTrue();
		session.setSyncNewPub(false);
		valueOf(testRun, session.getSyncNewPub()).shouldBeFalse();

		session.setSyncPriority(opensync.ose.OSESession.PRIO_DEFAULT);
		valueOf(testRun, session.getSyncPriority()).shouldBe(session.PRIO_DEFAULT);
		session.setSyncPriority(opensync.ose.OSESession.PRIO_HIGH);
		valueOf(testRun, session.getSyncPriority()).shouldBe(session.PRIO_HIGH);
		session.setSyncPriority(opensync.ose.OSESession.PRIO_LOWEST);
		valueOf(testRun, session.getSyncPriority()).shouldBe(session.PRIO_LOWEST);

		session.setTransportType(opensync.ose.OSESession.TR_HTTP);
		valueOf(testRun, session.getTransportType()).shouldBe(session.TR_HTTP);
		session.setTransportType(opensync.ose.OSESession.TR_USER);
		valueOf(testRun, session.getTransportType()).shouldBe(session.TR_USER);

		session.setURL("http://1.1.1.1:5901");
		valueOf(testRun, session.getURL()).shouldBe("http://1.1.1.1:5901");

		session.setUseFiles(true);
		valueOf(testRun, session.getUseFiles()).shouldBeTrue();
		session.setUseFiles(false);
		valueOf(testRun, session.getUseFiles()).shouldBeFalse();

		session.setUseResume(true);
		valueOf(testRun, session.getUseResume()).shouldBeTrue();
		session.setUseResume(false);
		valueOf(testRun, session.getUseResume()).shouldBeFalse();

		session.close();

		finish(testRun);
	};

	// Populate the array of tests based on the 'hammer' convention
	this.tests = require('hammer').populateTests(this);
};
