define([
    'facade',
    'backbone',
    'underscore',
    'appstate',
    'hbs!../template/picture',
    '../collection/images',
], function (facade, Backbone, _, appState, template, Imgs) {

    return Backbone.View.extend({
        componentName : 'model-picture',

        collection: Imgs,

        gridColorId: null,
        housingColorId: null,

        appState: null,

        initialize: function () {
            _.bind(this.presentImage, this);

            this.appState = appState;

            this.options = this.$el.data();

            // when our collection resets, we'll re-render
            this.listenTo(Imgs, 'reset', this.render);

            // and when our app state changes in either modelId, housingColorId or gridColorId, we should trigger a change
            this.listenTo(this.appState, 'change:modelId', this.modelChange);
            this.listenTo(this.appState, 'change:housingColorId', this.housingColorChange);
            this.listenTo(this.appState, 'change:gridColorId', this.gridColorChange);

            this.$el.html( template() );
        },

        modelChange: function () {
            this.modelId = this.appState.get('modelId');

            this.goForGlory();
        },

        gridColorChange: function () {
            this.gridColorId = this.appState.get('gridColorId');

            this.goForGlory();
        },

        housingColorChange: function () {
            this.housingColorId = this.appState.get('housingColorId');  

            this.goForGlory();
        },

        goForGlory: function () {
            // we should only fetch if modelId, housingColorId and gridColorId are all set
            if (this.modelId &&
                this.housingColorId) {

                Imgs.fetch({ 
                    reset: true, 
                    type: 'POST',
                    data: {
                        houseColorId: this.housingColorId,
                        gridColorId: this.gridColorId || '',
                        itemId: this.modelId,
                        languageName : this.appState.get('languageName') 
                    }
                });

            }
        },

        render: function() {
            var imgObj = new Image;
            var self = this;
            var pictureDetails = this.collection.at(0),
                h, w;

            this.$el.find('.model-picture__metadata').hide();

            imgObj.addEventListener('load', function(event){
                self.presentImage(event);
            });

            imgObj.src = pictureDetails.get('ImageUrl');
            imgObj.alt = '';
        },

        presentImage: function (event) {
            var existingImg = this.$el.find('.js-model-picture__image-container img');
            var newImg = Backbone.$(event.currentTarget);
            var self = this;

            // set z-index to new picture lower than the old one
            newImg.css('z-index', 3);
            newImg.addClass('model-picture--disappear');

            this.$el.find('.model-picture__metadata').removeClass('model-picture__metadata--appear');

            if (existingImg) {
                existingImg.css('z-index', 4);
                existingImg.data('existingimg', 'true');
            }

            // now append the new image beneath the old one, so it isn't visible beneath it
            this.$el.find('.js-model-picture__image-container').append(newImg);

            // update the text
            this.$el.find('.model-picture__metadata__housing-name').text(this.appState.get('housingColorName'));

            // only update grid color if there are grid colors for the chosen model - otherwise hide it
            if (this.appState.get('gridColorName')) {
                // we need to show it - and add some additional classes to add a nice effect to it
                this.$el.find('.model-picture__metadata__grid-container').show().addClass('model-picture__metadata__grid-container--appear');
                this.$el.find('.model-picture__metadata__grid-name').text(this.appState.get('gridColorName'));
            }else{
                this.$el.find('.model-picture__metadata__grid-container').hide().removeClass('model-picture__metadata__grid-container--appear');
            }

            // make any existing image disappear
            if (existingImg) {
                existingImg.addClass('model-picture--disappear');
            }

            // and any new one appear
            newImg.removeClass('model-picture--disappear');

            this.$el.find('.model-picture__metadata').show();

            // and remove the old one after the animation has finished
            setTimeout(function() {
                self.$el.find('.model-picture__metadata').addClass('model-picture__metadata--appear');
                self.$el.find('.model-picture--disappear').remove();
            }, 600);
        }
    });

});