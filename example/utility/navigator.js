/*
 * Multi-platform navigation logic for stacked windows
 */

var nav = null;
var platform = require('utility/platform');

function createViewInWindow(win, viewInfo)
{
	// Attempt to load the view
	var mod = require('views/' + viewInfo.viewName);
	// Allow the view to initialize
	mod.initialize(viewInfo, win);
	// Create the view in the current window
	mod.create(win);
	if (platform.isAndroid) {
		// Handle options menu if the view has the method defined
		if (mod.createOptionMenu != undefined) {
			win.activity.onCreateOptionsMenu = function(e) {
				mod.createOptionMenu(e.menu);
			};
		}
	}
	
	// Register to be notified when the window closes so the module can cleanup
	win.addEventListener('close', function() {
		mod.cleanup();
	});
	
	return win;
}

exports.openAppWindow = function(viewInfo)
{
	var appWin = Ti.UI.createWindow({
		backgroundColor:'white',
		layout:'vertical',
		navBarHidden: true,		// Make it a heavyweight window for Android
		tabBarHidden:true,
		exitOnClose: true
	});

	if (platform.isAndroid) {
		createViewInWindow(appWin, viewInfo);
	} else {
		var win = Ti.UI.createWindow({
			backgroundColor:'white',
			layout:'vertical'
		});
		createViewInWindow(win, viewInfo);
		nav = Ti.UI.iPhone.createNavigationGroup({
			window:win
		});
		appWin.add(nav);
	}

	appWin.open();
};

exports.push = function(viewInfo)
{
	var win = Ti.UI.createWindow({
		backgroundColor:'white',
		layout:'vertical'
	});

	createViewInWindow(win, viewInfo);

	if (platform.isAndroid) {
		win.open({ modal:true, animated:true });
	} else {
		nav.open(win, { animated:true });
	}
};

exports.exit = function()
{
	if (platform.isAndroid) {
		Ti.Android.currentActivity.finish();
	} else {
		Ti.UI.currentWindow.close();
	}
};
