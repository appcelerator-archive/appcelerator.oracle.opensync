/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync.syncagent;

import java.util.HashMap;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiApplication;

import ti.oracle.opensync.syncagent.BGAgentStatusNamespaceProxy;
import ti.oracle.opensync.syncagent.BGSessionNamespaceProxy;
import ti.oracle.opensync.syncagent.BGSessionProxy;

@Kroll.proxy
public class syncagentNamespaceProxy extends KrollProxy {
	// These methods and proxies are here to make the namespaces match
	// the Oracle SDK namespaces. Normally this would be done using the 'parentModule'
	// annotation but there is a bug in the build scripts that do not honor the top level
	// module name and so it is unable to build. This is to workaround that limitation
	// until it can be fixed.

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Kroll.method
	public BGSessionProxy createBGSession(@Kroll.argument(optional=true) HashMap options)
	{
		BGSessionProxy sessionProxy = new BGSessionProxy();
		if (options != null) {
			sessionProxy.handleCreationDict(new KrollDict(options));
		}
		sessionProxy.setActivity(TiApplication.getAppCurrentActivity());
		
		return sessionProxy;
	}
	
	private BGAgentStatusNamespaceProxy _bgAgentStatus = new BGAgentStatusNamespaceProxy();
	@Kroll.getProperty(name="BGAgentStatus")
	public BGAgentStatusNamespaceProxy getBGAgentStatus()
	{
		return _bgAgentStatus;
	}

	private BGSessionNamespaceProxy _bgSession = new BGSessionNamespaceProxy();
	@Kroll.getProperty(name="BGSession")
	public BGSessionNamespaceProxy getBGSession()
	{
		return _bgSession;
	}

}
