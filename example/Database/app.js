// Sample application to demonstrate accessing a Berkeley Database using the Oracle Opensync module

var isAndroid = Ti.Android != undefined;
var u = isAndroid ? 'dp' : 0;

var database;
var db = null;

// Create the main user interface

var win = Ti.UI.createWindow({
	title: 'Database',
	backgroundColor: 'white'
});

var scrollView = Ti.UI.createScrollView({
	top: 0,
	bottom: 0,
	contentHeight: Ti.UI.SIZE,
	layout: 'vertical'
});

// Switch used to select Berkeley Database or Titanium native SQL database
var switchDB = Ti.UI.createSwitch({
		top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
		value: true,
		style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		title: 'Berkeley Database',
		color: 'black'
});

var btnView = Ti.UI.createView({
	top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
	layout: 'composite'
});

var btnOpen = Ti.UI.createButton({
	top: 0, left: 0, width: '50%', height: 40+u,
	title: 'Open'
});

var btnInsert = Ti.UI.createButton({
	top: 0, right: 0, width: '50%', height: 40+u,
	title: 'Insert'
});

var btnQuery = Ti.UI.createButton({
	top: 44+u, left: 0, width: '50%', height: 40+u,
	title: 'Query'
});

var btnClose = Ti.UI.createButton({
	top: 44+u, right: 0, width: '50%', height: 40+u,
	title: 'Close'
});

btnView.add(btnOpen);
btnView.add(btnInsert);
btnView.add(btnQuery);
btnView.add(btnClose);

var nameText = Ti.UI.createTextField({
	top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
	hintText: 'Name'
});

var phoneText = Ti.UI.createTextField({
	top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
	hintText: 'Phone'
});

var cityText = Ti.UI.createTextField({
	top: 4+u, left: 4+u, right: 4+u, height: Ti.UI.SIZE || 'auto',
	hintText: 'City'
});

// Create the status text display field
var statusText = Ti.UI.createTextArea({
	top: 4+u, left: 4+u, right: 4+u, bottom: 4+u,
	width: Ti.UI.FILL || 'auto', height: Ti.UI.FILL || 'auto',
	textAlign: 'left',
	editable: false,
	borderWidth: 0,
	color: 'black'
});

win.add(scrollView);

scrollView.add(switchDB);
scrollView.add(btnView);
scrollView.add(nameText);
scrollView.add(phoneText);
scrollView.add(cityText);
scrollView.add(statusText);

btnOpen.addEventListener('click', doOpen);
btnInsert.addEventListener('click', doInsert);
btnQuery.addEventListener('click', doQuery);
btnClose.addEventListener('click', doClose);

function doOpen()
{
	var dbname;
	try {
		// Select the database API namespace to use
		//   For Berkeley, get the Database proxy from the Opensync module
		//   For SQLite, get the Database proxy from Titanium
		// API calls should be the same regardless of which API namespace is used
		if (switchDB.value) {
			database = require('appcelerator.oracle.opensync.bdb').Database;
			dbname = 'testbdb';
		} else {
			database = Ti.Database;
			dbname = 'testsql';
		}
		db = database.open(dbname);
		// Create the 'people' table if it doesn't already exist.
		db.execute('CREATE TABLE IF NOT EXISTS people (name TEXT, phone_number TEXT, city TEXT)');
		// For demo purposes, clear out any existing data each time the database is opened
		db.execute('DELETE FROM people');
		statusText.value = "Database opened successfully";
	} catch (e) {
		statusText.value = "<Exception>"
	}
}

function doInsert()
{
	try {
		// Insert the values into the 'people' table
		db.execute("INSERT INTO people (name, phone_number, city) VALUES (?, ?, ?)", nameText.value, phoneText.value, cityText.value);
		statusText.value = "Record inserted successfully";
	} catch (e) {
		statusText.value = "<Exception>"
	}
}

function doQuery()
{
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
}

function doClose()
{
	try {
		if (db != null) {
			db.close();
			db = null;
		}
		statusText.value = "Database closed successfully";
	} catch (e) {
		statusText.value = "<Exception>"
	}
}

win.addEventListener('close', function() {
	if (db != null) {
		db.close();
		db = null;
	};
})

win.open();