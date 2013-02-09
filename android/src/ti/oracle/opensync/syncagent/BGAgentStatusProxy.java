/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync.syncagent;

import org.appcelerator.kroll.annotations.Kroll;

import oracle.opensync.syncagent.BGAgentStatus;
import ti.oracle.opensync.syncagent.BGAgentStatusNamespaceProxy;

@Kroll.proxy
public class BGAgentStatusProxy extends BGAgentStatusNamespaceProxy
{
	private BGAgentStatus _agentStatus;

	public BGAgentStatusProxy(final BGAgentStatus agentStatus)
	{
		super();
		_agentStatus = agentStatus;
	}
	
	// Properties
	
	@Kroll.getProperty
	public String getAppName()
	{
		return _agentStatus.appName;
	}
	
	@Kroll.getProperty 
	public int getBatteryPower()
	{
		return _agentStatus.batteryPower;
	}
	
	@Kroll.getProperty
	public String getClientId()
	{
		return _agentStatus.clientId;
	}
	
	@Kroll.getProperty
	public String getNetworkName()
	{
		return _agentStatus.networkName;
	}
	
	@Kroll.getProperty
	public int getNetworkSpeed()
	{
		return _agentStatus.networkSpeed;
	}
	
	@Kroll.getProperty
	public int getProcessId()
	{
		return _agentStatus.processId;
	}
	
	@Kroll.getProperty
	public int getStatusCode()
	{
		return _agentStatus.statusCode;
	}
}