define([
    'facade',
    'backbone',
    'hbs!../template/list',
    './navlistLink',
], function (facade, Backbone, template, NavlistLink) {

    return Backbone.View.extend({
        linkItems: [],

        expanded: false,

        initialize: function () {
            this.options = this.$el.data();
        },

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

            // show the root element if it was previously hidden
            this.$el.show();

            this.linkItems = [];

            this.collection.each(function (model, collection, options) {

                var linkView = new NavlistLink({ model: model, parent: this });

                this.linkItems.push(linkView.$el);

            }, this);

            // find selectedItem
            selectedItem = this.collection.where({ Selected : true });

            // publish selectedItem
            if (selectedItem.length) {
                this.publishSelection(selectedItem[0].get('Id'));
            }

            list.html(this.linkItems);

            // if there's only one item in this carousel, and it's not set to "alwaysvisible" we should hide it, because there are no options to choose between
            if (!this.options.alwaysvisible && this.collection.length === 1) {
                this.$el.hide();
            }

            setTimeout(function() {
                list.addClass('h-navlist__list--rendered');
            }, 100);
        }
        
    });

});