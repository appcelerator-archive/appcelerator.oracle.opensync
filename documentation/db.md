# Oracle Opensync Module

## DB

The `DB` instance returned by [opensync.Database.open](database.html).

## Methods

### void close()

Closes the database and releases resources from memory. Once closed, this instance is no longer valid and should not be used. 

_Throws exception on error_

### [Database.ResultSet](resultset.html) execute(sql, vararg)

Executes an SQL statement against the database and returns a ResultSet.

* sql [string]: SQL to execute. May include placeholders for parameter substitution.
* vararg [string/string[]/Object/Object[]]: Either a variable ordered list of zero or more values, or an array of values, to be substituted with the respective ? placeholder of the query. (optional)

_Throws exception on error_

### string getName()

Gets the value of the name property.

### long getLastInsertRowId()

Gets the value of the lastInsertRowId property.

### getRowsAffected()

Gets the value of the rowsAffected property.

### void remove()

Removes the database files for this instance from disk.

_Throws exception on error_

## Properties

### name [string]

The name of the database.

### lastInsertRowId [long]

The identifier of the last populated row.

### rowsAffected [long]

The number of rows affected by the last query.

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.
