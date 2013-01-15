/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync;

import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.annotations.Kroll;

import android.app.Activity;
import android.util.Log;

@Kroll.module(name="OracleOpensync", id="oracle.opensync")
public class OracleOpensyncModule extends KrollModule
{
	// Standard Debugging variables
	private static final String LCAT = "OracleOpensync";
	
	public OracleOpensyncModule()
	{
		super();
	}
	
	@Override
	public void onDestroy(Activity activity) 
	{
		// This method is called when the root context is being destroyed
		Log.e(LCAT, ">>>>onDestroy for module");

		super.onDestroy(activity);
	}
}

