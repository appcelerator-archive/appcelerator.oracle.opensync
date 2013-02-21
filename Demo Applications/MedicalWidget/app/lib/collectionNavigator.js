// Generic ViewModel for Collections
// - Maintains current selected index
// - Maintains ability for previous and next actions
// - Maintains string indicating record # of # of models
// - Exposes model of selected entry via the transform

var model = require('alloy/backbone').Model.extend({
	defaults: {
		collection: null,			// Collection reference
		selectedIndex: 0,			// Index of currently selected item in collection
		prevEnabled: false,			// Can navigate to previous item in collection
		nextEnabled: false,			// Can navigate to next item in collection
		recordOf: '',				// Record index formatting
		statusText: ''				// Generic status text property
	},
	transform: function () {
		var collection = this.get('collection');
		var selectedIndex = this.get('selectedIndex');
		var transform = {};
		if (collection) {
			var model = collection.at(selectedIndex);
			if (model) {
				transform = model.toJSON();
			}
		}
		transform.prevEnabled = this.get('prevEnabled');
		transform.nextEnabled = this.get('nextEnabled');
		transform.recordOf = this.get('recordOf');
		transform.selectedIndex = selectedIndex;
		transform.statusText = this.get('statusText')	
		return transform;
	},
	next: function () {
		this.setCurrent(this.get('selectedIndex') + 1);
	},
	prev: function () {
		this.setCurrent(this.get('selectedIndex') - 1);
	},
	setCurrent: function(index) {
		var collection = this.get('collection');
		if (collection && (index >= 0) && (index < collection.length)) {
			this.set({
				'selectedIndex': index,
				'prevEnabled': index > 0,
				'nextEnabled': (index+1) < collection.length,
				'recordOf': (index+1) + ' of ' + collection.length,
			}, { 
				silent: true 
			});
			this.trigger('change');
		}
	},
	resetCollection: function() {
		var collection = this.get('collection');
		if (!collection || (collection.length == 0)) {
			this.set({
				'selectedIndex': 0,
				'recordOf': '',
				'prevEnabled': false,
				'nextEnabled': false
			}, {
				silent: true
			});
			this.trigger('change');
		}
		this.setCurrent(0);
	}
});

module.exports = model;