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

		events: {
			'click a': 'onClick'
		},

		onClick: function(event) {
			// since this is a generic component, we need some way of knowing which instance of it that is publishing
			var publisher = this.parent.componentName,
					nodeData;

			// try to find out if we can determine the itemId from the currently clicked node
			nodeData = this.$(event.target).data();

			// if we can't it means the click has hit something lower in the tree, and we need to go up
			if (!nodeData.itemid) {
				nodeData = this.$(event.target).closest('a').data();
			}

			// and publish the fact that something has been selected to all subscribers
			facade.publish(publisher + ':selection', nodeData.itemid);

			if (this.parent.options.selectable) {
				event.preventDefault();
			}
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
			if (!this.parent.options.selectable) return;

			var isSelected = selectedId && selectedId == this.model.get('Id');

			this.model.set({ 'Selected' : isSelected });

			this.toggleSelection(isSelected);
		},

		toggleSelection: function (isSelected) {
			if (!this.parent.options.selectable) return;
			
			this.$el.toggleClass(this.className + '--selected', isSelected);
		},

		render: function() {
			this.$el.html(template(this.model.toJSON()));
		}
		
	});

});