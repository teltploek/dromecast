define([
    'jquery',
    'facade',
    'backbone',
    'appstate',
    'hbs!../template/modal',
    './item',
    '../collection/images',
    'modal'
], function ($, facade, Backbone, appState, template, CarouselItem, Imgs) {

    return Backbone.View.extend({
        events: {
            'click [data-modalanchor]': 'showModal'
        },

        slider: null,

        componentName : 'model-picture',

        options: {},

        collection: Imgs,

        appState: null,

        initialize: function () {
            this.appState = appState;

            this.options = this.$el.data();
            
            this.listenTo(Imgs, 'reset', this.addItems);           

            facade.subscribe('filter-model:selection', function (parentId) {
                this.render();

                Imgs.fetch({ 
                    reset: true, 
                    type: 'POST',
                    data: { itemId: parentId, languageName: this.appState.get('languageName') }
                });

            }, this);
        },

        showModal: function (event) {
            var self = this,
                modalNode = this.$(event.currentTarget).siblings('.modal');

            // focus and resize slider when modal is shown
            $(modalNode).on('shown.bs.modal', function () {
                self.$(modalNode).focus();

                self.slider.resize();
            });

            $(modalNode).modal('show');

            event.preventDefault();
        },

        render: function() {
            this.$el.html( template( this.options ) );
        },

        addItems: function() {
            var self = this;
            var wrapper = this.$el.find('.flexslider');
            var list = wrapper.find('.slides');
            var items = [];

            this.collection.each(function (model, collection, options) {
                var itemView = new CarouselItem({ model: model, parent : this });

                items.push(itemView.$el);
            }, this);

            list.html(items);
            
            this.slider = $(wrapper).flexslider({
                animation: 'fade',
                smoothHeight: true,
                initDelay: 500,
                animationLoop: false,
                start: function (slider){
                    self.slider = slider;
                }
            });

            setTimeout(function(){
                self.slider.addClass('h-carousel--rendered');
            },100);
        } 
          
    });

});