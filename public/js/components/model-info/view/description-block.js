define([
    'facade',
    'backbone',
    'underscore',
    'appstate',
    'hbs!../template/description-block',
    '../collection/text'
], function (facade, Backbone, _, appState, template, Txts) {

    return Backbone.View.extend({
        textBlocks: [],

        collection: Txts,

        appState: null,

        initialize: function () {
            this.appState = appState;

            this.options = this.$el.data();
            
            this.listenTo(Txts, 'reset', this.render);

            facade.subscribe('filter-model:selection', function (parentId) {

                Txts.fetch({ 
                    reset: true, 
                    type: 'POST',
                    data: { itemId: parentId, languageName: this.appState.get('languageName') }
                });

            }, this);
        },

        render: function() {
            var txt = this.collection.at(0);

            this.$el.html(
                template(this.options)
            );

            this.$el.find('.js-description-block__presenter').html(
                txt.get('ProductDisplayDescription')
            );
        }        
    });

});