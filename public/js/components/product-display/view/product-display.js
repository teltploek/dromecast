define([
    'facade',
    'backbone',
    'appstate'
], function (facade, Backbone, appState) {

    return Backbone.View.extend({
        componentName : 'product-display',
        appState: null,

        initialize: function () {
            this.appState = appState;

            this.options = this.$el.data();

            this.appState.set({ languageName : this.options.language || 'da' });
        }          
    });

});