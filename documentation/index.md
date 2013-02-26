# Appcelerator.Oracle.OpenSync Module

## Description

Provides access to the Oracle Database Mobile Server through Titanium.
Oracle Database Mobile Server delivers critical bi-directional data synchronization capability to mobile or fixed location distribution devices, while providing a centralized backend interface for managing mobile deployments. On the client device, the mobile client facilitates the transfer of data to and from the client database, which can be either Berkeley DB or SQLite. 

## OpenSync Resources

Visit the [Oracle Database Mobile Server][oracledms] website to discover the overview, benefits, and other resources about using this technology.

## Prerequisites and Setup

The module contains all of the files necessary to enable your Titanium application to access the Oracle Database Mobile Server __except__ for the required files
from the Oracle Mobile Development Kit (MDK). Before you can use the module, you must copy the appropriate files into the installed module folder(s). The files
that are needed vary depending on which database you will be using in your application.

The following are the prerequisites for enabling synchronization using the module:

1. Install the Mobile Server Development kit, a component of the [Oracle Database Mobile Server](http://www.oracle.com/technetwork/products/database-mobile-server/overview/index.html)
2. Determine which type of database access you need to provide with the module (SQLite or Berkeley Database)
3. Install the module (see _Getting Started_ section below)
4. Copy the necessary files from the MDK folder (&lt;MDK_ROOT&gt;) to the appropriate folder(s) in the installed module's folder.

__For SQLite Client__

* Copy `osync_android.jar` from &lt;MDK_ROOT&gt;/Mobile/Sdk/android/lib to the `lib` folder of the module. 
* After copying, the `lib` folder within the module should contain:
    * `modules/android/appcelerator.oracle.opensync/<version>/lib/osync_android.jar`

__For Berkeley Database Client__

* Copy `osync_bdb_android.jar` from &lt;MDK_ROOT&gt;/Mobile/Sdk/android/lib/bdb to the `lib` folder of the module.
* Copy `sqlite.jar` from &lt;MDK_ROOT&gt;/Mobile/Sdk/android/lib/bdb to the `lib` folder of the module.
* After copying, the `lib` folder within the module should contain:
    * `modules/android/appcelerator.oracle.opensync/<version>/lib/osync_bdb.android.jar`
    * `modules/android/appcelerator.oracle.opensync/<version>/lib/sqlite.jar`
* Copy `liboracle-jdbc.so` from &lt;MDK_ROOT&gt;/Mobile/Sdk/android/lib/bdb/armeabi to the `libs/armeabi`, `libs/armeabi-v7a`, and `libs/x86` folders of the module.
* After copying, the `libs` folder within the module should contain:
    * `modules/android/appcelerator.oracle.opensync/<version>/libs/armeabi/liboracle-jdbc.so`
    * `modules/android/appcelerator.oracle.opensync/<version>/libs/armeabi/libappcelerator.oracle.opensync.so`
    * `modules/android/appcelerator.oracle.opensync/<version>/libs/armeabi-v7a/liboracle-jdbc.so`
    * `modules/android/appcelerator.oracle.opensync/<version>/libs/armeabi-v7a/libappcelerator.oracle.opensync.so`
    * `modules/android/appcelerator.oracle.opensync/<version>/libs/x86/liboracle-jdbc.so`
    * `modules/android/appcelerator.oracle.opensync/<version>/libs/x86/libappcelerator.oracle.opensync.so`

## Getting Started

View the [Using Titanium Modules](http://docs.appcelerator.com/titanium/latest/#!/guide/Using_Titanium_Modules) document for instructions on getting
started with using this module in your application.

## Accessing the Module

Use `require` to access this module from JavaScript:

	var opensync = require("appcelerator.oracle.opensync");

The `opensync` variable is a reference to the Module object.

## Namespaces

There are three main namespaces within the Oracle Opensync module:

* [ose](ose.html) - Defines methods and constants to manage synchronization activity.
* [syncagent](syncagent.html) - Defines methods and constants to control background synchronization.
* [Database](database.html) - Defines methods and constants for accessing a Berkeley Database (only available when the module has been set up to use the Berkeley Database -- _see above_).

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

_NOTE: This property is only available when the module has been set up to use the Berkeley Database._

## Usage
See the example applications in the `example` folder of the module.

## Author

Jeff English

## Module History

View the [change log](changelog.html) for this module.

## Feedback and Support

Please direct all questions, feedback, and concerns to [info@appcelerator.com](mailto:info@appcelerator.com?subject=Appcelerator.Oracle.OpenSync%20Module).

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

[oracledms]: http://www.oracle.com/us/products/database/database-mobile-server/overview/index.html
