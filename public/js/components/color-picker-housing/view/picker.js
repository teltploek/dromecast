define([
	'facade',
	'generic/color-picker/view/colorList',
	'appstate'
], function (facade, PickerView, appState) {

	'use strict';
	
	return PickerView.extend({
		componentName : 'color-picker-housing',
		appState: null,

		initialize: function() {
			PickerView.prototype.initialize.apply(this, arguments);

			this.appState = appState;
			
      this.listenTo(this.collection, 'reset', this.render);

      facade.subscribe('filter-model:selection', function (parentId) {
      	this.collection.fetch({ 
      		reset: true, 
      		type: 'POST',
      		data: { itemId: parentId, languageName: this.appState.get('languageName') }
      	});

      }, this);
    }

	});
	
});