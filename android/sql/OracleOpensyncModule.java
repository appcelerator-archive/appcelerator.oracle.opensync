/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package appcelerator.oracle.opensync;

import oracle.opensync.util.PlatformFactory;
import oracle.opensync.util.android.AndroidPlatformFactory;

import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiApplication;

import appcelerator.oracle.opensync.ose.oseNamespaceProxy;
import appcelerator.oracle.opensync.syncagent.syncagentNamespaceProxy;

import android.app.Activity;
import android.util.Log;

import java.lang.Class;

@Kroll.module(name="OracleOpensync", id="appcelerator.oracle.opensync.sql")
public class OracleOpensyncModule extends KrollModule
{
	// Standard Debugging variables
	private static final String LCAT = "OracleOpensync";

	public OracleOpensyncModule()
	{
		super();
		
		Log.d(LCAT, ">>> SQL Database support detected <<<");
	}

	@Override
	public void onStart(Activity activity)
	{
        // DB file locations are determined from this application context
        // The db files will be created under: /data/data/<app name>/app_oracle.sync/sqlite_db
        ((AndroidPlatformFactory)PlatformFactory.getInstance()).setContext(activity);
	}

	@Kroll.getProperty @Kroll.method
	public String getSyncFilesRootDir()
	{
		return TiApplication.getInstance().getDir("oracle.sync", 0).toString();
	}

	// These methods and proxies are here to make the namespaces match
	// the Oracle SDK namespaces. Normally this would be done using the 'parentModule'
	// annotation but there is a bug in the build scripts that do not honor the top level
	// module name and so it is unable to build. This is to workaround that limitation
	// until it can be fixed.

	private syncagentNamespaceProxy _syncagent = new syncagentNamespaceProxy();
	@Kroll.getProperty(name="syncagent")
	public syncagentNamespaceProxy getsyncAgent()
	{
		return _syncagent;
	}
	
	private oseNamespaceProxy _ose = new oseNamespaceProxy();
	@Kroll.getProperty(name="ose")
	public oseNamespaceProxy getose()
	{
		return _ose;
	}
	
	@Kroll.getProperty(name="Database")
	public KrollProxy getDatabase()
	{
		Log.e(LCAT, "=====================================================================================");
		Log.e(LCAT, ">>>>>        Opensync module is not set up to use Berkeley database.            <<<<<");
		Log.e(LCAT, ">>>>> See module documentation for instructions on using the Berkeley database. <<<<<");
		Log.e(LCAT, ">>>>>    Otherwise, use 'ti.Database' for native SQLite database access.        <<<<<");
		Log.e(LCAT, "=====================================================================================");
			
		return null;
	}
}

