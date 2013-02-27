/*
 * Main synchronization view
 */

// Set global userText control used by other tabs
Alloy.Globals.userText = $.userText;

var syncSession = Alloy.Models.syncSession;

$.tabSync.addEventListener('close', function() {
	syncSession.close();
	$.destroy();
});

// Register to receive notification of changes to the
// synchronization state and stage
syncSession.on('change:syncState', onSyncStateChanged);
syncSession.on('change:syncStage', onSyncStageChanged);
syncSession.on('exit', doExit);

if (syncSession.get('savePassword') == true) {
	$.pwdText.hintText = "*********";
}

// Signal change to model so values get bound to the UI
syncSession.trigger('change');

var stageMap = {};
stageMap[Alloy.Globals.opensync.ose.OSEProgressListener.IDLE] = L('StageIdle');
stageMap[Alloy.Globals.opensync.ose.OSEProgressListener.PREPARE] = L('StagePrepare');
stageMap[Alloy.Globals.opensync.ose.OSEProgressListener.SEND] = L('StageSend');
stageMap[Alloy.Globals.opensync.ose.OSEProgressListener.RECEIVE] = L('StageReceive');
stageMap[Alloy.Globals.opensync.ose.OSEProgressListener.PROCESS] = L('StageProcess');
stageMap[Alloy.Globals.opensync.ose.OSEProgressListener.COMPOSE] = L('StageCompose');
stageMap[Alloy.Globals.opensync.ose.OSEProgressListener.APPLY] = L('StageApply');

// Notification that the stage of the synchronizatin process has changed
function onSyncStageChanged(model, stage) {
	var desc = stageMap[stage] || 'Unknown';
	$.syncProgress.updateProgressMessage(L('Stage') + ' ' + desc);
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

// Two-way sync is not currently supported, so we do it manually
function bindToModel() {
	var binding = {
		'username': $.userText.value,
		'savePassword': $.svPwdChkBx.value,
		'url': $.urlText.value,
		'password': $.pwdText.value
	};

	// Once a value is entered for the password, reset the hint text
	if ($.pwdText.value.length > 0) {
		$.pwdText.hintText = "Password";
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

