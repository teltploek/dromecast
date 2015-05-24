define([
	'facade',
	'generic/horizontal-multi-navlist/view/navlist',
	'../collection/filters',
	'appstate'
], function (facade, FilterView, Filters, appState) {

	'use strict';
	
	return FilterView.extend({
		componentName : 'filter-type',
		appState: null,
		collection: Filters,

		initialize: function() {
			FilterView.prototype.initialize.apply(this, arguments);

			this.appState = appState;
			
      this.listenTo(Filters, 'reset', this.addFilters);

      facade.subscribe('filter-category:selection', function (parentId) {
      	this.render();

      	Filters.fetch({ 
      		reset: true,
      		type: 'POST',
      		data: { itemId: parentId, languageName: this.appState.get('languageName') }
      	});

      }, this);
    }

	});
	
});