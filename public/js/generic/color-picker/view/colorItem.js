define([
	'facade',
	'backbone',
	'hbs!../template/item'
],
function (facade, Backbone, template) {

	return Backbone.View.extend({

		tagName: 'li',
		className: 'color-picker__list__item',
		parent: null,

		events: {
			'click': 'onClick'
		},

		onClick: function (event) {
			if (!this.model.get('Selected')) {
				this.parent.onLinkClick(this.model.get('Id'), this.model.get('Name'));
			}

			event.preventDefault();
		},

		initialize: function(options) {
			this.parent = options.parent;			

			var isSelected = this.model.get('Selected');

			// when selection changes we need to check to see if we need to be in a selected state
			facade.subscribe(this.parent.componentName + ':selection', this.checkSelection, this);

			this.render();

			this.toggleSelection(isSelected);
		},

		checkSelection: function (selectedId) {
			var isSelected = selectedId == this.model.get('Id');

			this.model.set({ 'Selected' : isSelected });

			this.toggleSelection(isSelected);
		},

		toggleSelection: function (isSelected) {
			this.$el.toggleClass(this.className + '--selected', isSelected);
		},

		render: function() {
			this.$el.html(template(this.model.toJSON()));
		}
		
	});

});