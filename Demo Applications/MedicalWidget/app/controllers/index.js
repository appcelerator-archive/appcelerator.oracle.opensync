// The DMS server is currently configured for SQL database access.
// If attempting to use this demo application with the module
// configured for Berkeley Database support then warn the user.
if (require('appcelerator.oracle.opensync').Database != null) {
	alert("DMS server is configured to use SQL database!");
}

$.index.open();
