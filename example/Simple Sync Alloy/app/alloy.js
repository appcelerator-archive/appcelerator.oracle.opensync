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

// Require the version of the module that matches the database format that is being used.
//   ti.oracle.opensync.bdb -> Berkeley Database
//   ti.oracle.opensync.sql -> Native SQLite Database

Alloy.Globals.opensync = require('ti.oracle.opensync.sql');
Alloy.Globals.dbSyncRoot = Alloy.Globals.opensync.syncFilesRootDir + '/sqlite_db';

var syncSession = require('syncSession');
Alloy.Models.syncSession = new syncSession();