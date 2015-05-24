define([
    'facade',
    'backbone',
    'generic/horizontal-navlist/view/navlist',
    'hbs!../template/list',
    'generic/horizontal-navlist/view/navlistLink',
    './navlistOption'
], function (facade, Backbone, NavlistView, template, NavlistLink, NavlistOption) {

    return NavlistView.extend({
        events : {
            'change select': 'onChange',
            'click label': 'openSelect'
        },

        optionItems: [],

        render: function() {
            this.$el.html(template());
        },

        onChange: function (event) {
            this.publishSelection(event.target.value);
        },

        onLinkClick: function (selectedId) {
            this.$el.find('select').val(selectedId);

            this.publishSelection(selectedId);
        },

        openSelect: function () {
            this.$el.find('select').trigger('click');
        },

        addFilters: function() {
            var list = this.$el.find('ul');

            // show the root element if it was previously hidden
            this.$el.show();

            this.linkItems = [];
            this.optionItems = [];

            this.collection.each(function (model, collection, options) {

                var linkView = new NavlistLink({ model: model, parent: this });
                var optionView = new NavlistOption({ model: model, parent: this });

                 this.linkItems.push(linkView.$el);
                 this.optionItems.push(optionView.$el);

            }, this);

            // find selectedItem
            selectedItem = this.collection.where({ Selected : true });

            // publish selectedItem
            if (selectedItem.length) {
                this.publishSelection(selectedItem[0].get('Id'));
            }
            
            list.html(this.linkItems);

            this.$el.find('select').html(this.optionItems);

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