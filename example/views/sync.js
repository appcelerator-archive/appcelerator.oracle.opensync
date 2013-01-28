var opensync = require('oracle.opensync');
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
var mPath;

exports.initialize = function(viewInfo, win) {
	mStatusStr = "";
	mPwdChng = false;
	mStatusIsLog = false;
	
	mSess = opensync.createOSESession();
	if (!mSess.isOpen()) {
		mSess = null;
	}
	
/*
	if (mSess != null) {
		try {
			mBgSess = opensync.createBGSession();
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
			mBgSess = opensync.createBGSession();
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
		width: '100%',
		height: '100%',
		layout: 'vertical',
	});
	
	mUserText = Ti.UI.createTextField({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		hintText: 'Username',
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_ALL
	});

	mPwdText = Ti.UI.createTextField({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		hintText: 'Password',
		passwordMask: true
	});

	mSvPwdChkBx = Ti.UI.createSwitch({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		value: false,
		style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		title: 'Save Password',
		color: 'black'
	});

	mUrlText = Ti.UI.createTextField({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		hintText: 'Server URL',
		keyboardType: Ti.UI.KEYBOARD_URL
	});
	
	var buttonsRow = Ti.UI.createView({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE,
		layout: 'horizontal'
	});
	
	var applyButton = Ti.UI.createButton({
		top: 0, left: 0, width: '50%', height: Ti.UI.SIZE || 'auto',
		title: 'Apply'
	});
	var syncButton = Ti.UI.createButton({
		top: 0, left: 0, width: '50%', height: Ti.UI.SIZE || 'auto',
		title: 'Sync'
	});
	buttonsRow.add(applyButton);
	buttonsRow.add(syncButton);

	var statusScroll = Ti.UI.createScrollView({
		top: 4+u, left: 4+u, right: 4+u, bottom: 4+u,
		contentWidth: 'auto',
		contentHeight: 'auto',
		showVerticalScrollIndicator: true,
		borderColor: 'lightgray'
	});
	
	mStatusText = Ti.UI.createTextArea({
		width: Ti.UI.FILL || 'auto', height: Ti.UI.FILL || 'auto',
		textAlign: 'left',
		hintText: 'Sync Status',
		editable: false,
		borderWidth: 0,
		color: 'black'
	});
	statusScroll.add(mStatusText);
	
	parent.add(mUserText);
    parent.add(mPwdText);
	parent.add(mSvPwdChkBx);
	parent.add(mUrlText);
	parent.add(buttonsRow);
	parent.add(statusScroll);
	win.add(parent);
	
	syncButton.addEventListener('click', doSync);
	applyButton.addEventListener('click', doApply);
	
	mPwdText.addEventListener('keypressed', function(e) {
		mPwdChng = true;
	});
		
	ProgressView = require('utility/progressView');
	mSyncProgress = new ProgressView('Syncing...', doCancelSync);
	win.add(mSyncProgress.view());
	
	//BUGBUG
	Ti.API.info(mSyncProgress.mWin);

	// Set initial control values
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
}

function initSess(doSave) {
	try {
		var usr = mUserText.value;
		if ((usr == null) || (usr.length == 0)) {
			alert('Username cannot be empty');
			return;
		}
		
		if ((mSess != null) && (usr.toUpperCase() !== mSess.getUser())) {
			mSess.close();
			mSess = null;
		}
		
		if (mSess == null) {
			mSess = opensync.createOSESession({
				user: usr
			});
			if (!mSess.isOpen()) {
				mSess = null;
			}
		}
		
		var pwd = mPwdText.value;
		if (!mSess.getSavePassword() || mPwdChng) {
			mSess.setPassword(pwd);
		}
		
		mSess.setSavePassword(mSvPwdChkBx.value);
		
		var url = mUrlText.value;
		if (url.indexOf('https') === 0) {
			mSess.setEncryptionType(opensync.oseSession.ENC_SSL);
		}
		mSess.setURL(url);
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
				success: function(e) {
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
			mSess.cancelSync();
		} catch (e) {
			showError(e);
		}
	}
}

function doApply() {
	initSess(true);	
}

function msgHandler(e) {
	Ti.API.info("msgHandler: " + JSON.stringify(e));
}

function doSyncAgent() {
	try {
		if (mBgSess == null) {
			mBgSess = opensync.createBGSession();
			if (!mBgSess.isOpen()) {
				mBgSess = null;
				return;
			}
		}
		
		if ((mSess == null) || (mBgSess.getAgentStatusCode() != opensync.bgAgentStatus.STOPPED)) {
			mBgSess.showUI();
		} else {
			mStatusStr = mStatusText.value;
			setStatus('Starting sync Agent...');
			mBgSess.start();
			mBgSess.waitForStatus({
				status: opensync.bgAgentStatus.RUNNING,
				timeout: 5000,
				success: function() {
					mBgSess.messageHandler = msgHandler;
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
		var logFile = Ti.Filesystem.getFile(opensync.syncFilesRootDir + "/err.log");
		if (logFile.exists()) {
			mStatusText.value = logFile.read().text;
		} else {
			mStatusText.value = "<Error log is empty>";
		}
		mStatusText.value 
		logFile = null;
		mStatusIsLog = true;
	} else {
		setStatus(mStatusStr);
	}
}

function doPurgeLog() {
	var logFile = Ti.Filesystem.getFile(opensync.syncFilesRootDir + "/err.log");
	if (logFile.exists()) {
		logFile.deleteFile();
	}
	setStatus("Error log purged");
}

function doEditOse() {
	require('utility/navigator').push({
    	viewName: 'textFileEditor',
        fileName: opensync.syncFilesRootDir + "/ose.ini"
    });
}

function doExit (){
	require('utility/navigator').exit(exports);
}
