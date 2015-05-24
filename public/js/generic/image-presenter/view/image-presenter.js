define([
    'facade',
    'backbone',
    'hbs!../template/list',
    './navlistLink',
], function (facade, Backbone, template, NavlistLink) {

    return Backbone.View.extend({
        linkItems: [],

        expanded: false,

        render: function() {
            this.$el.html(template());
        },

        toggleExpand: function () {
            this.$el.find('ul').toggleClass('h-navlist__list--expanded', !this.expanded);

            this.expanded = !this.expanded;
        },

        onLinkClick: function (selectedId) {
            this.publishSelection(selectedId);
        },

        publishSelection: function (selectedId) {
            facade.publish(this.componentName + ':selection', selectedId);
        },

        addFilters: function() {
            var list = this.$el.find('ul'), selectedItem;

            this.linkItems = [];

            this.collection.each(function (model, collection, options) {

                var linkView = new NavlistLink({ model: model, parent: this });

                this.linkItems.push(linkView.$el);

            }, this);

            // find selectedItem
            selectedItem = this.collection.where({ selected : true });

            // publish selectedItem
            if (selectedItem.length) {
                this.publishSelection(selectedItem[0].get('itemId'));
            }

            list.html(this.linkItems);
            
            setTimeout(function() {
                list.addClass('h-navlist__list--rendered');
            }, 100);
        }
        
    });

});