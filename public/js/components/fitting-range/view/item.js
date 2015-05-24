define([
	'facade',
	'backbone',
	'hbs!../template/item'
],
function (facade, Backbone, template) {

	return Backbone.View.extend({

		tagName: 'li',
		className: 'h-carousel__slide',
		parent: null,

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(template(this.model.toJSON()));
		}
		
	});

});