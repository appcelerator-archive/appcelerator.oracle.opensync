package ti.oracle.opensync;

import java.util.HashMap;

import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.TiConvert;

import SQLite.Exception;
import android.util.Log;

import ti.oracle.opensync.BerkeleyDBNamespaceProxy;

@Kroll.proxy
public class BerkeleyDBResultSetProxy extends KrollProxy {
	// Standard Debugging variables
	private static final String LCAT = "OracleOpensync";
	
	private SQLite.Stmt _rs;
	private HashMap<String, Integer> columnNames;
	private boolean _valid;
	
	public BerkeleyDBResultSetProxy(SQLite.Stmt stmt) {
		super();
		
		_rs = stmt;

		try {
			_valid = _rs.step();
			int count = _rs.column_count();
			columnNames = new HashMap<String, Integer>(count);
			for (int i=0; i < count; i++) {
				columnNames.put(_rs.column_name(i).toLowerCase(), i);
			}
		} catch (Exception e) {
			Log.e(LCAT, "Exception getting column names: " + e.getMessage(), e);
		}
	}

	@Kroll.method
	public void close() throws Exception
	{
		if (_rs != null) {
			_rs.close();
			_rs = null;
		}
	}

	@Kroll.method
	public Object field(Object[] args) throws Exception 
	{
		return internalGetField(args);
	}

	@Kroll.method
	public Object getField(Object[] args) throws Exception 
	{
		return internalGetField(args);
	}

	private Object internalGetField(Object[] args) throws Exception
	{
		int index = -1;
		int type = BerkeleyDBNamespaceProxy.FIELD_TYPE_UNKNOWN;
		if (args.length >= 1) {
			if(args[0] instanceof Number) {
				index = TiConvert.toInt(args[0]);
			} else {
				(new IllegalArgumentException("Expected int column index as first parameter was " + args[0].getClass().getSimpleName())).printStackTrace();
				throw new IllegalArgumentException("Expected int column index as first parameter was " + args[0].getClass().getSimpleName());
			}
		}
		if (args.length == 2) {
			if (args[1] instanceof Number) {
				type = TiConvert.toInt(args[1]);
			} else {
				throw new IllegalArgumentException("Expected int field type as second parameter was " + args[1].getClass().getSimpleName());
			}
		}
		
		return internalGetField(index, type);
	}

	private Object internalGetField(int index, int type) throws Exception
	{
		Object result = null;
		
		try {
			result = _rs.column(index);
		} catch (Exception e) {
			// Both SQLException and IllegalStateException (exceptions known to occur
			// in this block) are RuntimeExceptions and since we anyway re-throw
			// and log the same error message, we're just catching all RuntimeExceptions.
			Log.e(LCAT, "Exception getting value for column " + index + ": " + e.getMessage(), e);
			throw e;
		}
		switch(type) {
			case BerkeleyDBNamespaceProxy.FIELD_TYPE_STRING :
				result = TiConvert.toString(result);
				break;
			case BerkeleyDBNamespaceProxy.FIELD_TYPE_INT :
				result = TiConvert.toInt(result);
				break;
			case BerkeleyDBNamespaceProxy.FIELD_TYPE_FLOAT :
				result = TiConvert.toFloat(result);
				break;
			case BerkeleyDBNamespaceProxy.FIELD_TYPE_DOUBLE :
				result = TiConvert.toDouble(result);
				break;
		}
		return result;
	}

	@Kroll.method
	public Object fieldByName(Object[] args) throws Exception 
	{
		return internalGetFieldByName(args);
	}

	@Kroll.method
	public Object getFieldByName(Object[] args) throws Exception
	{
		return internalGetFieldByName(args);
	}
	
	private Object internalGetFieldByName(Object[] args) throws Exception
	{
		String name = null;
		
		int type = BerkeleyDBNamespaceProxy.FIELD_TYPE_UNKNOWN;
		if (args.length >= 1) {
			if(args[0] instanceof String) {
				name = (String) args[0];
			} else {
				throw new IllegalArgumentException("Expected string column name as first parameter" + args[0].getClass().getSimpleName());
			}
		}
		if (args.length == 2) {
			if (args[1] instanceof Number) {
				type = TiConvert.toInt(args[1]);
			} else {
				throw new IllegalArgumentException("Expected int field type as second parameter" + args[1].getClass().getSimpleName());
			}
		}
		
		return internalGetFieldByName(name, type);
	}
	
	private Object internalGetFieldByName(String fieldName, int type) throws Exception 
	{
		Object result = null;

		Integer ndx = columnNames.get(fieldName.toLowerCase());
		if (ndx != null) {
			result = internalGetField(ndx.intValue(), type);
		}

		return result;
	}
	
	@Kroll.getProperty @Kroll.method
	public int getFieldCount() 
	{
		if (_rs != null) {
			try {
				return _rs.column_count();
			} catch (Exception e) {
				Log.e(LCAT, "No fields exist");
			}
		}
		
		return 0;
	}
	
	@Kroll.method
	public String fieldName(int index) throws Exception 
	{
		return getFieldName(index);
	}
	
	@Kroll.method
	public String getFieldName(int index) throws Exception
	{
		if (_rs != null) {
			try {
				return _rs.column_name(index);
			} catch (Exception e) {
				Log.e(LCAT, "No column at index: " + index);
				throw e;
			}
		}
		return null;
	}

	@Kroll.getProperty @Kroll.method
	public int getRowCount() 
	{
		Log.e(LCAT, "rowCount is NOT SUPPORTED for Berkeley Database"); 
		return 0;
	}

	@Kroll.method
	public boolean isValidRow() 
	{
		return _valid;
	}

	@Kroll.method
	public void next() throws Exception
	{
		if(isValidRow()) {
			try {
				_valid = _rs.step();
			} catch (Exception e) {
				Log.e(LCAT, "Exception calling next: " + e.getMessage(), e);
				throw e;
			}
		} else {
			Log.w(LCAT, "Ignoring next, current row is invalid.");
		}
	}
}
