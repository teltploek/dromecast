define(['facade', './view/carousel'], function(facade, View) {
    return function (rootEl) {
        new View({
            el: rootEl
        });
    };
});