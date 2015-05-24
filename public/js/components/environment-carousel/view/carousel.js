define([
	'facade',
	'jquery',
	'generic/horizontal-carousel/view/carousel',
	'../collection/images',
	'appstate'
], function (facade, $, CarouselView, Imgs, appState) {
	'use strict';
	
	return CarouselView.extend({
		componentName : 'environment-carousel',
		appState: null,
		collection: Imgs,

		initialize: function() {
			CarouselView.prototype.initialize.apply(this, arguments);
			
			this.appState = appState;

      this.listenTo(Imgs, 'reset', this.addItems);

      this.keep64Ratio();

      facade.subscribe('filter-model:selection', function (parentId) {
      	this.render();

      	Imgs.fetch({ 
      		reset: true, 
      		type: 'POST',
      		data: { itemId: parentId, languageName: this.appState.get('languageName') }
      	});

      }, this);
    },

    keep64Ratio: function () {
	      var self = this;
	      var windowWidth = window.innerWidth;

	      var resizeComplete = (function () {
	        var timers = {};

	        return function (callback, ms, uniqueId) {
	          if (!uniqueId) {
	            uniqueId = 'Don\'t call this twice without a uniqueId';
	          }
	          if (timers[uniqueId]) {
	            clearTimeout (timers[uniqueId]);
	          }
	          timers[uniqueId] = setTimeout(callback, ms);
	        };
	        
	      })();

	      $(window).on('resize', function () {
	          if (window.innerWidth === windowWidth) return;

	          windowWidth = window.innerWidth;

	          resizeComplete(function () {
	          	var width = self.slider.innerWidth();
	          	var calculatedHeight = Math.round((width/6)*4);

              self.slider.height(calculatedHeight);

	          }, 500, self.componentName);
	      });
	  },

	});
	
});