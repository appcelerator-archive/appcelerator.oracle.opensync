/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync.ose;

import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

import oracle.opensync.ose.OSEProgressListener;

@Kroll.proxy
public class OSEProgressListenerNamespaceProxy extends KrollProxy
{
	// Progress listener constants
	@Kroll.constant public static final int APPLY = OSEProgressListener.APPLY;
	@Kroll.constant public static final int COMPOSE = OSEProgressListener.COMPOSE;
	@Kroll.constant public static final int IDLE = OSEProgressListener.IDLE;
	@Kroll.constant public static final int PREPARE = OSEProgressListener.PREPARE;
	@Kroll.constant public static final int PROCESS = OSEProgressListener.PROCESS;
	@Kroll.constant public static final int RECEIVE = OSEProgressListener.RECEIVE;
	@Kroll.constant public static final int SEND = OSEProgressListener.SEND;
}