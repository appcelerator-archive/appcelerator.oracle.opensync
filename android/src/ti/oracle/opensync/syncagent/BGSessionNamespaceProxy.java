/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync.syncagent;

import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

import oracle.opensync.syncagent.BGExceptionConstants;
import oracle.opensync.syncagent.BGMessageConstants;
import oracle.opensync.syncagent.BGSession;

@Kroll.proxy
public class BGSessionNamespaceProxy extends KrollProxy
{
	// BGSession API constants
	@Kroll.constant public static final String DISABLE_PROP = BGSession.DISABLE_PROP;

	// BGExceptionConstants
	@Kroll.constant public static final int ACTIVE_CONNECTIONS_PRESENT = BGExceptionConstants.ACTIVE_CONNECTIONS_PRESENT;
	@Kroll.constant public static final int AGENT_DEFUNCT = BGExceptionConstants.AGENT_DEFUNCT;
	@Kroll.constant public static final int AGENT_DISABLED = BGExceptionConstants.AGENT_DISABLED;
	@Kroll.constant public static final int AGENT_NOT_RUNNING = BGExceptionConstants.AGENT_NOT_RUNNING;
	@Kroll.constant public static final int ANOTHER_INSTANCE = BGExceptionConstants.ANOTHER_INSTANCE;
	@Kroll.constant public static final int CONTROL_CONNECTION_CLOSED = BGExceptionConstants.CONTROL_CONNECTION_CLOSED;
	@Kroll.constant public static final int INVALID_COMMAND = BGExceptionConstants.INVALID_COMMAND;
	@Kroll.constant public static final int INVALID_COND_SUBTYPE = BGExceptionConstants.INVALID_COND_SUBTYPE;
	@Kroll.constant public static final int INVALID_COND_TYPE = BGExceptionConstants.INVALID_COND_TYPE;
	@Kroll.constant public static final int INVALID_DATE_FORMAT = BGExceptionConstants.INVALID_DATE_FORMAT;
	@Kroll.constant public static final int INVALID_EVENT_SUBTYPE = BGExceptionConstants.INVALID_EVENT_SUBTYPE;
	@Kroll.constant public static final int INVALID_EVENT_TYPE = BGExceptionConstants.INVALID_EVENT_TYPE;
	@Kroll.constant public static final int INVALID_NUMERIC_PARAMETER = BGExceptionConstants.INVALID_NUMERIC_PARAMETER;
	@Kroll.constant public static final int INVALID_PARAMETER = BGExceptionConstants.INVALID_PARAMETER;
	@Kroll.constant public static final int INVALID_RULE_CLASS = BGExceptionConstants.INVALID_RULE_CLASS;
	@Kroll.constant public static final int INVALID_RULE_SUBTYPE = BGExceptionConstants.INVALID_RULE_SUBTYPE;
	@Kroll.constant public static final int INVALID_RULE_SUBTYPE_TYPE = BGExceptionConstants.INVALID_RULE_SUBTYPE_TYPE;
	@Kroll.constant public static final int INVALID_RULE_TYPE = BGExceptionConstants.INVALID_RULE_TYPE;
	@Kroll.constant public static final int INVALID_SESSION = BGExceptionConstants.INVALID_RULE_TYPE;
	@Kroll.constant public static final int INVALID_STRING_PARAMETER = BGExceptionConstants.INVALID_STRING_PARAMETER;
	@Kroll.constant public static final int INVALID_WAIT_STATUS = BGExceptionConstants.INVALID_WAIT_STATUS;
	@Kroll.constant public static final int NO_BG_PUBS = BGExceptionConstants.NO_BG_PUBS;
	@Kroll.constant public static final int OPERATION_NOT_ALLOWED = BGExceptionConstants.OPERATION_NOT_ALLOWED;
	@Kroll.constant public static final int PAUSE_FAILED = BGExceptionConstants.PAUSE_FAILED;
	@Kroll.constant public static final int READER_CANCELED = BGExceptionConstants.READER_CANCELED;
	@Kroll.constant public static final int RESUME_FAILED = BGExceptionConstants.RESUME_FAILED;
	@Kroll.constant public static final int SQL_RULE_MISSING_QUERY = BGExceptionConstants.SQL_RULE_MISSING_QUERY;
	@Kroll.constant public static final int START_FAILED = BGExceptionConstants.START_FAILED;
	@Kroll.constant public static final int STOP_FAILED = BGExceptionConstants.STOP_FAILED;
	@Kroll.constant public static final int TOO_MANY_READERS = BGExceptionConstants.TOO_MANY_READERS;
	@Kroll.constant public static final int UNSUPPORTED = BGExceptionConstants.UNSUPPORTED;
	@Kroll.constant public static final int WAIT_TIMEOUT = BGExceptionConstants.WAIT_TIMEOUT;
	
	// BGMessageConstants
	@Kroll.constant public static final int AGENT_PAUSED = BGMessageConstants.AGENT_PAUSED;
	@Kroll.constant public static final int AGENT_RESUMED = BGMessageConstants.AGENT_RESUMED;
	@Kroll.constant public static final int AGENT_STARTED = BGMessageConstants.AGENT_STARTED;
	@Kroll.constant public static final int AGENT_STOPPED = BGMessageConstants.AGENT_STOPPED;
	@Kroll.constant public static final int APPLY_FAILED = BGMessageConstants.APPLY_FAILED;
	@Kroll.constant public static final int APPLY_FINISHED = BGMessageConstants.APPLY_FINISHED;
	@Kroll.constant public static final int APPLY_STARTED = BGMessageConstants.APPLY_STARTED;
	@Kroll.constant public static final int BATTERY_LOW = BGMessageConstants.BATTERY_LOW;
	@Kroll.constant public static final int COMPOSE_FAILED = BGMessageConstants.COMPOSE_FAILED;
	@Kroll.constant public static final int COMPOSE_FINISHED = BGMessageConstants.COMPOSE_FINISHED;
	@Kroll.constant public static final int COMPOSE_STARTED = BGMessageConstants.COMPOSE_STARTED;
	@Kroll.constant public static final int DUPLICATE_PLATFORM_DB = BGMessageConstants.DUPLICATE_PLATFORM_DB;
	@Kroll.constant public static final int INTERNAL_ERROR = BGMessageConstants.INTERNAL_ERROR;
	@Kroll.constant public static final int INVALID_SERVER_NOTIFICATION = BGMessageConstants.INTERNAL_ERROR;
	@Kroll.constant public static final int MEMORY_LOW = BGMessageConstants.INTERNAL_ERROR;
	@Kroll.constant public static final int NET_AUTODIAL_FAILED = BGMessageConstants.NET_AUTODIAL_FAILED;
	@Kroll.constant public static final int NET_MANAGER_ERROR = BGMessageConstants.NET_MANAGER_ERROR;
	@Kroll.constant public static final int NETWORK_CHANGED = BGMessageConstants.NETWORK_CHANGED;
	@Kroll.constant public static final int NETWORK_EVAL = BGMessageConstants.NETWORK_EVAL;
	@Kroll.constant public static final int NO_NETWORK = BGMessageConstants.NO_NETWORK;
	@Kroll.constant public static final int PLAT_FULE_IN_NON_PLAT_DB = BGMessageConstants.NO_NETWORK;
	@Kroll.constant public static final int POWER_MANAGER_ERROR = BGMessageConstants.POWER_MANAGER_ERROR;
	@Kroll.constant public static final int RULE_EVAL_DB_LOCKED = BGMessageConstants.RULE_EVAL_DB_LOCKED;
	@Kroll.constant public static final int RULE_EVAL_FAILED = BGMessageConstants.RULE_EVAL_FAILED;
	@Kroll.constant public static final int SERVER_NOTIFICATION = BGMessageConstants.SERVER_NOTIFICATION;
	@Kroll.constant public static final int SERVER_NOTIFICATION_FAILED = BGMessageConstants.SERVER_NOTIFICATION_FAILED;
	@Kroll.constant public static final int SYNC_FAILED = BGMessageConstants.SYNC_FAILED;
	@Kroll.constant public static final int SYNC_FINISHED = BGMessageConstants.SYNC_FINISHED;
	@Kroll.constant public static final int SYNC_STARTED = BGMessageConstants.SYNC_STARTED;
	@Kroll.constant public static final int TRACE = BGMessageConstants.TRACE;
	@Kroll.constant public static final int UNKNOWN = BGMessageConstants.UNKNOWN;
}