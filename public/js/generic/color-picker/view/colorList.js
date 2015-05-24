define([
    'facade',
    'backbone',
    'hbs!../template/list',
    './colorItem',
], function (facade, Backbone, template, colorItem) {

    return Backbone.View.extend({
        colorItems: [],

        options: {
            header : ''
        }, 

        initialize: function () {
            this.options = this.$el.data();
        },

        render: function() {
            // if there's nothing it this colorpickers collection, we shouldn't render it at all
            if (!this.collection.length) {
                this.$el.html('');

                return;
            }

            this.$el.html(template(this.options));

            this.addColors();
        },

        onLinkClick: function (selectedId, selectedName) {
            this.publishSelection(selectedId, selectedName);
        },

        publishSelection: function (selectedId, selectedName) {
            facade.publish(this.componentName + ':selection', selectedId, selectedName);
        },

        addColors: function() {
            var list = this.$el.find('ul'), selectedItem;

            this.colorItems = [];

            this.collection.each(function (model, collection, options) {

                var linkView = new colorItem({ model: model, parent: this });

                this.colorItems.push(linkView.$el);

            }, this);

            // find selectedItem
            selectedItem = this.collection.where({ Selected : true });

            // publish selectedItem
            if (selectedItem.length) {
                this.publishSelection(selectedItem[0].get('Id'), selectedItem[0].get('Name'));
            }

            list.html(this.colorItems);
            
            setTimeout(function() {
                list.addClass('color-picker__list--rendered');
            }, 100);
        }
        
    });

});