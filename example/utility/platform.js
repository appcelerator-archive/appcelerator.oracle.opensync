/*
 * Platform-specific helpers
 */

exports.exit = function() {
	if (Ti.Android != undefined) {
		var activity = Ti.Android.currentActivity;
		activity.finish();
	}
}

exports.u = Ti.Android != undefined ? 'dp' : 0;
exports.isAndroid = Ti.Android != undefined;