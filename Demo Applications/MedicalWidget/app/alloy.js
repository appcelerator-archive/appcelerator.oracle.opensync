// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// Read the module documentation to ensure that you have set up the module to use
// the database that matches your application configuration (either SQL or Berkeley)
// The default for this example is SQL.

Alloy.Globals.opensync = require('appcelerator.oracle.opensync');
Alloy.Globals.dbSyncRoot = Alloy.Globals.opensync.syncFilesRootDir + '/sqlite_db';

var syncSession = require('syncSession');
Alloy.Models.syncSession = new syncSession();

var collectionNavigator = require('collectionNavigator');
Alloy.Models.pulseOxViewModel = new collectionNavigator();