package ti.oracle.opensync.database;

import java.io.File;

import java.util.regex.Pattern;

import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiFileProxy;
import org.appcelerator.titanium.util.TiConvert;
import org.appcelerator.titanium.TiApplication;

import ti.oracle.opensync.database.BerkeleyDBNamespaceProxy;
import android.content.pm.PackageManager.NameNotFoundException;

import android.util.Log;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

@Kroll.proxy(propertyAccessors = { "enableLQMapping" })
public class BerkeleyDBProxy extends BerkeleyDBNamespaceProxy
{
	// Standard Debugging variables
	private static final String LCAT = "OracleOpensync";

	private SQLite.Database _db;
	private String _name = null;
	private String _path;
	private int _flags;
	private Boolean _isOpen = false;

	public BerkeleyDBProxy() {
		super();
	}

	public void openDatabase(Object file) throws Exception
	{
		if (file instanceof TiFileProxy) {
			TiFileProxy tiFile = (TiFileProxy) file;
			_path = tiFile.getBaseFile().getNativeFile().getAbsolutePath();
			_flags = SQLite.Constants.SQLITE_OPEN_READONLY;
		} else {
			_name = TiConvert.toString(file);
			if (!_name.startsWith("//")) {
				try {
					TiApplication appContext = TiApplication.getInstance();
					PackageManager pm = appContext.getPackageManager();
					PackageInfo pi = pm.getPackageInfo(appContext.getPackageName(), 0);
					_path = pi.applicationInfo.dataDir + "/databases/" + _name;
            	} catch (NameNotFoundException e) {
            		Log.e(LCAT, "Exception opening database: " + e.getMessage(), e);
            		throw e;
            	}
			} else {
				_path = _name;
			}
			_flags = SQLite.Constants.SQLITE_OPEN_READWRITE | SQLite.Constants.SQLITE_OPEN_CREATE;
		}

		try {
			_db = new SQLite.Database();
			_db.open(_path, _flags);
			_isOpen = true;
			Log.d(LCAT, "Opened database: " + _path);
		} catch (Exception e) {
			Log.e(LCAT, "Exception opening database: " + e.getMessage(), e);
			throw e;
		}
	}

	@Kroll.method
	public void close() throws Exception
	{
		try {
			if (_isOpen) {
				_db.close();
				_isOpen = false;
			}
		} catch (Exception e) {
			Log.e(LCAT, "Exception closing database: " + e.getMessage(), e);
			throw e;		
		}
	}
	
	@Kroll.method
	public BerkeleyDBResultSetProxy execute(String sql, Object... args) throws Exception
	{
		// Handle the cases where an array is passed containing the SQL query arguments.
		// Otherwise use the variable argument list for the SQL query.
		Object[] sqlArgs;
		if (args != null && args.length == 1 && args[0] instanceof Object[]) {
			sqlArgs = (Object[]) args[0];
		} else {
			sqlArgs = args;
		}

		// Convert arguments to string for parameter substitution, allowing for null values
		String[] newArgs = null;
		if (sqlArgs != null) {
			newArgs = new String[sqlArgs.length];
			for (int i = 0; i < sqlArgs.length; i++) {
				if (sqlArgs[i] == null) {
					newArgs[i] = null;
				} else {
					newArgs[i] = TiConvert.toString(sqlArgs[i]);
				}
			}
		}

		BerkeleyDBResultSetProxy rs = null;
		SQLite.Stmt stmt = null;
		String newSql = sql;
		
		// Handle the difference between SQLite and Berkeley DB parameter substitution characters.
		// SQLite supports ? while Berkeley uses '%Q'
		// This can be disabled if needed by setting the enableLQMapping property to false.
		if (properties.optBoolean("enableLQMapping", true)) {
			Pattern regex = Pattern.compile("([^'\"])\\?");
			newSql = regex.matcher(sql).replaceAll("$1%Q");
		}
		
		try {
			String lcSql = newSql.toLowerCase().trim();
			if (lcSql.startsWith("select") || lcSql.startsWith("pragma")) {
				stmt = _db.prepare(newSql);
				if (newArgs != null) {
					for(int i = 0; i < newArgs.length; i++) {
						stmt.bind(i, newArgs[i]);
					}
				}
				if (stmt.column_count() > 0) {
					rs = new BerkeleyDBResultSetProxy(stmt);
				} else {
					stmt.close();
				}
			} else {
				_db.exec(newSql, null, newArgs);
			}
		} catch (Exception e) {
			if (stmt != null) {
				stmt.close();
			}
			Log.e(LCAT, "Exception executing SQL statement: " + e.getMessage(), e);
			throw e;
		}

		return rs;
	}

	@Kroll.getProperty @Kroll.method
	public String getName() 
	{
		return _name != null ? _name : _path;
	}

	@Kroll.getProperty @Kroll.method
	public long getLastInsertRowId() {
		return _db.last_insert_rowid();
	}

	@Kroll.getProperty @Kroll.method
	public long getRowsAffected() {
		return _db.changes();
	}

	private void deleteRecursive(File fileOrDirectory) {
    	if (fileOrDirectory.isDirectory())
        	for (File child : fileOrDirectory.listFiles())
            	deleteRecursive(child);

    	fileOrDirectory.delete();
	}

	@Kroll.method
	public void remove() throws Exception 
	{
		if ((_flags & SQLite.Constants.SQLITE_OPEN_READONLY) == SQLite.Constants.SQLITE_OPEN_READONLY) {
			Log.w(LCAT, "Database is a read-only database, cannot remove");
			return;
		}

		try {
			if (_isOpen) {
				Log.w(LCAT, "Attempt to remove open database. Closing then removing");
				_db.close();
			}
			Log.d(LCAT, "Deleting database: " + _path);
			File file = new File(_path);
			file.delete();
			file = new File(_path + "-journal");
			deleteRecursive(file);
		} catch (Exception e) {
			Log.e(LCAT, "Exception removing database: " + e.getMessage(), e);
			throw e;		
		}
	}
}
