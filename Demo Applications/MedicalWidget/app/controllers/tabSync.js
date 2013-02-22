/*
 * Main synchronization view
 */

// Set global userText control used by other tabs
Alloy.Globals.userText = $.userText;

var syncSession = Alloy.Models.syncSession;
var mPasswordChanged = false;

$.tabSync.addEventListener('close', function() {
	syncSession.close();
	$.destroy();
});

// Register to receive notification of changes to the
// synchronization state and stage
syncSession.on('change:syncState', onSyncStateChanged);
syncSession.on('change:syncStage', onSyncStageChanged);
syncSession.on('exit', doExit);

// Signal change to model so values get bound to the UI
syncSession.trigger('change');

// Notification that the stage of the synchronizatin process has changed
function onSyncStageChanged(model, stage) {
	$.syncProgress.updateProgressMessage(L('Stage') + stage);
}

// Notification that the state of synchronizationhas changed
function onSyncStateChanged(model, state) {
	if (state === 'started') {
		$.syncProgress.updateMessage(L('Syncing'));
		$.syncProgress.updateProgressMessage('', 0);
		$.syncProgress.showDialog();
	} else if (state == 'stopped') {
		$.syncProgress.hideDialog();
	} else if (state == 'cancelling') {
		$.syncProgress.updateMessage(L('Cancelling'));
	}	
}

// Notification that a key was pressed in the password edit field
function onKeyPressed(e) {
	mPasswordChanged = true;
}

// Two-way sync is not currently supported, so we do it manually
function bindToModel() {
	var binding = {
		'username': $.userText.value,
		'savePassword': $.svPwdChkBx.value,
		'url': $.urlText.value
	};		
	if (mPasswordChanged) {
		binding['password'] = $.pwdText.value;
	}
	
	syncSession.set(binding);
}

// --------------------------------------------------------
// Button Commands
// --------------------------------------------------------

function doSync() {
	bindToModel();
	syncSession.sync();
}

function doApply() {
	bindToModel();
	syncSession.apply();	
}

function doCancelSync() {
	syncSession.cancel();
}

// --------------------------------------------------------
// Options Menu Commands
// --------------------------------------------------------

function doSyncAgent() {
	syncSession.syncAgent();
}

function doViewLog() {
	syncSession.viewLog();
}

function doPurgeLog() {
	syncSession.purgeLog();
}

function doEditOse() {
	Alloy.createController('textFileEditor', {
		id: 'textFileEditor',
		fileName: 'file://' + Alloy.Globals.opensync.syncFilesRootDir + '/ose.ini'
	}).getView().open();
}

function doExit () {
	if (OS_ANDROID) {
		var activity = Ti.Android.currentActivity;
		activity.finish();
	}
}

