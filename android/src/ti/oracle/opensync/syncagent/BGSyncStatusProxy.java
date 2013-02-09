/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync.syncagent;

import oracle.opensync.syncagent.BGSyncStatus;

import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy
public class BGSyncStatusProxy extends KrollProxy
{
	private BGSyncStatus _syncStatus;
	
	public BGSyncStatusProxy(BGSyncStatus syncStatus)
	{
		super();
		_syncStatus = syncStatus;
	}
	// Methods
	
	@Kroll.getProperty
	public long getEndTime()
	{
		return _syncStatus.endTime;
	}
	
	@Kroll.getProperty
	public String getLastError()
	{
		Throwable error = _syncStatus.lastError;
		return (error != null) ? error.toString() : null;
	}
	
	@Kroll.getProperty
	public int getPrio()
	{
		return _syncStatus.prio;
	}
	
	@Kroll.getProperty
	public int getProgressStage()
	{
		return _syncStatus.progressStage;
	}
	
	@Kroll.getProperty
	public int getProgressVal()
	{
		return _syncStatus.progressVal;
	}
	
	@Kroll.getProperty
	public String[] getPubs()
	{
		return _syncStatus.pubs;
	}
	
	@Kroll.getProperty
	public long getStartTime()
	{
		return _syncStatus.startTime;
	}
}