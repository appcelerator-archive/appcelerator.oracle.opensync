/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync;

import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

import ti.oracle.opensync.BerkeleyDBProxy;

@Kroll.proxy
public class BerkeleyDBNamespaceProxy extends KrollProxy
{
	// Database API constants
	@Kroll.constant public static final int FIELD_TYPE_UNKNOWN = -1;
	@Kroll.constant public static final int FIELD_TYPE_STRING = 0;
	@Kroll.constant public static final int FIELD_TYPE_INT = 1;
	@Kroll.constant public static final int FIELD_TYPE_FLOAT = 2;
	@Kroll.constant public static final int FIELD_TYPE_DOUBLE = 3;

	// Database
	@Kroll.method
	public BerkeleyDBProxy open(Object file) throws Exception
	{
		BerkeleyDBProxy db;
		try {
			db = new BerkeleyDBProxy();
			db.openDatabase(file);
		} catch (Exception e) {
			db = null;
		}

		return db;
	}
}