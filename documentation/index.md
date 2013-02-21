# Ti.Oracle.OpenSync Module

## Description

Provides access to the Oracle Database Mobile Server through Titanium.
Oracle Database Mobile Server delivers critical bi-directional data synchronization capability to mobile or fixed location distribution devices, while providing a centralized backend interface for managing mobile deployments. On the client device, the mobile client facilitates the transfer of data to and from the client database, which can be either Berkeley DB or SQLite. 

There are two variations of this module. Select the module that matches the type of database
that you are using for your application:

* `ti.oracle.opensync.sql` - Uses the native SQLite database
* `ti.oracle.opensync.bdb` - Uses the Berkeley DB database

Note that the `ti.oracle.opensync.bdb` module provides the same API as the Titanium database API, only under its own namespace.

## OpenSync Resources

Visit the [Oracle Database Mobile Server][oracledms] website to discover the overview, benefits, and other resources about using this technology.

## Getting Started

View the [Using Titanium Modules](http://docs.appcelerator.com/titanium/latest/#!/guide/Using_Titanium_Modules) document for instructions on getting
started with using this module in your application.

## Accessing the Module

Use `require` to access this module from JavaScript:

	var opensync = require("ti.oracle.opensync.sql");

or

	var opensync = require("ti.oracle.opensync.bdb");

The `opensync` variable is a reference to the Module object.

## Namespaces

There are two main namespaces within the Oracle Opensync module:

* [ose](ose.html) - Defines methods and constants to manage synchronization activity.
* [syncagent](syncagent.html) - Defines methods and constants to control background synchronization.

## Methods

### string getSyncFilesRootDir()

Returns the native path to the directory created by the Oracle Opensync service (e.g. `/data/data/<packagename>/app_oracle.sync`).

#### Example
	// Get the full path to the error log file
	var logFile = Ti.Filesystem.getFile('file://' + opensync.syncFilesRootDir + '/err.log');

## Properties

### syncFilesRootDir [string]

Native path to the directory created by the Oracle Opensync service (e.g. `/data/data/<packagename>/app_oracle.sync`).

### [ose](ose.html) [proxy]

Namespace proxy providing access to the [ose](ose.html) session and constants.

### [syncagent](syncagent.html) [proxy]

Namespace proxy providing access to the [syncagent](syncagent.html) session, status, and constants.

### [Database](database.html) [proxy]

Namespace proxy providing access to the [Berkeley Database](database.html) APIs.

_NOTE: This property is only available in the `ti.oracle.opensync.bdb` version of the module._

## Usage
See the example applications in the `example` folder of the module.

## Author

Jeff English

## Module History

View the [change log](changelog.html) for this module.

## Feedback and Support

Please direct all questions, feedback, and concerns to [info@appcelerator.com](mailto:info@appcelerator.com?subject=Ti.Oracle.OpenSync%20Module).

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

[oracledms]: http://www.oracle.com/us/products/database/database-mobile-server/overview/index.html
