define([
	'backbone',
	'hbs!../template/navlistOption'
],
function (Backbone, template) {

	return Backbone.View.extend({
		initialize: function() {
			this.render();
		},

		render: function() {
			var html = template(this.model.toJSON());

			this.setElement(html);
		}
		
	});

});