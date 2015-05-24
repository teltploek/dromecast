define([
    'facade',
    'generic/button/view/button',
    '../collection/text',
    'appstate'
], function (facade, ButtonView, Txts, appState) {

    return ButtonView.extend({
        componentName : 'button-cta',

        appState: null,

        collection: Txts,

        linkprop: 'CtaLink',

        icon: 'cart',

        initialize: function () {
            ButtonView.prototype.initialize.apply(this, arguments);

            this.appState = appState;
            
            this.listenTo(Txts, 'reset', this.render);

            facade.subscribe('filter-model:selection', function (parentId) {

                Txts.fetch({ 
                    reset: true, 
                    type: 'POST',
                    data: { itemId: parentId, languageName: this.appState.get('languageName') }
                });

            }, this);
        }
    });

});