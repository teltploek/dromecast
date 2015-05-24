define(['facade', './view/button'], function(facade, View) {
    return function (rootEl) {
        new View({
            el: rootEl
        });
    };
});