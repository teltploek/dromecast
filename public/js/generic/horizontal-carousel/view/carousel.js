define([
    'jquery',
    'facade',
    'backbone',
    'underscore',
    'hbs!../template/carousel',
    './item',
    'resizeHandler',
    'flexslider'
], function ($, facade, Backbone, _, template, CarouselItem, resizeComplete) {

    return Backbone.View.extend({
        slider : null,

        options: null,

        initialize: function () {
            this.resetOptions();
        
            this.options = _.extend( this.options, this.$el.data() );
        },

        resetOptions: function () {
            var options = {
                multiple : false, // will determine whether or not we'll present multiple slides at once
                header : '',
                selectable: false,
                alwaysvisible: false,
                manualmeasurement: false 
            };

            this.options = options;
        },

        onViewportResize: function () {
            var self = this;
            var windowWidth = window.innerWidth;

            var resizeComplete = (function () {
              var timers = {};

              return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                  uniqueId = 'Don\'t call this twice without a uniqueId';
                }
                if (timers[uniqueId]) {
                  clearTimeout (timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
              };
              
            })();

            $(window).on('resize', function () {
                if (window.innerWidth === windowWidth) return;

                windowWidth = window.innerWidth;

                resizeComplete(function () {
                    var gridSize = self.gridSize();
                    var itemWidth = self.itemWidth();

                    if (!self.slider.vars) {
                        return;
                    }

                    // adjust options to current viewport
                    self.slider.vars.minItems = gridSize;
                    self.slider.vars.maxItems = gridSize;
                    self.slider.vars.itemWidth = itemWidth;

                    // call resize on slider to have it adjust to its new options
                    setTimeout(function () {
                        self.slider.resize();
                    }, 100);
                }, 500, self.componentName);
            });
        },

        render: function() {
            this.$el.html( template(this.options) );
        },

        gridSize: function () {
            return this.isMobile() ? 3 : 6;
        },

        itemWidth: function () {
            return window.innerWidth / this.gridSize();
        },

        isMobile: function () {
            return window.innerWidth < 668;
        },
        
        publishSelection: function (selectedId) {
            facade.publish(this.componentName + ':selection', selectedId);
        },

        flexsliderProperties: function () {
            var props = {}, self = this;

            props = {
                animation: 'slide',
                slideshow: false,
                initDelay: 100,
                animationLoop: false,
                start: function (slider){
                    self.slider = slider;

                    if (slider.pagingCount === 1) slider.addClass('flex-centered');

                    setTimeout(function(){
                        self.keepMeasurements();
                    }, 1000);

                    setTimeout(function(){
                        self.slider.addClass('h-carousel--rendered');
                    }, 100);
                }
            };

            // if we want to support multiple slides at once, we'll pass in some extra properties to flexslider
            if (this.options.multiple) {
                props = _.extend(props, {
                    itemWidth: this.itemWidth(),
                    itemMargin: 1,
                    minItems: this.gridSize(),
                    maxItems: this.gridSize()
                });
            }

            return props;
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

            if (this.options.selectable) {
                // find selectedItem
                selectedItem = this.collection.where({ Selected : true });

                // publish selectedItem
                if (selectedItem.length) {
                    this.publishSelection(selectedItem[0].get('Id'));
                }
            }

            list.html(items);
            
            this.slider = $(wrapper).flexslider(this.flexsliderProperties());

            // if this carousel offers multiple slides in its viewport, we should resize it on window.resize
            if (this.options.multiple) {
                this.onViewportResize();
            }
        },    

        // when the outer container has gotten inserted an image for the first time, we
        // want to lock the measurements to keep the layout from jumping when things get
        // replaced inside it due to changes in choices
        keepMeasurements: function () {
            var h, w, bg;
            var relatedTo = this.$el;

            this.$el.removeAttr('style');

            h = relatedTo.outerHeight();
            w = relatedTo.outerWidth();

            if (w < 100 || h < 100) {
                return;
            }
            
            bg = this.options.multiple ? 'transparent' : '#fff';

            this.$el.css({
                'min-width'   : w,
                'min-height'  : h,
                backgroundColor : bg
            });
        }    
    });

});