# Oracle Opensync Module

## ResultSet

The `ResultSet` instance returned by [opensync.Database.DB.execute](db.html)

A result set represents the results returned by a database query.

The ResultSet object maintains an internal record of the current row. You can use the `next` method to iterate through the rows in the set.

Use the `field` or `fieldByName` methods to query the fields for the current row.

The following example, taken from the `Database` application in the example folder, will execute an SQL query on the database and iterate through the returned `ResultSet`.

### Example

	var result = "";
	try {
		// Query all of the records in the 'people' table
		var rows = db.execute('SELECT rowid,name,phone_number,city FROM people');
		if (rows != null) {
			result += 'Row count: ' + rows.rowCount + '\n';
			var fieldCount = rows.fieldCount;
			result += 'Field count: ' + fieldCount + '\n';
			for (var i=0; i<fieldCount; i++) {
				result += '  ' + rows.fieldName(i) + '\n';
			}

			// Output the data for each row that is retrieved
			while (rows.isValidRow()){
				result += 'rowid: ' + rows.fieldByName('rowid') + '\n';
				result += '  name:' + rows.field(1) + '\n';
				result += '  phone_number: ' + rows.fieldByName('phone_number') + '\n';
				result += '  city: ' + rows.field(3) + '\n';
	  			rows.next();
			}
			rows.close();
		} else {
			result = "<No rows returned>";
		}
		statusText.value = result;
	} catch (e) {
		statusText.value = "<Exception>"
	}

## Methods

### void close()

Closes this result set and release resources. Once closed, the result set must no longer be used.

_Throws exception on error_

### Object field(index, type)

Retrieves the value for the specified field in the current row, and casts it to the specified type (String, Integer, Float or Double.)

All of the numeric types (Integer, Float or Double) are returned as JavaScript Number objects.

If no type parameter is specified, the returned data type depends on the data in the column.
* If the data in the column is TEXT, the data is returned as a String.
* If the data in the column is any kind of number, the data is returned as a Number.
* If the data in the column is a BLOB, the data is returned as a Titanium.Blob object.

When a type is specified and the data cannot be converted to the specified type, an exception is thrown.

Returns null if the value in the table is NULL.

* index [int]: A zero-based column index.
* type [int]: One of (opensync.Database.FIELD_TYPE_STRING | opensync.Database.FIELD_TYPE_INT | opensync.Database.FIELD_TYPE_FLOAT | opensync.Database.FIELD_TYPE_DOUBLE) (optional)

_Throws exception on error_

### Object getField(index, type)

Same as `field(index, type)`.

_Throws exception on error_

### Object fieldByName(name, type)

Retrieves the value for the specified field in the current row, and casts it to the specified type (String, Integer, Float or Double.)

All of the numeric types (Integer, Float or Double) are returned as JavaScript Number objects.

If no type parameter is specified, the returned data type depends on the data in the column.

* If the data in the column is TEXT, the data is returned as a String.
* If the data in the column is any kind of number, the data is returned as a Number.
* If the data in the column is a BLOB, the data is returned as a Titanium.Blob object.

When a type is specified and the data cannot be converted to the specified type, an exception is thrown.

Returns null if the value in the table is NULL. 

* name [string]: A column name or alias used in the SQL query.
* type [int]: One of (opensync.Database.FIELD_TYPE_STRING | opensync.Database.FIELD_TYPE_INT | opensync.Database.FIELD_TYPE_FLOAT | opensync.Database.FIELD_TYPE_DOUBLE) (optional)

_Throws exception on error_

### Object getFieldByName(name, type)

Same as `fieldByName(name, type)`.

_Throws exception on error_

### int getFieldCount()

Returns the number of columns in this result set.

### string fieldName(index)

Returns the field name for the specified field index

_Throws exception on error_

### string getFieldName(index)

Same as `fieldName(index)`

_Throws exception on error_

### int getRowCount()

Gets the value of the rowCount property.

__NOTE:__ getRowCount is NOT SUPPORTED for Berkeley Database

### boolean isValidRow()

Returns whether the current row is valid.

### boolean next()

Advances to the next row in the result set and returns true if one exists, or false otherwise.

_Throws exception on error_

## Properties

### fieldCount [int]

The number of columns in this result set.

### rowCount [int]

The number of rows in this result set.

__NOTE:__ rowCount is NOT SUPPORTED for Berkeley Database

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.
