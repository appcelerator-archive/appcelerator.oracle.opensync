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

import oracle.opensync.syncagent.BGException;
import oracle.opensync.syncagent.BGMessageHandler;
import oracle.opensync.syncagent.BGSession;
import oracle.opensync.util.LogMessage;
import oracle.opensync.util.PlatformFactory;
import oracle.opensync.util.android.AndroidPlatformFactory;
import ti.oracle.opensync.OracleOpensyncModule;
import ti.oracle.opensync.namespaces.BGSessionNamespaceProxy;

@Kroll.proxy(creatableInModule=OracleOpensyncModule.class)
public class BGSessionProxy extends BGSessionNamespaceProxy implements BGMessageHandler
{
	// Standard Debugging variables
	private static final String LCAT = "OracleOpensync";

	private BGSession _session = null;
	private KrollFunction _messageHandler;
	
	// Constructor
	
	public BGSessionProxy()
	{
		super();
			
		try {
	        // DB file locations are determined from this application context
	        // The db files will be created under: /data/data/<app name>/app_oracle.sync/sqlite_db
			((AndroidPlatformFactory)PlatformFactory.getInstance()).setContext(TiApplication.getInstance());

			_session = new BGSession();
		} catch (BGException e) {
			handleBGException(e, null);
		}
	}
	
	// Error handling methods
	
	private void validateSession() throws IllegalStateException
	{
		if (_session == null) {
			throw new IllegalStateException("BGSession has not been initialized");
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
	
	private void handleBGException(BGException e, final KrollFunction callback)
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
	
	// Message handler callback
	
	@Override
	public void handleLogMessage(LogMessage message) 
	{
		if (_messageHandler != null) {
			HashMap<String,Object> event = new HashMap<String,Object>();
			event.put("id", message.id);
			event.put("source", message.source);
			event.put("text", message.text);
			event.put("time", message.time);
			if (message.type == LogMessage.ERROR) {
				event.put("type", "ERROR");
			} else if (message.type == LogMessage.WARNING) {
				event.put("type", "WARNING");
			} else {
				event.put("type", "INFO");
			}
			Throwable cause = message.cause;
			if (cause != null) {
				event.put("cause", cause.getMessage());
			}
			_messageHandler.callAsync(getKrollObject(), event);
		}
	}		
	
	// Proxy methods
	
	@Kroll.method
	public Boolean isOpen() 
	{
		return (_session == null) ? false : true;
	}


	@Kroll.method
	public Boolean agentEnabled() throws BGException
	{	
		validateSession();
		return _session.agentEnabled();
	}
	
	@Kroll.method
	public void close()
	{
		validateSession();
		_session.close();
	}
	
	@Kroll.method
	public void enableAgent(Boolean on) throws BGException
	{
		validateSession();
		_session.enableAgent(on);
	}
	
	@Kroll.method
	public void pause() throws BGException
	{
		validateSession();
		_session.pause();
	}
	
	@Kroll.method
	public void resume() throws BGException
	{
		validateSession();
		_session.resume();
	}
	
	@Kroll.method(runOnUiThread=true)
	public void showUI() throws BGException
	{
		validateSession();
		_session.showUI();
	}
	
	@Kroll.method
	public void start() throws BGException
	{
		validateSession();
		_session.start();
	}
	
	@Kroll.method
	public void stop() throws BGException
	{
		validateSession();
		_session.stop();
	}
	
	@Kroll.method
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void waitForStatus(HashMap hm)
	{
		validateSession();
		KrollDict args = new KrollDict(hm);
		final int time = args.optInt("timeout", 0);
		final int status = args.getInt("status");
		final KrollFunction success = (KrollFunction)args.get("success");
		final KrollFunction error = (KrollFunction)args.get("error");
		
		// Start a new thread to wait for the status
		new Thread(new Runnable() {
			public void run()
			{
				try {
					if (time <= 0) {
						_session.waitForStatus(status);
						handleSuccess(success);
					} else if (_session.waitForStatus(status, time)) {
							handleSuccess(success);
					} else {
						handleError("Timed out waiting for status", error);
					}
				} catch (BGException e) {
					handleBGException(e, error);
				} catch (InterruptedException e) {}
			}
		}).start();
	}
	
	@Kroll.method
	public BGAgentStatusProxy getAgentStatus() throws BGException
	{
		validateSession();
		return new BGAgentStatusProxy(_session.getAgentStatus());
	}
	
	@Kroll.method
	public int getAgentStatusCode() throws BGException
	{
		validateSession();
		return _session.getAgentStatusCode();
	}
	
	@Kroll.method
	public String getFatalError() throws BGException
	{
		validateSession();
		BGException e = _session.getFatalError();
		if (e != null) {
			return e.toString();
		}
		
		return null;
	}
	
	@Kroll.method
	public BGSyncStatusProxy getSyncStatus() throws BGException
	{
		validateSession();
		return new BGSyncStatusProxy(_session.getSyncStatus());
	}
	
	@Kroll.method
	public void setMessageHandler(KrollFunction callback) throws BGException
	{
		validateSession();
		if (callback != _messageHandler) {
			if (_messageHandler == null) {
				_session.addMessageHandler(this);
			} else if (callback == null) {
				_session.removeMessageHandler(this);
			}
			_messageHandler = callback;
		}
	}
}