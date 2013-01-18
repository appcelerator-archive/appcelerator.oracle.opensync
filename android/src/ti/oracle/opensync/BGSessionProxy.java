/**
 * Oracle Opensync Module
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.oracle.opensync;

import java.util.HashMap;

import org.appcelerator.kroll.KrollFunction;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.TiConvert;

import android.util.Log;

import oracle.opensync.syncagent.BGAgentStatus;
import oracle.opensync.syncagent.BGException;
import oracle.opensync.syncagent.BGMessageHandler;
import oracle.opensync.syncagent.BGSession;
import oracle.opensync.util.LogMessage;

@Kroll.proxy(creatableInModule=OracleOpensyncModule.class)
public class BGSessionProxy extends KrollProxy implements BGMessageHandler
{
	// Standard Debugging variables
	private static final String LCAT = "OracleOpensync";

	private BGSession _session = null;
	private KrollFunction _messageHandler;
	
	// Session API constants
	@Kroll.constant public static final String DISABLE_PROP = BGSession.DISABLE_PROP;

	// Constructor
	public BGSessionProxy()
	{
		super();
			
		try {
			_session = new BGSession();
		} catch (BGException e) {
			Log.e(LCAT, "Unable to create new syncagent session: " + e.getMessage());
			Throwable cause = e.getCause();
			if (cause != null) {
				Log.e(LCAT, "Cause: " + cause.toString());
			}
		}
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
			Log.e(LCAT, method + ": BGSession has not been properly initialized");
			return false;
		}
		
		return true;
	}
		
	// Synchronization methods

	@Kroll.method
	public Boolean agentEnabled()
	{	
		if (sessionIsValid("agentEnabled")) {
			try {
				return _session.agentEnabled();
			} catch (BGException e) {
				Log.e(LCAT, "agentEnable: " + e.getMessage());
			}
		}
		
		return false;
	}
	
	@Kroll.method
	public void close()
	{
		if (sessionIsValid("close")) {
			_session.close();
		}
	}
	
	@Kroll.method
	public void enableAgent(Boolean on) 
	{
		if (sessionIsValid("enableAgent")) {
			try {
				_session.enableAgent(on);
			} catch (BGException e) {
				Log.e(LCAT, "enableAgent: " + e.getMessage());
			}
		}
	}
	
	@Kroll.method
	public void pause()
	{
		if (sessionIsValid("pause")) {
			try {
				_session.pause();
			} catch (BGException e) {
				Log.e(LCAT, "pause: " + e.getMessage());
			}
		}
	}
	
	@Kroll.method
	public void resume()
	{
		if (sessionIsValid("resume")) {
			try {
				_session.resume();
			} catch (BGException e) {
				Log.e(LCAT, "resume: " + e.getMessage());
			}
		}
	}
	
	@Kroll.method(runOnUiThread=true)
	public void showUI() throws BGException
	{
		if (sessionIsValid("showUI")) {
			try {
				_session.showUI();
			} catch (BGException e) {
				Log.e(LCAT, "showUI: " + e.getMessage());
				throw e;
			}
		}
	}
	
	@Kroll.method
	public void start()
	{
		if (sessionIsValid("start")) {
			try {
				_session.start();
			} catch (BGException e) {
				Log.e(LCAT, "start:" + e.getMessage());
			}
		}
	}
	
	@Kroll.method
	public void stop()
	{
		if (sessionIsValid("stop")) {
			try {
				_session.stop();
			} catch (BGException e) {
				Log.e(LCAT, "stop: " + e.getMessage());
			}
		}
	}
	
	@Kroll.method
	public void waitForStatus(final KrollFunction callback, final int statusCode, @Kroll.argument(optional=true) final Object timeOut)
	{
		if (sessionIsValid("waitForStatus")) {
			new Thread(new Runnable() {
				public void run()
				{
					Boolean success = false;
					HashMap<String,Object> event = new HashMap<String,Object>();
					try {
						if (timeOut == null) {
							_session.waitForStatus(statusCode);
							success = true;
						} else {
							int time = TiConvert.toInt(timeOut);
							success = _session.waitForStatus(statusCode, time);
						}
					} catch (BGException e) {
						Log.e(LCAT, "waitForStatus: " + e.getMessage());
						event.put("message", e.getMessage());
						Throwable cause = e.getCause();
						if (cause != null) {
							event.put("cause", cause.getMessage());
						}
					} catch (InterruptedException e) {
						Log.e(LCAT, "waitForStatus: " + e.getMessage());
						event.put("message", e.getMessage());
						Throwable cause = e.getCause();
						if (cause != null) {
							event.put("cause", cause.getMessage());
						}
					}
					
					if (callback != null) {
						try {
							event.put("statusCode", _session.getAgentStatusCode());
						} catch (BGException e) {
							Log.e(LCAT, "waitForStatus: " + e.getMessage());
						}
						if (success) {
							event.put("success", true);
						} else {
							event.put("error", true);
						}
						callback.callAsync(getKrollObject(), event);
					}
				}
			}).start();
		}
	}
	
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
	
	// Properties
	
	@Kroll.getProperty @Kroll.method
	public BGAgentStatusActualProxy getAgentStatus()
	{
		if (sessionIsValid("getAgentStatus")) {
			try {
				return new BGAgentStatusActualProxy(_session.getAgentStatus());
			} catch (BGException e) {
				Log.e(LCAT, "getAgentStatus: " + e.getMessage());
			}
		} 
		
		return null;
	}
	
	@Kroll.getProperty @Kroll.method
	public int getAgentStatusCode()
	{
		if (sessionIsValid("getAgentStatusCode")) {
			try {
				return _session.getAgentStatusCode();
			} catch (BGException e) {
				Log.e(LCAT, "getAgentStatusCode: " + e.getMessage());
			}
		} 
		
		return BGAgentStatus.STOPPED;
	}
	
	@Kroll.getProperty @Kroll.method
	public String getFatalError()
	{
		if (sessionIsValid("getFatalError")) {
			try {
				BGException e = _session.getFatalError();
				if (e != null) {
					return e.toString();
				}
			} catch (BGException e) {
				Log.e(LCAT, "getFatalError: " + e.getMessage());
			}
		} 
		
		return null;
	}
	
	@Kroll.getProperty @Kroll.method
	public BGSyncStatusProxy getSyncStatus()
	{
		if (sessionIsValid("getSyncStatus")) {
			try {
				return new BGSyncStatusProxy(_session.getSyncStatus());
			} catch (BGException e) {
				Log.e(LCAT, "getSyncStatus: " + e.getMessage());
			}
		} 
		
		return null;
	}
	
	@Kroll.setProperty @Kroll.method
	public void setMessageHandler(KrollFunction callback)
	{
		Log.e(LCAT,">>>BUGBUG: setMessageHandler");
		
		if (sessionIsValid("setMessageHandler")) {
			if (callback != _messageHandler) {
				try {
					if (_messageHandler == null) {
						_session.addMessageHandler(this);
					} else if (callback == null) {
						_session.removeMessageHandler(this);
					}
					_messageHandler = callback;
				} catch (BGException e) {
					Log.e(LCAT, "setMessageHandler: " + e.getMessage());
				}
			}
		}
	}
}