/*
 * Platform-specific helpers
 */

var isAndroid = Ti.Android != undefined;

exports.exit = function() {
	if (isAndroid) {
		var activity = Ti.Android.currentActivity;
		activity.finish();
	}
};

exports.u = isAndroid ? 'dp' : 0;
exports.isAndroid = isAndroid;
