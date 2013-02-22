/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package appcelerator.oracle.opensync.syncagent;

import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

import oracle.opensync.syncagent.BGAgentStatus;

@Kroll.proxy
public class BGAgentStatusNamespaceProxy extends KrollProxy
{
	// Session API constants
	@Kroll.constant public static final int STOPPED = BGAgentStatus.STOPPED;
	@Kroll.constant public static final int START_PENDING = BGAgentStatus.START_PENDING;
	@Kroll.constant public static final int RUNNING = BGAgentStatus.RUNNING;
	@Kroll.constant public static final int PAUSE_PENDING = BGAgentStatus.PAUSE_PENDING;
	@Kroll.constant public static final int PAUSED = BGAgentStatus.PAUSED;
	@Kroll.constant public static final int RESUME_PENDING = BGAgentStatus.RESUME_PENDING;
	@Kroll.constant public static final int STOP_PENDING = BGAgentStatus.STOP_PENDING;
	@Kroll.constant public static final int DEFUNCT = BGAgentStatus.DEFUNCT;

	// Methods
	
	@Kroll.method
	public String statusName(int statusCode)
	{
		return BGAgentStatus.statusName(statusCode);
	}
}