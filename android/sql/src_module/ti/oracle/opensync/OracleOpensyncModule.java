/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync;

import oracle.opensync.util.PlatformFactory;
import oracle.opensync.util.android.AndroidPlatformFactory;

import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.kroll.KrollRuntime;
import org.appcelerator.kroll.KrollDict;

import ti.oracle.opensync.namespaces.BGAgentStatusNamespaceProxy;
import ti.oracle.opensync.namespaces.BGSessionNamespaceProxy;
import ti.oracle.opensync.namespaces.OSEProgressListenerNamespaceProxy;
import ti.oracle.opensync.namespaces.OSESessionNamespaceProxy;

import android.app.Activity;
import java.io.IOException;
import android.util.Log;

@Kroll.module(name="OracleOpensync", id="oracle.opensync.sql")
public class OracleOpensyncModule extends KrollModule
{
	public OracleOpensyncModule()
	{
		super();
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
		try {
			return "file://" + getActivity().getDir("oracle.sync", 1 /*MODE_WORLD_READABLE*/).getCanonicalPath();
		} catch (IOException ex) {
			return "";
		}
	}

	// These proxies here makes the namespace proxies part of the JS namespace
	// just like the Oracle documents. I've tried any number of other
	// techniques including Kroll annotations to allow these constants
	// to be surfaced without instantiating an actual proxy object, but to no avail.

	private BGAgentStatusNamespaceProxy _bgAgentStatus = new BGAgentStatusNamespaceProxy();
	@Kroll.getProperty(name="bgAgentStatus")
	public BGAgentStatusNamespaceProxy getBGAgentStatus()
	{
		return _bgAgentStatus;
	}

	private OSEProgressListenerNamespaceProxy _oseProgressListener = new OSEProgressListenerNamespaceProxy();
	@Kroll.getProperty(name="oseProgressListener")
	public OSEProgressListenerNamespaceProxy getOSEProgressListener()
	{
		return _oseProgressListener;
	}

	private BGSessionNamespaceProxy _bgSession = new BGSessionNamespaceProxy();
	@Kroll.getProperty(name="bgSession")
	public BGSessionNamespaceProxy getBGSession()
	{
		return _bgSession;
	}

	private OSESessionNamespaceProxy _oseSession = new OSESessionNamespaceProxy();
	@Kroll.getProperty(name="oseSession")
	public OSESessionNamespaceProxy getOSESession()
	{
		return _oseSession;
	}
}

