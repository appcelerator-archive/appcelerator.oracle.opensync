# Oracle Opensync Module

## BGSession

The methods listed below are only accessible from a BGSession proxy that is returned from calling `opensync.syncagent.createBGSession`. 

The constants listed below are accessible either from the BGSession proxy that is returned from calling `opensync.syncagent.createBGSession` __or__ directly from the `opensync.syncagent.BGSession` namespace proxy.

## Methods

### boolean isOpen()

Gets the state of session. Returns _true_ if the session is available for use. Returns _false_ if the session is invalid for use.

### boolean agentEnabled()

Query whether sync agent is enabled. true if enabled, false if disabled.

_Throws exception on error_

### void close()

Close the session and release all the resources used by the session.

### void enableAgent(on)

Enable or disable sync agent. This setting is stored in ose.ini configuration file. When sync agent is disabled it is not be allowed to start. This setting can be used when only foreground sync is desired. Use agentEnabled() to query the current setting

* on [boolean]: true to enable, false to disable

_Throws exception on error_

### void pause()

Pause sync agent. If the agent is already paused or being paused this call has no effect. This call is asynchronous, it does not wait for sync agent to be paused before returning. Use waitForStatus(int, long) to wait for sync agent.

_Throws exception if sync agent is not in the state RUNNING, PAUSED, or PAUSE\_PENDING._

### void resume()

Resume sync agent. If the agent is aready running, starting, or resuming this call has no effect. This call is asynchronous, it does not wait for sync agent to be resumed before returning. Use waitForStatus(Args) to wait for sync agent.

_Throws exception if sync agent is not in the state PAUSED, RESUME\_PENDING, START\_PENDING or RUNNING._

### void showUI()

Bring up sync agent UI. Normally sync agent is running as background application. This call will bring it in the foreground and show UI which allows to see various statistics and to control sync agent. The UI is a part of sync agent application so it can only be present after sync agent is started. User can manually hide the UI.

_Throws exception if sync agent is stopped or internal error has occurred_

### void start

Start sync agent. If the agent is aready running, starting, or resuming this call has no effect. If the agent is paused, this call with resume the agent. This call is asynchronous, it does not wait for sync agent to be started before returning. Use waitForStatus(Args) to wait for sync agent.

_Throws exception if sync agent is not in the state STOPPED, START\_PENDING, RUNNING, PAUSED or RESUME\_PENDING (that is the agent is in the state PAUSE\_PENDING or STOP\_PENDING), or if sync agent is disabled_

### void stop()

Stop sync agent. If the agent is aready stopped or stopping this call has no effect. This call is asynchronous, it does not wait for sync agent to be stopped before returning. Use waitForStatus(Args) to wait for sync agent.

_Throws exception if sync agent is not in the state RUNNING, PAUSED, STOPPED or STOP\_PENDING._

### void waitForStatus(Args)

Wait for sync agent to reached specified status. `Args` is a dictionary with the following properties:

* status [int]: the status to wait for. Only RUNNING, PAUSED, or STOPPED are accepted.
* timeout [int]: maximum time to wait for in milliseconds.
* success [function]: A callback function that is executed when the specified status is reached (optional). Parameters passed to the callback function are:
    * success [boolean]: `true`
* error [function]: A callback function that is executed on error or timeout (optional)
    * error [boolean]: `true`
    * errorCode [int]: Error code from the ose session
    * message [string]: Error message text

#### Example

	mBgSess = opensync.syncagent.createBGSession();
	if (mBgSess.isOpen()) {
		if (mBgSess.getAgentStatusCode() != opensync.syncagent.BGAgentStatus.STOPPED)) {
			mBgSess.showUI();
		} else {
			mBgSess.start();
			// Wait until the sync agent is running, then display the UI
			mBgSess.waitForStatus({
				status: opensync.syncagent.BGAgentStatus.RUNNING,
				timeout: 5000,
				success: function() {
					mBgSess.showUI();
				},
				error: function(e) {
					Ti.API.error(JSON.stringify(e));
				}
			});
		}
	}

### [BGAgentStatus](bgagentstatus.html) getAgentStatus()

Get current sync agent status information.

_Throws exception on error_

### int getAgentStatusCode()

Get current sync agent status code constant.

_Throws exception on error_

### string getFatalError()

If sync agent is in state DEFUNCT, retrieve the error information that caused the bad internal state.

_Throws exception on error_

### [BGSyncStatus](bgsyncstatus.html) getSyncStatus()

Get current status of sync within sync agent.

_Throws exception on error_

### void setMessageHandler(callback)

Add a custom message handler to sync agent. 

* callback [function]: A callback function that is executed when a background sync event occurs. Parameters passed to the callback function are:
    * id [int]: Application-specific message id
    * source [string]: Name of application that created the message
    * text [string]: Message text
    * time [long]: Message creation time in milliseconds since epoch
    * type [string]: Message type, can be one of "INFO", "WARNING", or "ERROR"
    * cause [string]: For error messages, optional cause of the error, can be null

## Constants

### BGSession Constants

* __DISABLE\PROP__

### BGException Constants

Error codes for background sync, as used by BGException. Some BGException instances are thrown from the background sync control APIs. Others are used as causes of the background sync error messages.

* __ACTIVE\_CONNECTIONS\_PRESENT__
Cannot stop the agent because active connection(s) are present This error code is for native clients only.
* __AGENT\_DEFUNCT__
Sync agent is in a bad internal state
* __AGENT\_DISABLED__
Could not start sync agent because it is disabled
* __AGENT\_NOT\_RUNNING__
Operation cannot be performed because sync agent is not running This error code is for native clients only.
* __ANOTHER\_INSTANCE__
Cannot start sync agent because another instance is already running This error code is for native clients only.
* __CONTROL\_CONNECTION\_CLOSED__
Control connection to the agent is closed due to an error This error code is for native clients only.
* __INVALID\_COMMAND__
Internal error: invalid command received This error code is for native clients only.
* __INVALID\_COND\_SUBTYPE__
Invalid subtype for a condition rule
* __INVALID\_COND\_TYPE__
Invalid type for a condition rule
* __INVALID\_DATE\_FORMAT__
Invalid date format in time rule
* __INVALID\_EVENT\_SUBTYPE__
Invalid subtype for an event rule
* __INVALID\_EVENT\_TYPE__
Invalid type for an event rule
* __INVALID\_NUMERIC\_PARAMETER__
Internal error: invalid numeric parameter specified This error code is for native clients only.
* __INVALID\_PARAMETER__
Internal error: invalid parameter specified.
* __INVALID\_RULE\_CLASS__
Invalid rule class detected (only event and condition are allowed)
* __INVALID\_RULE\_SUBTYPE__
Invalid rule subtype detected
* __INVALID\_RULE\_SUBTYPE\_TYPE__
Invalid rule subtype for a give rule type
* __INVALID\_RULE\_TYPE__
Invalid rule type detected
* __INVALID\_SESSION__
Invalid or closed BGSession object provided
* __INVALID\_STRING\_PARAMETER__
Internal error: invalid string parameter specified This error code is for native clients only.
* __INVALID\_WAIT\_STATUS__
Invalid sync agent status to wait for.
* __NO\_BG\_PUBS__
Cannot start or resume sync agent because no background sync publications are found on the client.
* __OPERATION\_NOT\_ALLOWED__
Control operation not allowed with sync agent being in a given state
* __PAUSE\_FAILED__
Failed to pause sync agent
* __READER\_CANCELED__
Internal error: message reader was canceled from another thread This error code is for native clients only.
* __RESUME\_FAILED__
Failed to resume sync agent
* __SQL\_RULE\_MISSING\_QUERY__
Missing query string for SQL rule
* __START\_FAILED__
Failed to start sync agent
* __STOP\_FAILED__
Failed to stop sync agent
* __TOO\_MANY\_READERS__
Cannot create message reader because the allowed maximum of running readers will be exceeded This error code is for native clients only.
* __UNSUPPORTED__
Operation is not supported
* __WAIT\_TIMEOUT__
Control operation has timed out This error code is for native clients only.

### BGMessage Constants

Background sync message codes. There are 3 types of messages as indicated below: info, warning and error. This list also contains other constants used by sync agent.

* __AGENT\_PAUSED__
Info: sync agent has been paused
* __AGENT\_RESUMED__
Info: sync agent has been resumed
* __AGENT\_STARTED__
Info: sync agent has been started
* __AGENT\_STOPPED__
Info: sync agent has been stopped
* __APPLY\_FAILED__
Error: apply failed
* __APPLY\_FINISHED__
Info: apply has finished successfully
* __APPLY\_STARTED__
Info: apply has started
* __BATTERY\_LOW__
Warning: battery low
* __COMPOSE\_FAILED__
Error: compose failed
* __COMPOSE\_FINISHED__
Info: compose has finished successfully
* __COMPOSE\_STARTED__
Info: compose has started
* __DUPLICATE\_PLATFORM\_DB__
Duplicate platform database detected
* __INTERNAL\_ERROR__
Error: internal error has occured
* __INVALID\_SERVER\_NOTIFICATION__
Error: invalid server notification received
* __MEMORY\_LOW__
Warning: memory low
* __NET\_AUTODIAL\_FAILED__
Error: failed to dial up specified network
* __NET\_MANAGER\_ERROR__
Error: failed to evaluate network state
* __NETWORK\_CHANGED__
Info: network has changed
* __NETWORK\_EVAL__
Info: evaluated network
* __NO\_NETWORK__
* __PLAT\_RULE\_IN\_NON\_PLAT\_DB__
Error: found platform rule in non-platform database
* __POWER\_MANAGER\_ERROR__
Error: failed to evaluate power state
* __RULE\_EVAL\_DB\_LOCKED__
Failed to evaluate DB rule because client database is locked
* __RULE\_EVAL\_FAILED__
Error: failed to evaluate a rule
* __RULE\_LOAD\_FAILED__
Error: failed to load or parse a background sync rule
* __SERVER\_NOTIFICATION__
Info: server notification has been received
* __SERVER\_NOTIFICATION\_FAILED__
Error: failed to get server notification
* __SYNC\_FAILED__
Error: sync failed
* __SYNC\_FINISHED__
Info: sync has finished successfully
* __SYNC\_STARTED__
Info: sync has started
* __TRACE__
Info: trace message with debug information
* __UNKNOWN__


## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.
