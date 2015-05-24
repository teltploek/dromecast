define([
	'generic/horizontal-navlist/view/navlist',
	'../collection/filters',
	'appstate'
], function (NavlistView, Filters, appState) {

	'use strict';
	
	return NavlistView.extend({
		componentName : 'filter-category',

		appState : null,

		collection: Filters,

		initialize: function() {
			NavlistView.prototype.initialize.apply(this, arguments);

			this.appState = appState;

      this.render();

      this.listenTo(Filters, 'reset', this.addFilters);

      this.collection.fetch({ 
      	data: { itemId : this.options.itemid, languageName : this.appState.get('languageName') },
      	type: 'POST',
      	cache: false,
      	reset: true 
      });
    }

	});
	
});