var platform = require('utility/platform');
var u = platform.u;
var mEtf;
var mButtonsRow;
var mTextModified;
var mFile;

exports.initialize = function(viewInfo, win) {
	mTextModified = false;
	mFile = Ti.Filesystem.getFile(viewInfo.fileName);
};

exports.cleanup = function() {
	// Save any changes to the file
	if (mTextModified) {
		mFile.write(mEtf.value);
	}
	mFile = null;
};

exports.create = function(win) {
	win.title = 'Mobile Sync';
	win.layout = 'composite';
	
	var editScroll = Ti.UI.createScrollView({
		top: 4+u, left: 4+u, right: 4+u, bottom: 48+u,
		contentWidth: 'auto',
		contentHeight: 'auto',
		showVerticalScrollIndicator: true,
		borderColor: 'lightgray'
	});
	
	mEtf = Ti.UI.createTextArea({
		width: Ti.UI.FILL || 'auto', height: Ti.UI.FILL || 'auto',
		textAlign: 'left',
		editable: true,
		focusable: true,
		borderWidth: 0,
		color: 'black'
	});
	editScroll.add(mEtf);
	
	mButtonsRow = Ti.UI.createView({
		bottom: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		layout: 'horizontal'
	});
	
	var cancelButton = Ti.UI.createButton({
		top: 0, left: 0, width: '50%', height: 40+u,
		title: "Cancel"
	});
	var saveButton = Ti.UI.createButton({
		top: 0, left: 0, width: '50%', height: 40+u,
		title: "Save"
	});
	mButtonsRow.add(cancelButton);
	mButtonsRow.add(saveButton);
	
	win.add(editScroll);
	win.add(mButtonsRow);
	
	mEtf.addEventListener('keypressed', function() {
		mTextModified = true;
	})
	saveButton.addEventListener('click', function() {
		win.close();
	});
	cancelButton.addEventListener('click', function() {
		mTextModified = false;
		win.close();
	});
	
	// Set initial control values
	if (mFile.exists()) {
		mEtf.value = mFile.read().text;
	}
};


