define(['facade', './view/product-display'], function(facade, View) {
    return function (rootEl) {
        new View({
            el: rootEl
        });
    };
});