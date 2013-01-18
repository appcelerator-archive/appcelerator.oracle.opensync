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
import android.app.Activity;
import java.io.IOException;
import android.util.Log;

@Kroll.module(name="OracleOpensync", id="oracle.opensync")
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
        
        try {
        	Log.e("OracleOpenSync", ">>>DIRECTORY:" + activity.getDir("oracle.sync", 1 /*MODE_WORLD_READABLE*/).getCanonicalPath());
        } catch (IOException ex) {}
	}

	// This little deal here makes the 'BGAgentStatus' part of the JS namespace
	// just like the Oracle documents descript. I've tried any number of other
	// techniques including Kroll annotations to allow the BGAgentStatus constants
	// to be surfaced without instantiating an actuall proxy object, but to no avail.
	private BGAgentStatusStaticProxy _bgAgentStatus = new BGAgentStatusStaticProxy();
	
	@Kroll.getProperty(name="BGAgentStatus")
	public BGAgentStatusStaticProxy getBGAgentStatus()
	{
		return _bgAgentStatus;
	}
}

