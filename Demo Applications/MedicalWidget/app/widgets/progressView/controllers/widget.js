function doCancel()
{
	$.trigger('cancel');
}

exports.showDialog = function() {
	$.cover.show();
	$.dialog.show();
}

exports.hideDialog = function() {
	$.dialog.hide();
	$.cover.hide();
}

exports.updateMessage = function(msg) {
	$.message.text = msg;
};

exports.updateProgressMessage = function(msg) {
	$.progressBar.message = msg;
};

exports.updateProgressValue = function(value) {
	$.progressBar.value = value;
}


