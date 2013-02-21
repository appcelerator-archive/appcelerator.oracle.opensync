# Oracle Opensync Module

## BGAgentStatus

The method listed below is accessible either from a BGAgentStatus proxy that is returned from calling the `getAgentStatus` method of a BGSession proxy __or__ directly from the `opensync.syncagent.BGAgentStatus` namespace proxy.

The properties listed below are only accessible from a BGAgentStatus proxy that is returned from calling the `getAgentStatus` method of a BGSession proxy. 

The constants listed below are accessible either from a BGAgentStatus proxy that is returned from calling the `getAgentStatus` method of a BGSession proxy __and__ directly from the `opensync.syncagent.BGAgentStatus` namespace proxy.

## Methods

### string statusName(statusCode)

Get language-specific name of a given status code.

* statusCode [int]: status code as specified by one of the constants

## Properties

### appName [string]

The name of the application or process which is running sync agent.

### batteryPower [int]

Remaining battery life in %, if relevant.

### clientId [string]

Sync user name.

### networkName [string]

Name of the network currently used for sync, evaluated by sync agent.

### networkSpeed [int]

Network bandwidth, in bits per second.

### processId [int]

Process id of the process which is running sync agent, if relevant for a given platform.

### statusCode [int]

Status code represented by one of the constants above.

## Constants

* __DEFUNCT__
* __PAUSE\_PENDING__
Sync agent is in the process of being paused.
* __PAUSED__
Sync agent is paused.
* __RESUME\_PENDING__
Sync agent is in the process of resuming.
* __RUNNING__
Sync agent is running.
* __START\_PENDING__
Sync agent is in the process of starting.
* __STOP\_PENDING__
Sync agent is in the process of stopping.
* __STOPPED__
Sync agent application is not running.

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.
