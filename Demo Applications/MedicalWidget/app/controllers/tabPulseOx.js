/*
 * Pulse / O2 Level view
 */

var patients = null;
var viewModel = Alloy.Models.pulseOxViewModel;

$.tabPulseOx.addEventListener('close', function() {
	$.destroy();
});

// Signal change to viewModel so values get bound to the UI
viewModel.trigger('change');

function setError(e) {
	var msg = 'Encountered error: ' + e.message;
	if (e.cause) {
		msg += '\nCause: ' + e.cause;
	}
	setStatus(msg);
}

function setStatus(s) {
	viewModel.set('statusText', s);
}

// --------------------------------------------------------
// Button Commands
// --------------------------------------------------------

function doReloadDatabase() {
	// There is a separate database for each synchronized user. So we must
	// build a path to the user's database and update the db_name field of
	// the database adapter for each table that is referenced.
	
	var userName = Alloy.Globals.userText.value;
	var dbPath = Alloy.Globals.dbSyncRoot + '/' + userName + '/MEDICAL_ANDROID.db';
	
	// Set the database path in the Alloy Globals so that the adapters use it
	// for each operation. Note that each model definition specifies this global
	// variable to get the current database path.
	Alloy.Globals.dbPath = dbPath;
	
	// Verifiy that the database has been created by the synchronization process.
	// We do not want the collection class to create the database for us.
	var dbFile = Ti.Filesystem.getFile('file://' + dbPath);
	if (dbFile.exists()) {
		try {
			// Create the collection object for the pulse/O2 readings
			viewModel.set('collection', Alloy.createCollection('pulseox'));
			// Create the collection object for the list of patients
			patients = Alloy.createCollection('patient');
			// Now load the list of patients
			getPatientsFromDatabase();
			setStatus(L('DBFor') + ' ' + userName + ' ' + L('SuccessfullyLoaded'));
		} catch (e) {
			setError(e);
		}
	} else {
		setStatus(L('DBFor') + ' ' + userName + ' ' + L('IsMissing'));
	}
}

function doNextRecord() {
	viewModel.next();
}

function doPreviousRecord() {
	viewModel.prev();
}

// --------------------------------------------------------
// Picker Functions
// --------------------------------------------------------

function onPatientSelected(e) {
	// The first row of the picker is the prompt, so only process if a row
	// other than the prompt has been selected.
	if (e.rowIndex > 0) {
		try {
			var patientID = patients.at(e.rowIndex-1).get('ID');
			var collection = viewModel.get('collection');
			collection.fetch({
				query: 'SELECT TIME,PULSE,O2 FROM PULSEOX WHERE PATIENTID=' + patientID + ' ORDER BY TIME DESC'
			});
			// Tell the viewModel to reset the collection and signal the update
			viewModel.resetCollection();
		} catch (e) {
			setError(e);
		}
	}
}

function getPatientsFromDatabase() {
	// Retrieve the current list of patients
	try {
		patients.fetch();
	} catch (e) {
		setError(e);
		return;
	}
	
	// Use Underscore.js to iterate over the list and create the picker rows
	var data = [];
	data.push(Ti.UI.createPickerRow({
		title: L('SelectPatientPrompt')
	}));
	patients.map(function(p) {
		data.push(Ti.UI.createPickerRow({
			title: p.get('LASTNAME') + ', ' + p.get('FIRSTNAME')
		}));
	});
	
	// Clear out previous list of patients
	var _col = $.patientSpinner.columns[0];
	if (_col) {
    	for (var r=_col.rowCount-1; (r >= 0); r--) {
      		_col.removeRow(_col.rows[r]);
    	}
   	}
   	
   	// Set the new list of patients
	$.patientSpinner.add(data);
	$.patientSpinner.setSelectedRow(0,0,false);
}

$.patientSpinner.add(Ti.UI.createPickerRow({
	title: L('SelectPatientPrompt')
}));