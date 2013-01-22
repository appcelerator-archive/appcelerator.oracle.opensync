/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync.proxies;

import java.util.HashMap;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollFunction;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiApplication;

import android.util.Log;

import oracle.opensync.ose.OSEException;
import oracle.opensync.ose.OSEProgressListener;
import oracle.opensync.ose.OSESession;
import oracle.opensync.util.PlatformFactory;
import oracle.opensync.util.android.AndroidPlatformFactory;
import ti.oracle.opensync.OracleOpensyncModule;
import ti.oracle.opensync.namespaces.OSESessionNamespaceProxy;

@Kroll.proxy(creatableInModule=OracleOpensyncModule.class)
public class OSESessionProxy extends OSESessionNamespaceProxy implements OSEProgressListener
{
	// Standard Debugging variables
	private static final String LCAT = "OracleOpensync";

	private OSESession _session = null;
	private KrollFunction _progress;
	private Thread _syncThread = null;

	// Constructor and initialization methods
	
	public OSESessionProxy()
	{
		super();
				
		try {
	        // DB file locations are determined from this application context
	        // The db files will be created under: /data/data/<app name>/app_oracle.sync/sqlite_db
			((AndroidPlatformFactory)PlatformFactory.getInstance()).setContext(TiApplication.getInstance());
			
			_session = new OSESession();
			Log.d(LCAT, "Session initialized with last saved sync client");
		} catch (OSEException e) {
			handleOSEException(e, null);
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
            	handleOSEException(e, null);
            }
		}

		super.handleCreationDict(args);
	}

	// Error handling methods
	
	private void validateSession() throws IllegalStateException
	{
		if (_session == null) {
			throw new IllegalStateException("OSESession has not been initialized");
		}
	}
	
	private void handleSuccess(final KrollFunction callback)
	{
		if (callback != null) {
			HashMap<String,Object> event = new HashMap<String,Object>();
			event.put("success", true);
			callback.callAsync(getKrollObject(), event);
		}
	}
	
	private void handleError(String message, KrollFunction callback)
	{
		Log.e(LCAT, message);
		if (callback != null) {
			HashMap<String,Object> event = new HashMap<String,Object>();
			event.put("error", true);
			event.put("errorCode", -1);
			event.put("message", message);
			callback.callAsync(getKrollObject(), event);
		}		
	}
	
	private void handleOSEException(OSEException e, final KrollFunction callback)
	{
		Log.e(LCAT, "=== Exception ===");
		Log.e(LCAT, Log.getStackTraceString(e));
		Throwable cause = e.getCause();
		if (cause != null) {
			Log.e(LCAT, "=== Cause ===");
			Log.e(LCAT, Log.getStackTraceString(cause));
		}
		
		if (callback != null) {
			HashMap<String,Object> event = new HashMap<String,Object>();
			event.put("error", true);
			event.put("errorCode", e.getErrorCode());
			event.put("message", e.getMessage());
			if (cause != null) {
				event.put("cause", cause.getMessage());
			}
			callback.callAsync(getKrollObject(), event);
		}
	}
	
	// Progress callback
	
	@Override
	public void progress(int stage, int value) {
		if (_progress != null) {
			HashMap<String,Object> event = new HashMap<String,Object>();
			event.put("stage", stage);
			event.put("value", value);
			_progress.callAsync(getKrollObject(), event);
		}
	}
	
	// Proxy methods
	
	@Kroll.method
	public Boolean isOpen() 
	{
		return (_session == null) ? false : true;
	}
	
	// Synchronization methods
	@Kroll.method
	@SuppressWarnings("rawtypes")
	public void sync(HashMap hm)
	{
		validateSession();
		final KrollFunction success = (KrollFunction)hm.get("success");
		final KrollFunction error = (KrollFunction)hm.get("error");
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
						handleSuccess(success);
					} catch (OSEException e) {
						handleOSEException(e, error);
					}
				}
			});
			_syncThread.start();
		} else {
			handleError("Cannot start new sync session because a previous sync session is still active", error);
		}
	}
	
	@Kroll.method
	public void cancelSync() throws OSEException
	{
		validateSession();
		// If the sync session is active, call cancelSync and wait for sync thread to join.
		if ((_syncThread != null) && _syncThread.isAlive()) {
			_session.cancelSync();
			
			// Give it a few seconds to stop
			try {
				_syncThread.join(3000);
			} catch (InterruptedException e) {}
			
			// If the thread is still active then firing an event indicating that cancellation
			// is still in progress -- the thread will eventually terminate
			if (_syncThread.isAlive()) {
				Log.w(LCAT, "Cancellation in progress");
			}
		}
	}
	
	@Kroll.method
	public void close() throws OSEException
	{
		validateSession();
		// NOTE: This method *should* be called by any app that creates an OSESession object when
		// it is done with the session, including on application shutdown.
		
		// Attempt to stop active synchronization activity
		cancelSync();

		// Close the current session
		_session.close();
		_session = null;
	}

	@Kroll.method
	public void saveUser() throws OSEException
	{
		validateSession();
		_session.saveUser();
	}
	
	@Kroll.method
	public void selectPub(String name) throws OSEException
	{
		validateSession();
		_session.selectPub(name);
	}
	
	@Kroll.method
	public void setNewPassword(String value) throws OSEException
	{
		validateSession();
		_session.setNewPassword(value.toCharArray());
	}
	
	@Kroll.method
	public String getAppRoot()
	{
		validateSession();
		return _session.getAppRoot();
	}
	
	@Kroll.method
	public void setAppRoot(String value)
	{
		validateSession();
		_session.setAppRoot(value);
	}
	
	@Kroll.method
	public Boolean getBackground()
	{
		validateSession();
		return _session.getBackground();
	}
	
	@Kroll.method
	public void setBackground(Boolean value)
	{
		validateSession();
		_session.setBackground(value);
	}
	
	@Kroll.method
	public Boolean getEncryptDatabases()
	{
		validateSession();
		return _session.getEncryptDatabases();
	}

	@Kroll.method
	public void setEncryptDatabases(Boolean value)
	{
		validateSession();
		_session.setEncryptDatabases(value);
	}
	
	@Kroll.method
	public int getEncryptionType()
	{
		validateSession();
		return _session.getEncryptionType();
	}
	
	@Kroll.method
	public void setEncryptionType(int value) throws OSEException
	{
		validateSession();
		_session.setEncryptionType(value);
	}

	@Kroll.method
	public void setPassword(String value) throws OSEException
	{
		validateSession();
		_session.setPassword(value.toCharArray());
	}

	@Kroll.method
	public Boolean getForceRefresh()
	{
		validateSession();
		return _session.getForceRefresh();
	}
	
	@Kroll.method
	public void setForceRefresh(Boolean value)
	{
		validateSession();
		_session.setForceRefresh(value);
	}	
	
	@Kroll.method
	public String getProxy()
	{
		validateSession();
		return _session.getProxy();
	}

	@Kroll.method
	public void setProxy(String value)
	{
		validateSession();
		_session.setProxy(value);
	}
	
	@Kroll.method
	public Boolean getSavePassword()
	{
		validateSession();
		return _session.getSavePassword();
	}

	@Kroll.method
	public void setSavePassword(Boolean value)
	{
		validateSession();
		_session.setSavePassword(value);
	}
	
	@Kroll.method
	public Boolean getSyncApps()
	{
		validateSession();
		return _session.getSyncApps();
	}	

	@Kroll.method
	public void setSyncApps(Boolean value)
	{
		validateSession();
		_session.setSyncApps(value);
	}
	
	@Kroll.method
	public int getSyncDirection()
	{
		validateSession();
		return _session.getSyncDirection();
	}
	
	@Kroll.method
	public void setSyncDirection(int value) throws OSEException
	{
		validateSession();
		_session.setSyncDirection(value);
	}
	
	@Kroll.method
	public Boolean getSyncNewPub()
	{
		validateSession();
			return _session.getSyncNewPub();
	}
	
	@Kroll.method
	public void setSyncNewPub(Boolean value)
	{
		validateSession();
		_session.setSyncNewPub(value);
	}	
	
	@Kroll.method
	public int getSyncPriority()
	{
		validateSession();
		return _session.getSyncPriority();
	}
	
	@Kroll.method
	public void setSyncPriority(int value) throws OSEException
	{
		validateSession();
		_session.setSyncPriority(value);
	}	
	
	@Kroll.method
	public int getTransportType()
	{
		validateSession();
		return _session.getTransportType();
	}
	
	@Kroll.method
	public void setTransportType(int value) throws OSEException
	{
		validateSession();
		_session.setTransportType(value);
	}	
	
	@Kroll.method
	public String getURL()
	{
		validateSession();
		return _session.getURL();
	}

	@Kroll.method
	public void setURL(String value)
	{
		validateSession();
		_session.setURL(value);
	}
	
	@Kroll.method
	public Boolean getUseFiles()
	{
		validateSession();
		return _session.getUseFiles();
	}
	
	@Kroll.method
	public void setUseFiles(Boolean value)
	{
		validateSession();
		_session.setUseFiles(value);
	}
	
	@Kroll.method
	public String getUser()
	{
		validateSession();
		return _session.getUser();
	}

	@Kroll.method
	public Boolean getUseResume()
	{
		validateSession();
		return _session.getUseResume();
	}

	@Kroll.method
	public void setUseResume(Boolean value)
	{
		validateSession();
		_session.setUseResume(value);
	}
}