define([
    'facade',
    'backbone',
    'underscore',
    'hbs!../template/button'
], function (facade, Backbone, _, template) {

    return Backbone.View.extend({

        buttonclass: '',
        options: null,

        initialize: function () {
            this.resetComponent();
            
            this.options = _.extend(this.options, this.$el.data());
        },

        resetComponent: function () {
            this.options = {};
        },

        render: function() {
            var txt = this.collection.at(0);

            if (!this.linkprop) {
                throw('A button component must have a linkprop that translates directly to an attribute in the instance model.');
            }

            this.options.link = txt.get(this.linkprop);

            if (this.icon) {
                this.options.icon = this.icon;
            }

            this.$el.html(
                template( _.extend(txt.toJSON(), this.options) )
            );
        }        
    });

});