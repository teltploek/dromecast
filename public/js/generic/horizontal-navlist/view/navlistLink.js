define([
	'facade',
	'backbone',
	'hbs!../template/navlistLink'
],
function (facade, Backbone, template) {

	return Backbone.View.extend({

		tagName: 'li',
		className: 'h-navlist__list__item',
		parent: null,

		events: {
			'click': 'onClick'
		},

		onClick: function (event) {
			// we need to treat it as a expand toggler as well for when it's used in mobile view
			this.toggleExpand();

			if (!this.model.get('Selected')) {
				this.parent.onLinkClick(this.model.get('Id'));
			}

			event.preventDefault();
		},

		toggleExpand: function () {
			this.parent.toggleExpand();
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