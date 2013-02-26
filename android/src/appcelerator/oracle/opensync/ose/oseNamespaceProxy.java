/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package appcelerator.oracle.opensync.ose;

import java.util.HashMap;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiApplication;

import appcelerator.oracle.opensync.ose.OSEProgressListenerNamespaceProxy;
import appcelerator.oracle.opensync.ose.OSESessionNamespaceProxy;
import appcelerator.oracle.opensync.ose.OSESessionProxy;

@Kroll.proxy
public class oseNamespaceProxy extends KrollProxy {
	// These methods and proxies are here to make the namespaces match
	// the Oracle SDK namespaces. Normally this would be done using the 'parentModule'
	// annotation but there is a bug in the build scripts that do not honor the top level
	// module name and so it is unable to build. This is to workaround that limitation
	// until it can be fixed.
	
	@Kroll.method
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public OSESessionProxy createOSESession(@Kroll.argument(optional=true) HashMap options)
	{
		OSESessionProxy sessionProxy = new OSESessionProxy();
		if (options != null) {
			sessionProxy.handleCreationDict(new KrollDict(options));
		}
		sessionProxy.setActivity(TiApplication.getAppCurrentActivity());
		
		return sessionProxy;
	}

	private OSEProgressListenerNamespaceProxy _oseProgressListener = new OSEProgressListenerNamespaceProxy();
	@Kroll.getProperty(name="OSEProgressListener")
	public OSEProgressListenerNamespaceProxy getOSEProgressListener()
	{
		return _oseProgressListener;
	}

	private OSESessionNamespaceProxy _oseSession = new OSESessionNamespaceProxy();
	@Kroll.getProperty(name="OSESession")
	public OSESessionNamespaceProxy getOSESession()
	{
		return _oseSession;
	}
}
