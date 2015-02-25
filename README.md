appcelerator.oracle.opensync [![Build Status](https://magnum.travis-ci.com/appcelerator-modules/appcelerator.oracle.opensync.svg?token=ph6xdReX6PW2XENunBEH&branch=master)](https://magnum.travis-ci.com/appcelerator-modules/appcelerator.oracle.opensync)
============================

Steps to build this module:

__Generic Version__

Navigate to the `android` folder and type `ant`. This will build the appcelerator.oracle.opensync version of the module. The
built module can be distributed without the Oracle MDK files. Note that it is required to copy the appropriate `lib` and 
`platform` files into the installed module folder in order for the module to be used.

__BDB Version__

Navigate to the `android` folder and type `ant bdb`. This will build the appcelerator.oracle.opensync.bdb version of the module. The
built module can be used for development and is pre-configured with the Oracle MDK files need for the Berkeley Database.

__SQL Version__

Navigate to the `android` folder and type `ant sql`. This will build the appcelerator.oracle.opensync.sql version of the module. The
built module can be used for development and is pre-configured with the Oracle MDK files need for the native SQL Database.

__Distribution__

Type './build.py' from the module's root folder. This will build the generic version of the module and package it for distribution.

