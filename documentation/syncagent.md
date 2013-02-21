# Oracle Opensync Module

## syncagent

The `syncagent` namespace provides access to the following namespace proxies:

* [BGSession](bgsession.html)
* [BGAgentStatus](bgagentstatus.html)

## Methods

### [BGSession](bgsession.html) createBGSession()

Creates a new session to interact with sync agent.

#### Example

	mBgSess = opensync.syncagent.createBGSession();
	if (!mBgSess.isOpen()) {
		mBgSess = null;
	}

## Properties

### [BGAgentStatus](bgagentstatus.html) [proxy]

Namespace proxy providing access to the [BGAgentStatus](bgagentstatus.html) constants.

### [BGSession](bgsession.html) [proxy]

Namespace proxy providing access to the [BGSession](bgsession.html), [BGMessageConstants](bgsession.html) and [BGExceptionConstants](bgsession.html) constants.

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.
