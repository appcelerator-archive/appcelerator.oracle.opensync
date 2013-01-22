/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync.namespaces;

import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

import oracle.opensync.ose.OSEException;
import oracle.opensync.ose.OSESession;

@Kroll.proxy
public class OSESessionNamespaceProxy extends KrollProxy
{
	// Session API constants
	@Kroll.constant public static final int DIR_RECEIVE = OSESession.DIR_RECEIVE;
	@Kroll.constant public static final int DIR_SEND = OSESession.DIR_SEND;
	@Kroll.constant public static final int DIR_SENDRECEIVE = OSESession.DIR_SENDRECEIVE;
	@Kroll.constant public static final int ENC_AES = OSESession.ENC_AES;
	@Kroll.constant public static final int ENC_NONE = OSESession.ENC_NONE;
	@Kroll.constant public static final int ENC_SSL = OSESession.ENC_SSL;
	@Kroll.constant public static final int PRIO_DEFAULT = OSESession.PRIO_DEFAULT;
	@Kroll.constant public static final int PRIO_HIGH = OSESession.PRIO_HIGH;
	@Kroll.constant public static final int PRIO_LOWEST = OSESession.PRIO_LOWEST;
	@Kroll.constant public static final int TR_HTTP = OSESession.TR_HTTP;
	@Kroll.constant public static final int TR_USER = OSESession.TR_USER;
	
	// OSEException
	@Kroll.constant public static final int CONFIG_LOAD_ERROR = OSEException.CONFIG_LOAD_ERROR;
	@Kroll.constant public static final int CONFIG_SAVE_ERROR = OSEException.CONFIG_SAVE_ERROR;
	@Kroll.constant public static final int CONNECTION_TO_SRV_FAILED = OSEException.CONNECTION_TO_SRV_FAILED;
	@Kroll.constant public static final int DATABASE_NOT_FOUND = OSEException.DATABASE_NOT_FOUND;
	@Kroll.constant public static final int EMPTY_PASSWORD = OSEException.EMPTY_PASSWORD;
	@Kroll.constant public static final int EMPTY_USER = OSEException.EMPTY_PASSWORD;
	@Kroll.constant public static final int ENCRYPTION_ID_MISMATCH = OSEException.ENCRYPTION_ID_MISMATCH;
	@Kroll.constant public static final int ERR_CREDENTIALS = OSEException.ERR_CREDENTIALS;
	@Kroll.constant public static final int ERROR_RESUME_RECEIVE = OSEException.ERROR_RESUME_RECEIVE;
	@Kroll.constant public static final int ERROR_RESUME_SEND = OSEException.ERROR_RESUME_SEND;
	@Kroll.constant public static final int HTTP_RESPONSE = OSEException.ERROR_RESUME_SEND;
	@Kroll.constant public static final int HTTP_TRANSPORT_ERROR = OSEException.HTTP_TRANSPORT_ERROR;
	@Kroll.constant public static final int INTERNAL_ERROR = OSEException.INTERNAL_ERROR;
	@Kroll.constant public static final int INVALID_BUFFER = OSEException.INVALID_BUFFER;
	@Kroll.constant public static final int INVALID_DML_TYPE = OSEException.INVALID_DML_TYPE;
	@Kroll.constant public static final int INVALID_ENCR_VER = OSEException.INVALID_ENCR_VER;
	@Kroll.constant public static final int INVALID_ENCRYPTION_TYPE = OSEException.INVALID_ENCRYPTION_TYPE;
	@Kroll.constant public static final int INVALID_HANDLE = OSEException.INVALID_HANDLE;
	@Kroll.constant public static final int INVALID_HTTP_URL = OSEException.INVALID_HANDLE;
	@Kroll.constant public static final int INVALID_INT_OPT = OSEException.INVALID_INT_OPT;
	@Kroll.constant public static final int INVALID_OPCODE = OSEException.INVALID_OPCODE;
	@Kroll.constant public static final int INVALID_PLUGIN_FLAGS = OSEException.INVALID_PLUGIN_FLAGS;
	@Kroll.constant public static final int INVALID_PRIORITY = OSEException.INVALID_PRIORITY;
	@Kroll.constant public static final int INVALID_SESS = OSEException.INVALID_PRIORITY;
	@Kroll.constant public static final int INVALID_STR_OPT = OSEException.INVALID_STR_OPT;
	@Kroll.constant public static final int INVALID_STRING_LENGTH = OSEException.INVALID_STRING_LENGTH;
	@Kroll.constant public static final int INVALID_SYNC_DIRECTION = OSEException.INVALID_SYNC_DIRECTION;
	@Kroll.constant public static final int INVALID_TRANSPORT_TYPE = OSEException.INVALID_TRANSPORT_TYPE;
	@Kroll.constant public static final int MISSING_DEFAULT_DATABASE = OSEException.MISSING_DEFAULT_DATABASE;
	@Kroll.constant public static final int MISSING_PLUGIN_API = OSEException.MISSING_PLUGIN_API;
	@Kroll.constant public static final int NOT_SUPPORTED = OSEException.NOT_SUPPORTED;
	@Kroll.constant public static final int OPCODE_LENGTH_OVERRUN = OSEException.OPCODE_LENGTH_OVERRUN;
	@Kroll.constant public static final int OPCODE_LENGTH_UNDERRUN = OSEException.OPCODE_LENGTH_UNDERRUN;
	@Kroll.constant public static final int OPCODE_OUT_OF_SEQUENCE = OSEException.OPCODE_OUT_OF_SEQUENCE;
	@Kroll.constant public static final int PASSWORD_NOT_SPECIFIED = OSEException.PASSWORD_NOT_SPECIFIED;
	@Kroll.constant public static final int PLUGIN_CLASS_INIT_FAILED = OSEException.PLUGIN_CLASS_INIT_FAILED;
	@Kroll.constant public static final int PLUGIN_CLASS_NOT_FOUND = OSEException.PLUGIN_CLASS_NOT_FOUND;
	@Kroll.constant public static final int PLUGIN_EXCEPTION = OSEException.PLUGIN_EXCEPTION;
	@Kroll.constant public static final int PLUGIN_ID_NOT_FOUND = OSEException.PLUGIN_ID_NOT_FOUND;
	@Kroll.constant public static final int PUBLICATION_ID_MISMATCH = OSEException.PUBLICATION_ID_MISMATCH;
	@Kroll.constant public static final int PUBLICATION_ID_NOT_FOUND = OSEException.PUBLICATION_ID_NOT_FOUND;
	@Kroll.constant public static final int PUBLICATION_NOT_FOUND = OSEException.PUBLICATION_NOT_FOUND;
	@Kroll.constant public static final int SERVER_ERROR = OSEException.SERVER_ERROR;
	@Kroll.constant public static final int SNAP_NAME_NOT_FOUND = OSEException.SNAP_NAME_NOT_FOUND;
	@Kroll.constant public static final int SNAPSHOT_ID_EXISTS = OSEException.SNAPSHOT_ID_EXISTS;
	@Kroll.constant public static final int SNAPSHOT_ID_NOT_FOUND = OSEException.SNAPSHOT_ID_NOT_FOUND;
	@Kroll.constant public static final int SYNC_CANCELED = OSEException.SYNC_CANCELED;
	@Kroll.constant public static final int TRANS_NOT_FOUND = OSEException.TRANS_NOT_FOUND;
	@Kroll.constant public static final int UNCOMPRESSED_DATA = OSEException.UNCOMPRESSED_DATA;
	@Kroll.constant public static final int UNEXP_TERM_OPCODE = OSEException.UNEXP_TERM_OPCODE;
	@Kroll.constant public static final int UNEXPECTED_BLOB_DATA = OSEException.UNEXP_TERM_OPCODE;
	@Kroll.constant public static final int UNEXPECTED_OPCODE = OSEException.UNEXPECTED_OPCODE;
	@Kroll.constant public static final int UNINIT_USER_TRANSPORT = OSEException.UNINIT_USER_TRANSPORT;
	@Kroll.constant public static final int UNRECOGNIZED_DATA = OSEException.UNINIT_USER_TRANSPORT;
	@Kroll.constant public static final int USER_NOT_SPECIFIED = OSEException.USER_NOT_SPECIFIED;
	@Kroll.constant public static final int USER_TRANSPORT_ERROR = OSEException.USER_NOT_SPECIFIED;
}