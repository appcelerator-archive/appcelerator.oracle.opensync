/*
 * Main synchronization view
 */

// Require the version of the module that matches the database format that is being used.
//   ti.oracle.opensync.bdb -> Berkeley Database
//   ti.oracle.opensync.sql -> Native SQLite Database
//var opensync = require('ti.oracle.opensync.bdb');
var opensync = require('ti.oracle.opensync.sql');

var platform = require('utility/platform');
var u = platform.u;

var mSess = null;
var mBgSess = null;
var mSyncProgress = null;
var mUserText;
var mPwdText;
var mSvPwdChkBx;
var mUrlText;
var mStatusText;
var mStatusStr = "";
var mPwdChng = false;
var mStatusIsLog = false;

// --------------------------------------------------------
// Navigator Interface
// --------------------------------------------------------

exports.initialize = function() {
	mStatusStr = "";
	mPwdChng = false;
	mStatusIsLog = false;

	// Create the OpenSync session
	mSess = opensync.ose.createOSESession();
	if (!mSess.isOpen()) {
		mSess = null;
	}
	
/*
	if (mSess != null) {
		try {
			mBgSess = opensync.syncagent.createBGSession();
			if (mBgSess) {
// BUGBUG:: DO NOT ATTEMPT TO START BG SESSION DURING Window/App STARTUP
//				mBgSess.start();
			}
		} catch (e) {
			mBgSess = null;
		}
	}
*/
};

exports.cleanup = function() {
	try {
		if (mSess != null) {
			mSess.close();
		}
		if (mBgSess == null) {
			mBgSess = opensync.syncagent.createBGSession();
		}
		if (mBgSess.getFatalError() != null) {
			platform.exit();
		}
	} catch (e) {
		platform.exit();
	}
	
	mSess = null;
	mBGSess = null;
	mSyncProgress = null;
	mUserText = null;
	mPwdText = null;
	mSvPwdChkBx = null;
	mUrlText = null;
	mStatusText = null;
	mStatusStr = null;
};

exports.create = function(win) {
	win.title = 'Mobile Sync';
	win.layout = 'composite';
	
	var parent = Ti.UI.createView({
		width: '100%', height: '100%',
		layout: 'vertical'
	});

	// Create the user name input field
	mUserText = Ti.UI.createTextField({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		hintText: 'Username',
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_ALL
	});

	// Create the password input field
	mPwdText = Ti.UI.createTextField({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		hintText: 'Password',
		passwordMask: true
	});

	// Create the save password checkbox
	mSvPwdChkBx = Ti.UI.createSwitch({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		value: false,
		style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		title: 'Save Password',
		color: 'black'
	});

	// Create the server URL input field
	mUrlText = Ti.UI.createTextField({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		hintText: 'Server URL',
		keyboardType: Ti.UI.KEYBOARD_URL
	});

	// Create a horizontal row of buttons
	var buttonsRow = Ti.UI.createView({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE,
		layout: 'horizontal'
	});

	// Create the apply button
	var applyButton = Ti.UI.createButton({
		top: 0, left: 0, width: '50%', height: Ti.UI.SIZE || 'auto',
		title: 'Apply'
	});

	// Create the synchronize button
	var syncButton = Ti.UI.createButton({
		top: 0, left: 0, width: '50%', height: Ti.UI.SIZE || 'auto',
		title: 'Sync'
	});

	buttonsRow.add(applyButton);
	buttonsRow.add(syncButton);

	// Create the scrollable area to display the status text
	var statusScroll = Ti.UI.createScrollView({
		top: 4+u, left: 4+u, right: 4+u, bottom: 4+u,
		contentWidth: 'auto',
		contentHeight: 'auto',
		showVerticalScrollIndicator: true,
		borderColor: 'lightgray'
	});

	// Create the status text display field
	mStatusText = Ti.UI.createTextArea({
		width: Ti.UI.FILL || 'auto', height: Ti.UI.FILL || 'auto',
		textAlign: 'left',
		hintText: 'Sync Status',
		editable: false,
		borderWidth: 0,
		color: 'black'
	});

	statusScroll.add(mStatusText);

	// Add all of the controls to the vertical layout view
	parent.add(mUserText);
    parent.add(mPwdText);
	parent.add(mSvPwdChkBx);
	parent.add(mUrlText);
	parent.add(buttonsRow);
	parent.add(statusScroll);

	win.add(parent);

	// Hook up the event listeners for the buttons
	syncButton.addEventListener('click', doSync);
	applyButton.addEventListener('click', doApply);

	// Monitor updates to the password input field
	mPwdText.addEventListener('keypressed', function() {
		mPwdChng = true;
	});

	// Create the progress view (initially hidden) to be displayed during the synchronization process
	ProgressView = require('utility/progressView');
	mSyncProgress = new ProgressView('Syncing...', doCancelSync);

	win.add(mSyncProgress.view());

	// Set the initial control values
	if (mSess != null) {
		if (mSess.getUser() != null) {
			mUserText.value = mSess.getUser();
		}
		if (mSess.getURL() != null) {
			mUrlText.value = mSess.getURL();
		}
		if (mSess.getSavePassword() != null) {
			mPwdText.value = '*********';
			mSvPwdChkBx.value = true;
		}
	}
};

exports.createOptionMenu = function(menu) {
	var syncAgent = menu.add({
		title: 'Sync Agent'
	});
	syncAgent.icon = 'icon.png';
	syncAgent.addEventListener('click', doSyncAgent);
	
	var editOse = menu.add({
		title: 'Edit OSE.ini'
	});
	editOse.icon = 'ic_menu_edit.png';
	editOse.addEventListener('click', doEditOse);
	
	var viewLog = menu.add({
		title: 'View Error Log'
	});
	viewLog.icon = 'ic_menu_view.png';
	viewLog.addEventListener('click', doViewLog);
	
	var purgeLog = menu.add({
		title: 'Purge Error Log'
	});
	purgeLog.icon = 'ic_menu_delete.png';
	purgeLog.addEventListener('click', doPurgeLog);
	
	var exitApp = menu.add({
		title: 'Exit mSync'
	});
	exitApp.icon = 'ic_menu_exit.png';
	exitApp.addEventListener('click', doExit);
};

// --------------------------------------------------------
// Synchronization Session
// --------------------------------------------------------

function initSess(doSave) {
	try {
		// Ensure that the user name input field is not empty
		var usr = mUserText.value;
		if ((usr == null) || (usr.length == 0)) {
			alert('Username cannot be empty');
			return;
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
		var pwd = mPwdText.value;
		if (!mSess.getSavePassword() || mPwdChng) {
			mSess.setPassword(pwd);
		}
		
		mSess.setSavePassword(mSvPwdChkBx.value);

		// Enable SSL if the URL is an `https` address
		var url = mUrlText.value;
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
		showError(e);
	}
}

function showError(e) {
	var msg = 'Encountered error: ' + e.message;
	if (e.cause) {
		msg += '\nCause: ' + e.cause;
	}
	setStatus(msg);
}

function setStatus(s)
{
	mStatusText.value = s;
	mStatusIsLog = false;
}

function showProgressView()
{
	mSyncProgress.updateMessage('Syncing...');
	mSyncProgress.updateProgress('', 0);
	mSyncProgress.show();	
}

function hideProgressView()
{
	if (mSyncProgress != null) {
		mSyncProgress.hide();
	}
}

function doSync() {
	showProgressView();
	initSess(false);
	try {
		if (mSess != null) {
			mSess.setUseFiles(true);
			mSess.sync({
				success: function() {
					hideProgressView();
					var date = new Date().toLocaleTimeString();
					setStatus(date + '\nSync finished successfully.');
				},
				error: function(e) {
					hideProgressView();
					showError(e);
				},
				progress: function(e) {
					if (e.value == 100) {
						Ti.API.info("Stage " + e.stage + " completed");
					}
					mSyncProgress.updateProgress('Stage: ' + e.stage, e.value);
				}
			});
		} else {
			hideProgressView();	
		}
	} catch (e) {
		hideProgressView();
		showError(e);
	}
}

function doCancelSync() {
	if (mSess != null) {
		try {
			mSyncProgress.updateMessage("Cancelling...");
			// Cancel the synchronization process. Note that the `error` method of the `sync` call will receive
			// a message when the synchronization process has been cancelled.
			mSess.cancelSync();
		} catch (e) {
			showError(e);
		}
	}
}

function doApply() {
	initSess(true);	
}

// --------------------------------------------------------
// Options Menu Commands
// --------------------------------------------------------

function doSyncAgent() {
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
			mStatusStr = mStatusText.value;
			setStatus('Starting sync Agent...');
			mBgSess.start();
			// Wait until the sync agent is running, then display the UI
			mBgSess.waitForStatus({
				status: opensync.syncagent.BGAgentStatus.RUNNING,
				timeout: 5000,
				success: function() {
					mBgSess.messageHandler = function(e) {
						Ti.API.info("msgHandler: " + JSON.stringify(e));
					};
					mBgSess.showUI();
					setStatus(mStatusStr);
				},
				error: function(e) {
					showError(e);
				}
			});
		}
	} catch (e) {
		showError(e);
	}
}

function doViewLog() {
	if (!mStatusIsLog) {
		mStatusStr = mStatusText.value;
		// Get the full path to the file
		var logFile = Ti.Filesystem.getFile(opensync.syncFilesRootDir + "/err.log");
		if (logFile.exists()) {
			mStatusText.value = logFile.read().text;
		} else {
			mStatusText.value = "<Error log is empty>";
		}
		logFile = null;
		mStatusIsLog = true;
	} else {
		setStatus(mStatusStr);
	}
}

function doPurgeLog() {
	// Get the full path to the file
	var logFile = Ti.Filesystem.getFile(opensync.syncFilesRootDir + "/err.log");
	if (logFile.exists()) {
		logFile.deleteFile();
	}
	setStatus("Error log purged");
}

function doEditOse() {
	require('utility/navigator').push({
    	viewName: 'textFileEditor',
		// Get the full path to the file
        fileName: opensync.syncFilesRootDir + "/ose.ini"
    });
}

function doExit (){
	require('utility/navigator').exit();
}

