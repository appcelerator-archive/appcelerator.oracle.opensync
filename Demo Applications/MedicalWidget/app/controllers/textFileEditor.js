var args = arguments[0] || {};
var textModified = false;
var file;

function onClose() {
	if (textModified) {
		file.write($.editTextArea.value);
	}
}

function onKeyPressed() {
	textModified = true;
}

function doCancel() {
	textModified = false;
	$.textFileEditor.close();
}

function doSave() {
	$.textFileEditor.close();
}

exports.loadFile = function(fileName) {
	if (fileName) {
		file = Ti.Filesystem.getFile(fileName);
		if (file.exists()) {
			$.editTextArea.value = file.read().text;
		} else {
			$.editTextArea.value = '';
		}
	}
}

exports.loadFile(args.fileName);


