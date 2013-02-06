package ti.oracle.opensync;

import java.io.File;

import java.util.regex.Pattern;

import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiFileProxy;
import org.appcelerator.titanium.util.TiConvert;
import org.appcelerator.titanium.TiApplication;

import ti.oracle.opensync.BerkeleyDBNamespaceProxy;
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
	private String _path;

	public BerkeleyDBProxy(String path, SQLite.Database db) {
		super();
		
		_path = path;
		_db = db;
	}

	public static BerkeleyDBProxy openDatabase(Object file) throws Exception
	{
		BerkeleyDBProxy dbp = null;
		String absolutePath;

		if (file instanceof TiFileProxy) {
			TiFileProxy tiFile = (TiFileProxy) file;
			absolutePath = tiFile.getBaseFile().getNativeFile().getAbsolutePath();
		} else {
			absolutePath = TiConvert.toString(file);
			if (!absolutePath.startsWith("//")) {
				try {
					TiApplication appContext = TiApplication.getInstance();
					PackageManager pm = appContext.getPackageManager();
					PackageInfo pi = pm.getPackageInfo(appContext.getPackageName(), 0);
					absolutePath = pi.applicationInfo.dataDir + "/databases/" + file;
            	} catch (NameNotFoundException e) {
            		Log.e(LCAT, "Exception opening database: " + e.getMessage(), e);
            		throw e;
            	}
			}
		}
		
		try {
			SQLite.Database db = new SQLite.Database();
			db.open(absolutePath, SQLite.Constants.SQLITE_OPEN_READWRITE | SQLite.Constants.SQLITE_OPEN_CREATE);
			dbp = new BerkeleyDBProxy(absolutePath, db);
			Log.d(LCAT, "Opened database: " + absolutePath);
		} catch (Exception e) {
			Log.e(LCAT, "Exception opening database: " + e.getMessage(), e);
			throw e;
		}
	
		return dbp;
	}

	@Kroll.method
	public void close() throws Exception
	{
		try {
			Log.d(LCAT, "Closing database: " + _path);
			_db.close();
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
		return _path;
	}

	@Kroll.getProperty @Kroll.method
	public long getLastInsertRowId() {
		return _db.last_insert_rowid();
	}

	@Kroll.getProperty @Kroll.method
	public long getRowsAffected() {
		return _db.changes();
	}

	@Kroll.method
	public void remove() throws Exception 
	{
		try {
			Log.d(LCAT, "Closing database: " + _path);
			_db.close();
			Log.d(LCAT, "Deleting database: " + _path);
			File file = new File(_path);
			file.delete();
			file = new File(_path + "-journal");
			file.delete();
		} catch (Exception e) {
			Log.e(LCAT, "Exception removing database: " + e.getMessage(), e);
			throw e;		
		}
	}
}
