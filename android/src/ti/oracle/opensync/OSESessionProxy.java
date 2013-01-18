/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync;

import java.util.HashMap;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollFunction;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.TiConvert;

import android.util.Log;

import oracle.opensync.ose.OSEException;
import oracle.opensync.ose.OSEProgressListener;
import oracle.opensync.ose.OSESession;

@Kroll.proxy(creatableInModule=OracleOpensyncModule.class)
public class OSESessionProxy extends KrollProxy implements OSEProgressListener
{
	// Standard Debugging variables
	private static final String LCAT = "OracleOpensync";

	private OSESession _session = null;
	private KrollFunction _success;
	private KrollFunction _error;
	private KrollFunction _progress;
	private Thread _syncThread = null;
	
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
	
	// Progress listener constants
	@Kroll.constant public static final int APPLY = OSEProgressListener.APPLY;
	@Kroll.constant public static final int COMPOSE = OSEProgressListener.COMPOSE;	   
	@Kroll.constant public static final int IDLE = OSEProgressListener.IDLE;	   
	@Kroll.constant public static final int PREPARE = OSEProgressListener.PREPARE;	   
	@Kroll.constant public static final int PROCESS = OSEProgressListener.PROCESS;	   
	@Kroll.constant public static final int RECEIVE = OSEProgressListener.RECEIVE;	   
	@Kroll.constant public static final int SEND = OSEProgressListener.SEND;	   	   

	// Constructor
	public OSESessionProxy()
	{
		super();
				
		try {
			_session = new OSESession();
			Log.d(LCAT, "Session initialized with last saved sync client");
		} catch (OSEException e) {
			Log.d(LCAT, "Unable to restore last saved sync session:" + e.getMessage());
		}
	}
	
	public void handleCreationDict(KrollDict args)
	{
		// We need to create a new session object if the user is specified AND it is different
		// than the restored user (see constructor above).
		if (args.containsKey("user")) {
            String user = args.getString("user");
            try {
	            // If previous session was initialized for a different user, close the session
	            if (_session != null && !user.equalsIgnoreCase(_session.getUser())) {
	                _session.close();
	                _session = null;
	            }
	            
	            // Create new OSESession if needed
	            if (_session == null) {
	            	_session = new OSESession(user);
	            }
	            
	            // If password was passed in on creation, then go ahead and set it here
	            String password = args.optString("password", null);
	            if (password != null) {
	            	setPassword(password);
	            }
            } catch (OSEException e) {
            	Log.e(LCAT, "Error creating session: " + e.getMessage());
            }
		}

		super.handleCreationDict(args);
	}
	
	@Kroll.method
	public Boolean isOpen() 
	{
		return (_session == null) ? false : true;
	}
	
	/**
	 * Check whether the session is valid
	 * 
	 * @return True if valid, false otherwise
	 */
	private Boolean sessionIsValid(String method)
	{
		if (_session == null) {
			Log.e(LCAT, method + ": OSESession has not been properly initialized");
			return false;
		}
		
		return true;
	}
	
	private void handleError(String method, String message)
	{
		Log.e(LCAT, method + ": " + message);
		if (_error != null) {
			HashMap<String,Object> event = new HashMap<String,Object>();
			event.put("error", -1);
			event.put("message", message);
			_error.callAsync(getKrollObject(), event);
		}		
	}
	
	private void handleOSEException(String method, OSEException e)
	{
		Log.e(LCAT, method + ": " + e.getMessage());
		if (_error != null) {
			HashMap<String,Object> event = new HashMap<String,Object>();
			event.put("error", e.getErrorCode());
			event.put("message", e.getMessage());
			
			Throwable cause = e.getCause();
			if (cause != null) {
				event.put("cause", cause.getMessage());
			}
			_error.callAsync(getKrollObject(), event);
		}
	}
	
	@Override
	public void progress(int stage, int value) {
		if (_progress != null) {
			HashMap<String,Object> event = new HashMap<String,Object>();
			event.put("stage", stage);
			event.put("value", value);
			_progress.callAsync(getKrollObject(), event);
		}
	}
	
	// Synchronization methods
	@Kroll.method
	public void sync(HashMap hm)
	{
		if (sessionIsValid("sync")) {
			_success = (KrollFunction)hm.get("success");
			_error = (KrollFunction)hm.get("error");
			_progress = (KrollFunction)hm.get("progress");
	
			// If there is not a currently active sync session, start a new thread for sync
			if ((_syncThread == null) || !_syncThread.isAlive()) {
				_session.setProgress(_progress != null ? this : null);
				_syncThread = new Thread(new Runnable() {
					public void run()
					{
						try {
							// The 'sync' method is a synchronous method. Upon return, we know
							// the the synchronization has completed successfully. If an error
							// occurs, then the exception is thrown and will be caught below.
							_session.sync();
							if (_success != null) {
								HashMap<String,Object> event = new HashMap<String,Object>();
								_success.callAsync(getKrollObject(), event);
							}
						} catch (OSEException e) {
							handleOSEException("sync", e);
						}
					}
				});
				_syncThread.start();
			} else {
				handleError("sync", "Previous sync session is still active");
			}
		}
	}
	
	@Kroll.method
	public void cancelSync()
	{
		if (sessionIsValid("cancelSync")) {	
			// If the sync session is active, call cancelSync and wait for sync thread to join.
			if ((_syncThread != null) && _syncThread.isAlive()) {
				try {
					_session.cancelSync();
				} catch (OSEException e) {
					handleOSEException("cancelSync", e);
				}
				
				// Give it a few seconds to stop
				try {
					_syncThread.join(3000);
				} catch (InterruptedException e) {
				}
				
				// If the thread is still active then firing an event indicating that cancellation
				// is still in progress -- the thread will eventually terminate
				if (_syncThread.isAlive()) {
					handleError("cancelSync", "Cancellation in progress");
				}
			}
		}
	}
	
	@Kroll.method
	public void close()
	{
		if (sessionIsValid("close")) {
			// NOTE: This method *should* be called by any app that creates an OSESession object when
			// it is done with the session, including on application shutdown.
			
			// Attempt to stop active synchronization activity
			cancelSync();
	
			// Close the current session
			try {
				_session.close();
				_session = null;
			} catch (OSEException e) {
				Log.e(LCAT, "close: " + e.getMessage());
			}
		}
	}

	@Kroll.method
	public void saveUser()
	{
		if (sessionIsValid("saveUser")) {
			try {
				_session.saveUser();
			} catch (OSEException e) {
				Log.e(LCAT, "saveUser: " + e.getMessage());
			}
		}
	}
	
	@Kroll.method
	public void selectPub(String name)
	{
		if (sessionIsValid("selectPub")) {
			try {
				_session.selectPub(name);
			} catch (OSEException e) {
				Log.e(LCAT, "selectPub: " + e.getMessage());
			}
		}
	}
	
	@Kroll.method
	public void setNewPassword(String value)
	{
		if (sessionIsValid("setNewPassword")) {
			try {
				_session.setNewPassword(value.toCharArray());
			} catch (OSEException e) {
				Log.e(LCAT, "setNewPassword: " + e.getMessage());
			}
		}
	}
	
	// Properties
	
	@Kroll.getProperty @Kroll.method
	public String getAppRoot()
	{
		if (sessionIsValid("getAppRoot")) {
			return _session.getAppRoot();
		} 
		
		return "";
	}
	
	@Kroll.setProperty @Kroll.method
	public void setAppRoot(String value)
	{
		if (sessionIsValid("setAppRoot")) {
			_session.setAppRoot(value);
		}
	}
	
	@Kroll.getProperty @Kroll.method
	public Boolean getBackground()
	{
		if (sessionIsValid("getBackground")) {
			return _session.getBackground();
		} 
		
		return false;
	}
	
	@Kroll.setProperty @Kroll.method
	public void setBackground(Boolean value)
	{
		if (sessionIsValid("setBackground")) {
			_session.setBackground(value);
		}
	}
	
	@Kroll.getProperty @Kroll.method
	public Boolean getEncryptDatabases()
	{
		if (sessionIsValid("getEncryptDatabases")) {
			return _session.getEncryptDatabases();
		} 
		
		return false;
	}

	@Kroll.setProperty @Kroll.method
	public void setEncryptDatabases(Boolean value)
	{
		if (sessionIsValid("setEncryptDatabases")) {
			_session.setEncryptDatabases(value);
		}
	}
	
	@Kroll.getProperty @Kroll.method
	public int getEncryptionType()
	{
		if (sessionIsValid("getEncryptionType")) {
			return _session.getEncryptionType();
		} 
		
		return OSESession.ENC_NONE;
	}
	
	@Kroll.setProperty @Kroll.method
	public void setEncryptionType(int value)
	{
		if (sessionIsValid("setEncryptionType")) {
			try {
				_session.setEncryptionType(value);
			} catch (OSEException e) {
				Log.e(LCAT, "setEncryptionType: " + e.getMessage());
			}
		}
	}

	@Kroll.setProperty @Kroll.method
	public void setPassword(String value)
	{
		if (sessionIsValid("setPassword")) {
			try {
				_session.setPassword(value.toCharArray());
			} catch (OSEException e) {
				Log.e(LCAT, "setPassword: " + e.getMessage());
			}
		}
	}

	@Kroll.getProperty @Kroll.method
	public Boolean getForceRefresh()
	{
		if (sessionIsValid("getForceRefresh")) {
			return _session.getForceRefresh();
		} 
		
		return false;
	}
	
	@Kroll.setProperty @Kroll.method
	public void setForceRefresh(Boolean value)
	{
		if (sessionIsValid("setForceRefresh")) {
			_session.setForceRefresh(value);
		}
	}	
	
	@Kroll.getProperty @Kroll.method
	public String getProxy()
	{
		if (sessionIsValid("getProxy")) {
			return _session.getProxy();
		} 
		
		return "";
	}

	@Kroll.setProperty @Kroll.method
	public void setProxy(String value)
	{
		if (sessionIsValid("setProxy")) {
			_session.setProxy(value);
		}
	}
	
	@Kroll.getProperty @Kroll.method
	public Boolean getSavePassword()
	{
		if (sessionIsValid("")) {
			return _session.getSavePassword();
		}
		
		return false;
	}

	@Kroll.setProperty @Kroll.method
	public void setSavePassword(Boolean value)
	{
		if (sessionIsValid("setSavePassword")) {
			_session.setSavePassword(value);
		}
	}
	
	@Kroll.getProperty @Kroll.method
	public Boolean getSyncApps()
	{
		if (sessionIsValid("getSyncApps")) {
			return _session.getSyncApps();
		}
		
		return true;
	}	

	@Kroll.setProperty @Kroll.method
	public void setSyncApps(Boolean value)
	{
		if (sessionIsValid("setSyncApps")) {
			_session.setSyncApps(value);
		}
	}
	
	@Kroll.getProperty @Kroll.method
	public int getSyncDirection()
	{
		if (sessionIsValid("getSyncDirection")) {
			return _session.getSyncDirection();
		}
		
		return OSESession.DIR_SENDRECEIVE;
	}
	
	@Kroll.setProperty @Kroll.method
	public void setSyncDirection(int value)
	{
		if (sessionIsValid("setSyncDirection")) {
			try {
				_session.setSyncDirection(value);
			} catch (OSEException e) {
				Log.e(LCAT, "setSyncDirection: " + e.getMessage());
			}
		}
	}
	
	@Kroll.getProperty @Kroll.method
	public Boolean getSyncNewPub()
	{
		if (sessionIsValid("getSyncNewPub")) {
			return _session.getSyncNewPub();
		}
		
		return false;
	}
	
	@Kroll.setProperty @Kroll.method
	public void setSyncNewPub(Boolean value)
	{
		if (sessionIsValid("setSyncNewPub")) {
			_session.setSyncNewPub(value);
		}
	}	
	
	@Kroll.getProperty @Kroll.method
	public int getSyncPriority()
	{
		if (sessionIsValid("getSyncPriority")) {
			return _session.getSyncPriority();
		}
		
		return OSESession.PRIO_DEFAULT;
	}
	
	@Kroll.setProperty @Kroll.method
	public void setSyncPriority(int value)
	{
		if (sessionIsValid("setSyncPriority")) {
			try {
				_session.setSyncPriority(value);
			} catch (OSEException e) {
				Log.e(LCAT, "setSyncPriority: " + e.getMessage());
			}
		}
	}	
	
	@Kroll.getProperty @Kroll.method
	public int getTransportType()
	{
		if (sessionIsValid("getTransportType")) {
			return _session.getTransportType();
		}
		
		return OSESession.TR_HTTP;
	}
	
	@Kroll.setProperty @Kroll.method
	public void setTransportType(int value)
	{
		if (sessionIsValid("setTransportType")) {
			try {
				_session.setTransportType(value);
			} catch (OSEException e) {
				Log.e(LCAT, "setTransportType: " + e.getMessage());
			}
		}
	}	
	
	@Kroll.getProperty(name="url") @Kroll.method
	public String getURL()
	{
		if (sessionIsValid("getURL")) {
			return _session.getURL();
		}
		
		return "";
	}

	@Kroll.setProperty(name="url") @Kroll.method
	public void setURL(String value)
	{
		if (sessionIsValid("setURL")) {
			_session.setURL(value);
		}
	}
	
	@Kroll.getProperty @Kroll.method
	public Boolean getUseFiles()
	{
		if (sessionIsValid("getUseFiles")) {
			return _session.getUseFiles();
		}
		
		return false;
	}
	
	@Kroll.setProperty @Kroll.method
	public void setUseFiles(Boolean value)
	{
		if (sessionIsValid("setUseFiles")) {
			_session.setUseFiles(value);
		}
	}
	
	@Kroll.getProperty @Kroll.method
	public String getUser()
	{
		if (sessionIsValid("getUser")) {
			return _session.getUser();
		}
		
		return "";
	}

	@Kroll.getProperty @Kroll.method
	public Boolean getUseResume()
	{
		if (sessionIsValid("getUseResume")) {
			return _session.getUseResume();
		}
		
		return false;
	}

	@Kroll.setProperty @Kroll.method
	public void setUseResume(Boolean value)
	{
		if (sessionIsValid("setUseResume")) {
			_session.setUseResume(value);
		}
	}
}