var platform = require('utility/platform');
var u = platform.u;

function ProgressView(msg, cancelCallback) {
	this.mView = Ti.UI.createView({
		top: 0, left: 0, width: '100%', height: '100%',
		backgroundColor: 'black', opacity: 0.9,
		touchEnabled: true,
		zIndex: 10000,
		visible: false
	});

	var parent = Ti.UI.createView({
		width: 300+u, height: 150+u,
		backgroundColor: 'white', opacity: 1.0,
		borderRadius: 8,
		borderColor: 'black',
		layout: 'vertical'
	})
	
	this.mMessage = Ti.UI.createLabel({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		text: msg,
		color: 'black', opacity: 1.0,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	this.mProgressBar = Ti.UI.createProgressBar({
		top: 8+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		min: 0, max: 100, value: 0,
		color: 'black', opacity: 1.0,
		message: ''
	});
	
	var cancelButton = Ti.UI.createButton({
		top: 8+u, width: '50%', height: 40+u,
		title: "Cancel",
		color: 'black',	opacity: 1.0
	});
	
	parent.add(this.mMessage);
	parent.add(this.mProgressBar);
	parent.add(cancelButton);
	this.mView.add(parent);

	cancelButton.addEventListener('click', function() {
		if (cancelCallback) {
			cancelCallback();
		}
	});
};

ProgressView.prototype.view = function() {
	return this.mView;
}

ProgressView.prototype.show = function() {
	this.mView.show();
}

ProgressView.prototype.hide = function() {
	this.mView.hide();
}

ProgressView.prototype.updateMessage = function(msg) {
	this.mMessage.value = msg;
}

ProgressView.prototype.updateProgress = function(msg, value) {
	this.mProgressBar.message = msg;
	this.mProgressBar.value = value;
}

module.exports = ProgressView;


