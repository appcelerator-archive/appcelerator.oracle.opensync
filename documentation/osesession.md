# Oracle Opensync Module

## OSESession

The methods listed below are only accessible from an OSESession proxy that is returned from calling `opensync.ose.createOSESession`. 

The constants listed below are accessible either from the OSESession proxy that is returned from calling `opensync.ose.createOSESession` __and__ directly from the `opensync.ose.OSESession` namespace proxy.

## Methods

### boolean isOpen()

Gets the state of session. Returns _true_ if the session is available for use. Returns _false_ if the session is invalid for use.

### void sync(Options)

Performs the sync operation. The sync operation is started in a separate thread. Only one synchronization operation can be active at a time. Attempting to start a sync operation while a previous sync operation is active will result in an error.

`Options` is a dictionary with the following properties:

* success [function]: A callback function that is executed if the synchronization succeeds (optional). Parameters passed to the callback function are:
    * success [boolean]: `true`
* error [function]: A callback function that is executed if an error occurs during the synchronization process or the synchronization is canceled (optional). Parameters passed to the callback function are:
    * error [boolean]: `true`
    * errorCode [int]: Error code from the ose session
    * message [string]: Error message text
* progress [function]: A callback function that is executed during the synchronization process to report progress. Parameters passed to the callback function are:
    * stage [int]: Current stage of the process. The value will be one of the constants defined in the [OSEProgressListener](oseprogresslistener.html) namespace proxy.
    * value [int]: Percent of completion of the stage

#### Example
	mSess = opensync.ose.createOSESession({
		user: 'joeuser',
		password: 'password'
	});
	mSess.setURL('http:/192.168.0.1:8181');
	try {
		if (mSess != null) {
			mSess.sync({
				success: function() {
					Ti.API.info('Sync finished successfully.');
				},
				error: function(e) {
					Ti.API.error('Error during sync. ' + e.message);
				},
				progress: function(e) {
					Ti.API.info("Stage: " + e.stage + " Value: " + e.value);
				}
			});
		}
	} catch (e) {
		Ti.API.error('Exception occurred')
	}

### void cancelSync()

Attempts to cancel the sync from another thread. It's a non-blocking call that works on best-effort basis. If cancel is successful, the error callback specified for the `sync` request will report an errorCode of `opensync.ose.OSESesssion.SYNC\_CANCELED`.

_Throws exception on error_

### void close()

Closes the session and releases its resources. It's expected that before application exists, it calls this function.

_Throws exception on error_

### void saveUser()
Saves user information in OSE meta files.

_Throws exception on error_

### void selectPub(name)
Adds publication to the list of publications to be synchronized selectively.

* name [string]: publication name, pass null to unselect all publications and revert to normal (non-selective) sync

_Throws exception on error_

### void setNewPassword(pwd)
Allows clients to modify their password. Upon successful sync, client's password on the server will be changed to the new password

* pwd [string]: new password

_Throws exception on error_

### string getAppRoot()
Gets current root location.

### void setAppRoot(appRoot)
Allows specification of the root directory for various internal sync files as well as database files.

* appRoot [string]: directory string

### boolean getBackground()
Gets a flag which indicates whether sync should be background. The default is false, indicating foreground sync.

### void setBackground(on)
Sets a flag which indicates whether sync should be background.

* on [boolean]: true if background, false if foreground

### boolean getEncryptDatabases()
Gets the current value of encrypt databases flag.

### void setEncryptDatabase(on)
Enables database encryption for new databases created during sync. The encryption mechanism is plugin-dependent. If plugin does not support encryption, this option has no effect. Once a database is encrypted, the engine will store this setting so that the database can be accessed later. Currently sync password serves as encryption key for all databases.

* on [boolean]: true to enable encryption, false to disable

### int getEncryptionType()
Gets current encryption type. The default is ENC\_AES.

### void setEncryptionType(type)
Sets sync encryption type to one of: ENC\_AES, ENC\_SSL or ENC\_NONE.

* type [int]: encryption type.

_Throws exception on error_

### void setPassword(pwd)
Sets sync user password.

* pwd [string]: sync password

_Throws exception on error_

### boolean getForceRefresh()
Gets current value set by setForceRefresh(boolean).

### void setForceRefresh(on)
To wipe out all of client's data and replace it with server's data, set this to true. The default is false.

* on [boolean]: if true, upon sync completion, the client's data will be wiped out and replaced with server's data

### string getProxy()
Returns current http proxy.

### void setProxy(proxy)
Sets current http proxy.

* proxy [string]: http proxy or null if proxy is not used

### boolean getSavePassword()
Gets the boolean flag set by setSavePassword(boolean). The default is false.

### void setSavePassword(on)
Sets the flag for persistently saving user password. If true, the password will be saved.

* on [boolean]:  set to true, if the password needs to be saved.

### boolean getSyncApps()
Gets a flag that indicates whether sync should download a list of application/client updates so they can later be installed. The default is true.

### void setSyncApps(on)
Sets a flag that indicates whether application/client updates should be downloaded during sync.

* on [boolean]: true or false

### int getSyncDirection()
Gets the current sync direction set by setSyncDirection(int). The default is DIR\_SENDRECEIVE.

### void setSyncDirection(dir)
Sets the sync direction.

* dir [int]: sync direction

_Throws exception on error_

### boolean getSyncNewPub()
Gets current value set by setSyncNewPub(boolean).

### void setSyncNewPub(on)
Sets flag for enabling synchronization of new publications. If set to true, any subscribed new publications on the server will be downloaded to the client. Default = true.

* on [boolean]: if true, any subscribed new publications on the server will be downloaded to the client. The default is true.

### int getSyncPriority()
Gets sync priority. The default is PRIO\_DEFAULT.

### void setSyncPriority(prio)
Sets sync priority.

* prio [int]: PRIO\_DEFAULT or PRIO\_HIGH

_Throws exception on error_

### int getTransportType()
Gets current sync transport type.

### void setTransportType(type)
Sets current transport type.

* type [int]: TR\_HTTP or TR\_USER

_Throws exception on error_

### string getURL()
Returns current mobile server URL.

### void setURL(url)
Sets HTTP URL of the mobile server.

* url [string]: mobile server URL for example: http://localhost:99 or https://localhost or localhost:99 or localhost (the protocol will default to http).

### boolean getUseFiles()
Gets the current UseFiles value setUseFiles(boolean).

### void setUseFiles(on)
Enables switching between streaming and using files to transport synchronization data. If set to true, sync will store uploaded and downloaded data in a file, otherwise, data will be streamed. The default is false.

Note: streaming requires that the underlying client transport stack implements HTTP 1.1

* on [boolean]: if true, sync will use files to store uploaded and downloaded data, otherwise, data will be streamed.

### string getUser()
Gets current sync user name.

### boolean getUseResume()
Gets the current UseResume value setUseResume(boolean).

### void setUseResume(on)
Enables using resume functionality, which will attempt to resume sending or receiving data during sync in light of network failure. This option will set UseFiles to be on (setUseFiles(boolean)), UseResume provides much more reliable transport for synchronizing data at the expense of very light performance overhead. The default is false.

* on [boolean]: if true, resume functionality is enabled.

## Constants

### OSESession Constants

* __DIR\_RECEIVE__
Sync direction RECEIVE Data is only received, but not sent
* __DIR\_SEND__
Sync direction SEND Data is only sent, but not received
* __DIR\_SENDRECEIVE__
Sync direction SENDRECEIVE Bidirectional sync, this is the default
* __ENC\_AES__
Encryption type AES, this is the default
* __ENC\_NONE__
No encryption
* __ENC\_SSL__
Encryption type SSL Uses HTTPS protocol, so the data will go through secure sockets
* __PRIO\_DEFAULT__
Normal data priority
* __PRIO\_HIGH__
High data priority
* __PRIO\_LOWEST__
Low data priority
* __TR\_HTTP__
Transport type HTTP, this is the default
* __TR\_USER__
Transport type USER Data is transfered by custom transport provided by application
	
### OSEException Constants

OSE error codes

* __CONFIG\_LOAD\_ERROR__
Failed to load sync meta information
* __CONFIG\_SAVE\_ERROR__
Failed to save sync meta information
* __CONNECTION\_TO\_SRV\_FAILED__
Failed to connect to mobile server This error code is for pure java clients only.
* __DATABASE\_NOT\_FOUND__
Could not find given database
* __EMPTY\_PASSWORD__
Blank password is not allowed
* __EMPTY\_USER__
User name cannot be blank
* __ENCRYPTION\_ID\_MISMATCH__
Sent encryption id does not match received encryption id
* __ERR\_CREDENTIALS__
Failed to get credentials from the server.
* __ERROR\_RESUME\_RECEIVE__
Resume transport failure in receiving data
* __ERROR\_RESUME\_SEND__
Resume transport failure in sending data
* __HTTP\_RESPONSE__
Received unsuccessful http response
* __HTTP\_TRANSPORT\_ERROR__
Http transport error has occurred
* __INTERNAL\_ERROR__
Internal error has occurred, see cause
* __INVALID\_BUFFER__
Internal error: invalid buffer specified This error code is for native clients only.
* __INVALID\_DML\_TYPE__
Invalid DML type of a record received from plugin
* __INVALID\_ENCR\_VER__
Invalid encryption transport version specified
* __INVALID\_ENCRYPTION\_TYPE__
Invalid encryption type specified
* __INVALID\_HANDLE__
Internal error: invalid handle specified This error code is for native clients only.
* __INVALID\_HTTP\_URL__
Invalid Http URL specified
* __INVALID\_INT\_OPT__
Internal error: invalid numeric option specified This error code is for native clients only.
* __INVALID\_OPCODE__
Invalid opcode received from mobile server
* __INVALID\_PLUGIN\_FLAGS__
Plugin has some invalid flags set This error code is for native clients only.
* __INVALID\_PRIORITY__
Invalid priority specified
* __INVALID\_SESS__
Session is invalid or closed
* __INVALID\_STR\_OPT__
Internal error: ivalid string option specified This error code is for native clients only.
* __INVALID\_STRING\_LENGTH__
Invalid string length received in given opcode
* __INVALID\_SYNC\_DIRECTION__
Invalid sync direction specified
* __INVALID\_TRANSPORT\_TYPE__
Invalid transport type specified
* __MISSING\_DEFAULT\_DATABASE__
Missing default database needed to create a given snapshot
* __MISSING\_PLUGIN\_API__
Plugin API is missing in the plugin library This error code is for native clients only.
* __NOT\_SUPPORTED__
Feature is not supported
* __OPCODE\_LENGTH\_OVERRUN__
Not enough bytes left in a given opcode to process
* __OPCODE\_LENGTH\_UNDERRUN__
Opcode has some extra bytes remaining
* __OPCODE\_OUT\_OF\_SEQUENCE__
Received opcode out of sequence
* __PASSWORD\_NOT\_SPECIFIED__
Sync password is missing and was not previously saved
* __PLUGIN\_CLASS\_INIT\_FAILED__
Failed to initialize plugin class This error code is for pure java clients only.
* __PLUGIN\_CLASS\_NOT\_FOUND__
Could not load class for given plugin
* __PLUGIN\_EXCEPTION__
Exception was thrown by plugin
* __PLUGIN\_ID\_NOT\_FOUND__
Could not find plugin with given id
* __PUBLICATION\_ID\_MISMATCH__
Publication id for snapshot does not much publication id in given transaction
* __PUBLICATION\_ID\_NOT\_FOUND__
Could not find publication with given id
* __PUBLICATION\_NOT\_FOUND__
Could not find publication with given name
* __SERVER\_ERROR__
Error was received from mobile server
* __SNAP\_NAME\_NOT\_FOUND__
Could not find snapshot with given name
* __SNAPSHOT\_ID\_EXISTS__
Snapshot with given id already exists
* __SNAPSHOT\_ID\_NOT\_FOUND__
Could not find snapshot with given id
* __SYNC\_CANCELED__
Sync was canceled from another thread
* __TRANS\_NOT\_FOUND__
Could not find transaction with given id
* __UNCOMPRESSED\_DATA__
Received erroneous uncompressed data from mobile server
* __UNEXP\_TERM\_OPCODE__
Received unexpected termination opcode from mobile server
* __UNEXPECTED\_BLOB\_DATA__
Blob data received for plugin that doesn't support blobs
* __UNEXPECTED\_OPCODE__
Unexpected opcode received from mobile server
* __UNINIT\_USER\_TRANSPORT__
User transport is not set while transport type is set to USER
* __UNRECOGNIZED\_DATA__
Received unrecognized data from mobile server
* __USER\_NOT\_SPECIFIED__
Sync user name is missing and the last user was not saved
* __USER\_TRANSPORT\_ERROR__
User transport error has occurred

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.
