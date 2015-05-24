define([
	'facade',
	'generic/horizontal-carousel/view/carousel',
	'../collection/filters',
	'appstate'
], function (facade, CarouselView, Filters, appState) {

	'use strict';
	
	return CarouselView.extend({
		componentName : 'filter-model',

		appState : null,
		
		collection: Filters,

		initialize: function() {
			CarouselView.prototype.initialize.apply(this, arguments);

			this.appState = appState;
			
      this.listenTo(Filters, 'reset', this.addItems);

      facade.subscribe('filter-type:selection', function (parentId) {
      	this.render();

      	Filters.fetch({ 
      		reset: true, 
      		type: 'POST',
      		data: { itemId: parentId, languageName : this.appState.get('languageName') }
      	});

      }, this);
    }

	});
	
});