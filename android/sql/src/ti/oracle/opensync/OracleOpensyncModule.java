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

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiApplication;

import ti.oracle.opensync.namespaces.BGAgentStatusNamespaceProxy;
import ti.oracle.opensync.namespaces.BGSessionNamespaceProxy;
import ti.oracle.opensync.namespaces.OSEProgressListenerNamespaceProxy;
import ti.oracle.opensync.namespaces.OSESessionNamespaceProxy;
import ti.oracle.opensync.proxies.BGSessionProxy;
import ti.oracle.opensync.proxies.OSESessionProxy;

import android.app.Activity;

@Kroll.module(name="OracleOpensync", id="ti.oracle.opensync.sql")
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
		return TiApplication.getInstance().getDir("oracle.sync", 0).toString();
	}

	// These methods and proxies are here to make the namespaces match
	// the Oracle SDK namespaces. Normally this would be done using the 'parentModule'
	// annotation but there is a bug in the build scripts that do not honor the top level
	// module name and so it is unable to build. This is to workaround that limitation
	// until it can be fixed.

	@Kroll.method
	public BGSessionProxy createBGSession(@Kroll.argument(optional=true) KrollDict options)
	{
		BGSessionProxy sessionProxy = new BGSessionProxy();
		sessionProxy.setCreationUrl(getCreationUrl().getNormalizedUrl());
		sessionProxy.handleCreationDict(options);
		sessionProxy.setActivity(getActivity());
		
		return sessionProxy;
	}
	
	@Kroll.method
	public OSESessionProxy createOSESession(@Kroll.argument(optional=true) KrollDict options)
	{
		OSESessionProxy sessionProxy = new OSESessionProxy();
		sessionProxy.setCreationUrl(getCreationUrl().getNormalizedUrl());
		sessionProxy.handleCreationDict(options);
		sessionProxy.setActivity(getActivity());
		
		return sessionProxy;
	}

	private BGAgentStatusNamespaceProxy _bgAgentStatus = new BGAgentStatusNamespaceProxy();
	@Kroll.getProperty(name="BGAgentStatus")
	public BGAgentStatusNamespaceProxy getBGAgentStatus()
	{
		return _bgAgentStatus;
	}

	private OSEProgressListenerNamespaceProxy _oseProgressListener = new OSEProgressListenerNamespaceProxy();
	@Kroll.getProperty(name="OSEProgressListener")
	public OSEProgressListenerNamespaceProxy getOSEProgressListener()
	{
		return _oseProgressListener;
	}

	private BGSessionNamespaceProxy _bgSession = new BGSessionNamespaceProxy();
	@Kroll.getProperty(name="BGSession")
	public BGSessionNamespaceProxy getBGSession()
	{
		return _bgSession;
	}

	private OSESessionNamespaceProxy _oseSession = new OSESessionNamespaceProxy();
	@Kroll.getProperty(name="OSESession")
	public OSESessionNamespaceProxy getOSESession()
	{
		return _oseSession;
	}
}

