define([
	'facade',
	'generic/horizontal-carousel/view/carousel',
	'../collection/accessories',
	'appstate'
], function (facade, CarouselView, Accessories, appState) {
	'use strict';
	
	return CarouselView.extend({
		componentName : 'accessory-list',
		appState : null,		
		collection: Accessories,

		initialize: function() {
			CarouselView.prototype.initialize.apply(this, arguments);
			
			this.appState = appState;
			
      this.listenTo(Accessories, 'reset', this.addItems);

      facade.subscribe('filter-model:selection', function (parentId) {
      	this.render();

      	Accessories.fetch({ 
      		reset: true, 
      		type: 'POST',
      		data: { itemId: parentId, languageName : this.appState.get('languageName') }
      	});

      }, this);
    }

	});
	
});