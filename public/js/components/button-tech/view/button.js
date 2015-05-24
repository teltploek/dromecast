define([
    'facade',
    'components/button-cta/view/button'
], function (facade, ButtonView) {

    'use strict';
    
    return ButtonView.extend({
        componentName : 'button-tech',
        linkprop: 'TechnicalInformationLink',
        icon: false
    });
    
});