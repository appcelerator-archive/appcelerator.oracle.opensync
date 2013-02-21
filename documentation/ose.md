# Oracle Opensync Module

## ose

The `ose` namespace provides access to the following namespace proxies:

* [OSESession](osesession.html)
* [OSEProgressListener](oseprogresslistener.html)

## Methods

### [OSESession](osesession.html) createOSESession(Args)

Creates a new sync session proxy for a user. `Args` is an optional dictionary with the following properties:

* user [string]: sync user name (_optional_)
* password [string]: sync user password (_optional_)

There are three distinct ways to create the [oseSession](osesession.html) proxy, depending on what arguments are provided:

* No arguments - If the last sync client was saved, the session will be initialized with the saved info
* `user` - If the user's info was saved, the session will be initialized with the saved info. If the password was not saved, it can be set later by calling `setPassword`
* `user` and `password` - The session will be initialized with the provided info.

#### Example

    // Create the OpenSync session using the last sync client if it exists
    var mSess = opensync.ose.createOSESession();
    if (!mSess.isOpen()) {
        mSess = null;
    }

    // Create the OpenSync session with the specified user and password
    var mSess = opensync.ose.createOSESession({
        user: 'joeuser',
        password: 'password'
    });

## Properties

### [OSEProgressListener](oseprogresslistener.html) [proxy]

Namespace proxy providing access to the [OSEProgressListener](oseprogresslistener.html) constants.

### [OSESession](osesession.html) [proxy]

Namespace proxy providing access to the [OSESession](osesession.html) and [OSEExceptionConstants](osesession.html) constants.

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.
