/*
 * Oracle Opensync Session Model
 */

var Alloy = require('alloy');

var opensync = Alloy.Globals.opensync;
var mSess = null;
var mBgSess = null;
var mStatusStr = '';
var mStatusIsLog = false;

// There should only be one instance of this model
var model = require('alloy/backbone').Model.extend({
	defaults: {
		username: '',
		password: '',
		url: '',
		savePassword: false,
		statusText: '',
		syncState: 'stopped',
		syncStage: 0,
		syncValue: 0
	},
	initialize: doInitialize,
	sync: doSync,
	syncAgent: doSyncAgent,
	viewLog: doViewLog,
	purgeLog: doPurgeLog,
	cancel: doCancel,
	close: doClose,
	apply: doApply
});

module.exports = model;

// ---------------------------------------------------------------------
// Session initialization helper
// ---------------------------------------------------------------------

function initSess(self, doSave) {
	try {
		// Ensure that the user name input field is not empty
		var usr = self.get('username');
		if ((usr == null) || (usr.length == 0)) {
			alert(L('UsernameNotEmpty'));
			return false;
		}

		// If there is a session currently open and the user name
		// is different, then we need to close the current session since
		// only one session can be open.
		if ((mSess != null) && (usr.toUpperCase() !== mSess.getUser())) {
			mSess.close();
			mSess = null;
		}
		
		if (mSess == null) {
			// Create a new session for the specified user
			mSess = opensync.ose.createOSESession({
				user: usr
			});

			// Check that the session was initialized successfully
			if (!mSess.isOpen()) {
				mSess = null;
			}
		}

		// Set the password for the session if the current session does not
		// have a saved password OR the password was changed.
		var pwd = self.get('password');
		if (!mSess.getSavePassword() || (pwd.length > 0)) {
			mSess.setPassword(pwd);
		}
		
		mSess.setSavePassword(self.get('savePassword'));

		// Enable SSL if the URL is an `https` address
		var url = self.get('url');
		if (url.indexOf('https') === 0) {
			mSess.setEncryptionType(opensync.ose.OSESession.ENC_SSL);
		}
		mSess.setURL(url);

		// Save the user if this is an `apply` action
		if (doSave) {
			mSess.saveUser();
		}
	} catch (e) {
		Ti.API.error('Exception in initSess: ' + e.message);
		setError(self, e);
		return false;
	}
	
	return true;
}
		
// ---------------------------------------------------------------------
// Model methods
// ---------------------------------------------------------------------

function doInitialize(attributes, options) {
	// Create the OpenSync session
	mSess = opensync.ose.createOSESession();
	if (!mSess.isOpen()) {
		mSess = null;
	}
	
	/* MOD-1260
	if (mSess != null) {
		try {
			mBgSess = opensync.syncagent.createBGSession();
			if (mBgSess) {
				mBgSess.start();
			}
		} catch (e) {
			mBgSess = null;
		}
	}
	*/
	
	// Set the initial control values
	if (mSess != null) {
		if (mSess.getUser() != null) {
			this.set('username', mSess.getUser());
		}
		if (mSess.getURL() != null) {
			this.set('url', mSess.getURL());
		}
		if (mSess.getSavePassword() == true) {
			this.set('savePassword', true);
		}
	}
}

function setError(model, e) {
	var msg = 'Encountered error: ' + e.message;
	if (e.cause) {
		msg += '\nCause: ' + e.cause;
	}
	setStatus(model, msg);
}

function setStatus(model, s) {
	model.set('statusText', s);
	mStatusIsLog = false;
}

function doApply() {
	initSess(this, true);	
}

function doSync() {
	var self = this;
	if (initSess(self, false) && (mSess != null)) {
		try {
			mSess.setUseFiles(false);
			self.set('syncState', 'started');
			mSess.sync({
				success: function() {
					var date = new Date().toLocaleTimeString();
					setStatus(self, date + '\n' + L('SyncSuccessful'));
					self.set('syncState', 'stopped');
				},
				error: function(e) {
					setError(self, e);
					self.set('syncState', 'stopped');
				},
				progress: function(e) {
					if (e.value == 100) {
						Ti.API.info('Stage ' + e.stage + ' completed');
					}
					self.set('syncStage', e.stage);
					self.set('syncValue', e.value);
				}
			});
		} catch (e) {
			setError(self, e);
			self.set('syncState', 'stopped');
		}
	}
}

function doSyncAgent() {
	var self = this;
	try {
		if (mBgSess == null) {
			mBgSess = opensync.syncagent.createBGSession();
			if (!mBgSess.isOpen()) {
				mBgSess = null;
				return;
			}
		}

		if ((mSess == null) || (mBgSess.getAgentStatusCode() != opensync.syncagent.BGAgentStatus.STOPPED)) {
			mBgSess.showUI();
		} else {
			mStatusStr = self.get('statusText');
			setStatus(self, L('StartingSyncAgent'));
			mBgSess.start();
			// Wait until the sync agent is running, then display the UI
			mBgSess.waitForStatus({
				status: opensync.syncagent.BGAgentStatus.RUNNING,
				timeout: 5000,
				success: function() {
					mBgSess.messageHandler = function(e) {
						Ti.API.info('msgHandler: ' + JSON.stringify(e));
					};
					mBgSess.showUI();
					setStatus(self, mStatusStr);
				},
				error: function(e) {
					setError(self, e);
				}
			});
		}
	} catch (e) {
		setError(self, e);
	}
}

function doViewLog() {
	if (!mStatusIsLog) {
		mStatusStr = this.get('statusText');
		// Get the full path to the file
		var logFile = Ti.Filesystem.getFile('file://' + opensync.syncFilesRootDir + '/err.log');
		if (logFile.exists()) {
			setStatus(this, logFile.read().text);
		} else {
			setStatus(this, L('ErrorLogEmpty'));
		}
		logFile = null;
		mStatusIsLog = true;
	} else {
		setStatus(this, mStatusStr);
	}
}

function doPurgeLog() {
	// Get the full path to the file
	var logFile = Ti.Filesystem.getFile('file://' + opensync.syncFilesRootDir + '/err.log');
	if (logFile.exists()) {
		logFile.deleteFile();
	}
	setStatus(this, L('ErrorLogPurged'));
}

function doCancel() {
	if (mSess != null) {
		try {
			this.set('syncState', 'cancelling');
			// Cancel the synchronization process. Note that the `error` method of the `sync` call will receive
			// a message when the synchronization process has been cancelled.
			mSess.cancelSync();
		} catch (e) {
			setError(this, e);
		}
	}
}

function doClose() {
	try {
		if (mSess != null) {
			mSess.close();
		}

		if (mBgSess == null) {
			mBgSess = opensync.syncagent.createBGSession();
		}
		if (mBgSess.getFatalError() != null) {
			this.trigger('exit');
		}
	} catch (e) {
		this.trigger('exit');
	}
}






